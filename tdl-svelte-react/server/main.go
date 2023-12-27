package main

import (
	"log"
	"net/http"
	"tdl/m/routes"
	"tdl/m/utils"
)

func main() {
	// database.CreateDb()
	err := utils.ResetDb()
	if err != nil {
		log.Fatal(err)
	}

	utils.CreateDemoUser()
	if err != nil {
		log.Fatal(err)
	}

	routes.AuthSetup()
	routes.UserSetup()
	log.Println("Starting server on port [:3000]")
	log.Fatal(http.ListenAndServe(":3000", nil))
}
