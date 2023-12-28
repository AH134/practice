package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"tdl/m/database"
	"tdl/m/models"
	"tdl/m/utils"
)

func getToken(r *http.Request) string {
	tokenString := r.Header.Get("Authorization")
	if tokenString == "" {
		return ""
	}

	tokenString = tokenString[len("Bearer "):]
	return tokenString
}

func addTodoDb(todo models.Todo) error {
	db := database.ConnectDb()
	_, err := db.Exec(`INSERT INTO Todo (UserId, Title, Description, Status) VALUES (?, ?, ?, ?)`, todo.UserId, todo.Title, todo.Description, todo.Status)
	db.Close()

	if err != nil {
		return err
	}

	return nil
}

func GetTodoHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	tokenString := getToken(r)
	jwt := utils.NewJWT()

	name, err := jwt.VerifyToken(tokenString)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(Message{
			Message: "Invalid token",
		})
		return
	}

	userId, err := utils.GetIdFromDb(name)
	if err != nil {
		json.NewEncoder(w).Encode(Message{
			Message: "User not found",
		})
		return
	}

	todoList := []models.Todo{}
	db := database.ConnectDb()

	rows, err := db.Query(`SELECT * FROM Todo WHERE UserId = ?`, userId)
	if err != nil {
		json.NewEncoder(w).Encode(Message{
			Message: "TOdos not found",
		})
		return
	}

	for rows.Next() {
		var item models.Todo
		rows.Scan(&item.Id, &item.UserId, &item.Title, &item.Description, &item.Status)
		todoList = append(todoList, item)
	}
	db.Close()

	json.NewEncoder(w).Encode(todoList)
}

func AddTodoHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	tokenString := getToken(r)
	jwt := utils.NewJWT()

	name, err := jwt.VerifyToken(tokenString)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(Message{
			Message: "Invalid token",
		})
		return
	}

	var todo models.Todo
	json.NewDecoder(r.Body).Decode(&todo)

	userId, err := utils.GetIdFromDb(name)
	if err != nil {
		log.Fatal(err)
	}
	todo.UserId = userId

	addTodoDb(todo)
	if err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(todo)

}

func DeleteTodoHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	tokenString := getToken(r)
	todoId := r.URL.Query().Get("id")

	jwt := utils.NewJWT()
	name, err := jwt.VerifyToken(tokenString)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(Message{
			Message: "Invalid token",
		})
		return
	}

	userId, err := utils.GetIdFromDb(name)
	if err != nil {
		log.Fatal(err)
	}

	db := database.ConnectDb()
	db.Exec(`DELETE FROM Todo WHERE Id = ? AND UserId = ?`, todoId, userId)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Fprint(w, "deleted from db")
}

func UpdateTodoHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var todo models.Todo
	json.NewDecoder(r.Body).Decode(&todo)

	tokenString := getToken(r)
	jwt := utils.NewJWT()

	name, err := jwt.VerifyToken(tokenString)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(Message{
			Message: "Invalid token",
		})
		return
	}

	userId, err := utils.GetIdFromDb(name)
	if err != nil {
		log.Fatal(err)
	}

	db := database.ConnectDb()
	db.Exec(`UPDATE Todo SET Title = ?, Description = ?, Status = ? WHERE UserId = ? AND Id = ?`, todo.Title, todo.Description, todo.Status, userId, todo.Id)
	if err != nil {
		json.NewEncoder(w).Encode(Message{
			Message: "Failed to update todo item",
		})
		return
	}

	json.NewEncoder(w).Encode(todo)
}
