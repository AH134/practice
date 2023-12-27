package utils

import (
	"database/sql"
	"tdl/m/database"
	"tdl/m/models"

	"golang.org/x/crypto/bcrypt"
)

func GetIdFromDb(name string) (int, error) {
	db := database.ConnectDb()

	var query string = `
	SELECT id FROM User
	WHERE Name = ?;
	`
	row := db.QueryRow(query, name)

	var userId int
	err := row.Scan(&userId)
	if err == sql.ErrNoRows {
		return -1, sql.ErrNoRows
	}
	db.Close()
	return userId, nil
}

func ResetDb() error {
	db := database.ConnectDb()

	_, err := db.Exec(`DROP TABLE IF EXISTS User;`)
	if err != nil {
		return err
	}

	db.Exec(`DROP TABLE IF EXISTS Todo;`)
	if err != nil {
		return err
	}

	var query string = `
	CREATE TABLE User (
		Id INTEGER PRIMARY KEY AUTOINCREMENT,
		Name TEXT,
		Email TEXT,
		Password TEXT
	);
	`
	db.Exec(query)
	if err != nil {
		return err
	}

	query = `
	CREATE TABLE Todo (
		Id INTEGER PRIMARY KEY AUTOINCREMENT,
		UserId INTEGER,
		Title TEXT,
		Description TEXT,
		Status INTEGER,

		FOREIGN KEY (UserId) REFERENCES User(Id)
	);
	`
	db.Exec(query)
	if err != nil {
		return err
	}
	db.Close()
	return nil

}

func CreateDemoUser() error {
	db := database.ConnectDb()

	demoUser := models.User{
		Name:     "demo",
		Email:    "demo@email.com",
		Password: "demo123",
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(demoUser.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	var query string = `
	INSERT INTO User (Name, Email, Password)
	VALUES (?, ?, ?);
	`

	db.Exec(query, demoUser.Name, demoUser.Email, hash)
	if err != nil {
		return err
	}
	db.Close()
	return nil
}
