package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"tdl/m/database"
	"tdl/m/models"
)

const (
	POST string = "POST"
)

type Data struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func handleRegister(w http.ResponseWriter, r *http.Request) {
	var data Data
	json.NewDecoder(r.Body).Decode(&data)

	// add user to databse
	db := database.ConnectDb()
	var query string = `
	INSERT INTO User (Name, Email, Password)
	VALUES (?, ?, ?);
	`
	_, err := db.Exec(query, data.Name, data.Email, data.Password)
	if err != nil {
		log.Fatal(err)
	}

	// returns user from databse; not needed here; testing purposes
	var user models.User
	query = `
	SELECT * FROM User
	WHERE Name = ?;
	`
	row := db.QueryRow(query, data.Name)
	if err != nil {
		log.Fatal(err)
	}
	row.Scan(&user.Id, &user.Name, &user.Email, &user.Password)
	fmt.Println(user)
	db.Close()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func HandleUser(w http.ResponseWriter, r *http.Request) {
	switch method := r.Method; method {
	case POST:
		handleRegister(w, r)
	}
}
