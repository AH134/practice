package database

import (
	"fmt"
	"log"
	"os"
)

func CreateDb() {
	db, err := os.Create("test.db")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Database test.db created.")
	db.Close()
}
