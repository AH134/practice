package routes

import (
	"net/http"
	"tdl/m/controllers"
)

func UserSetup() {
	http.HandleFunc("/api/post", controllers.AddTodoHandler)
	http.HandleFunc("/api/get", controllers.GetTodoHandler)
	http.HandleFunc("/api/delete", controllers.DeleteTodoHandler)
}
