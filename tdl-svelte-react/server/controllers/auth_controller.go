package controllers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"tdl/m/database"
	"tdl/m/utils"

	"golang.org/x/crypto/bcrypt"
)

type Data struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Message struct {
	Message string `json:"message"`
}

func SignUpHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var data Data
	json.NewDecoder(r.Body).Decode(&data)

	flag := emailExist(data.Email)
	if flag {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(Message{
			Message: "Username or password is invalid",
		})
		return
	}

	pass, err := hashPass(data.Password)
	if err != nil {
		log.Fatal(err)
	}

	addToDb(data.Name, data.Email, pass)
	if err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(Message{
		Message: "User created.",
	})
}

func hashPass(password string) (*[]byte, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	return &hash, err
}

func addToDb(name string, email string, password *[]byte) error {
	db := database.ConnectDb()
	var query string = `
	INSERT INTO User (Name, Email, Password)
	VALUES (?, ?, ?);
	`
	_, err := db.Exec(query, name, email, string(*password))
	db.Close()
	if err != nil {
		return err
	}
	return nil
}

func emailExist(email string) bool {
	db := database.ConnectDb()

	var query string = `
	SELECT Email FROM User
	WHERE Email = ?
	`
	row := db.QueryRow(query, email)
	err := row.Scan()

	return err != sql.ErrNoRows
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var data Data
	json.NewDecoder(r.Body).Decode(&data)

	hashedPass, err := getUserPass(data)
	if err != nil {
		json.NewEncoder(w).Encode(Message{
			Message: "wrong name/password.",
		})
		return
	}

	bcrypt.CompareHashAndPassword([]byte(hashedPass), []byte(data.Password))
	if err != nil {
		json.NewEncoder(w).Encode(Message{
			Message: "wrong password",
		})
		return
	}

	jwt := utils.NewJWT()
	token, err := jwt.CreateToken(data.Name)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(Message{
			Message: "Internal server error",
		})
		return
	}

	json.NewEncoder(w).Encode(Message{
		Message: token,
	})
}

func getUserPass(data Data) (string, error) {
	db := database.ConnectDb()

	var query string = `
	SELECT Password FROM User
	WHERE Name = ?;
	`
	row := db.QueryRow(query, data.Name)

	var hashedPass string
	err := row.Scan(&hashedPass)
	if err == sql.ErrNoRows {
		return "", err
	}

	return hashedPass, nil
}
