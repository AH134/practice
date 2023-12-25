package main

import (
	"log"
	"net/http"
	"tdl/m/database"
	"tdl/m/routes"
)

func main() {
	database.CreateDb()
	db := database.ConnectDb()
	var query string = `
	CREATE TABLE User (
		Id INTEGER PRIMARY KEY AUTOINCREMENT,
		Name TEXT,
		Email TEXT,
		Password TEXT
	);
	`
	_, err := db.Exec(query)
	if err != nil {
		log.Fatal(err)
	}
	db.Close()

	routes.UserSetup()
	log.Println("Starting server on port [:3000]")
	log.Fatal(http.ListenAndServe(":3000", nil))
}
