package routes

import (
	"net/http"
	"tdl/m/controllers"
)

func UserSetup() {
	http.HandleFunc("/api/signup", controllers.SignUpHandler)
	http.HandleFunc("/api/login", controllers.LoginHandler)
}
