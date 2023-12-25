package database

import (
	"fmt"
	"log"
	"os"
)

func CreateDb() {
	// for resetting db; remove later
	err := os.Remove("test.db")
	if err != nil {
		log.Fatal(err)
	}

	os.Create("test.db")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Database test.db created.")
}
