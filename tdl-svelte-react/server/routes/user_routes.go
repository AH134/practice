package routes

import (
	"net/http"
	"tdl/m/controllers"
)

func UserSetup() {
	http.HandleFunc("/api/register", controllers.HandleUser)
}
