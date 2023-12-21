package main

import (
	"encoding/json"
	"net/http"
)

type Food struct {
	Name     string `json:"name"`
	FoodType string `json:"food_type"`
}

func main() {
	foods := []Food{
		{
			Name:     "Apple",
			FoodType: "Fruit",
		},
		{
			Name:     "Orange",
			FoodType: "Fruit",
		},
		{
			Name:     "Steak",
			FoodType: "Meat",
		},
	}
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		w.Header().Set("Content-Type", "application/json")

		// token := r.URL.Query().Get("name")
		json.NewEncoder(w).Encode(foods)
	})

	http.HandleFunc("/add", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTIONS" {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
			w.WriteHeader(http.StatusOK)
			return
		}

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		w.Header().Set("Content-Type", "application/json")

		var newFood Food
		json.NewDecoder(r.Body).Decode(&newFood)
		foods = append(foods, newFood)

		json.NewEncoder(w).Encode(foods)
	})
	http.ListenAndServe(":8080", nil)
}
