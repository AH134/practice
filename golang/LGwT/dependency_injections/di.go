package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

// many other types implement the Writer interface
func Greet(writer io.Writer, name string) {
	// formats the print to the writer we passed in as a pointer
	fmt.Fprintf(writer, "Hello, %s", name)
}

func myGreeterHandler(w http.ResponseWriter, t *http.Request) {
	Greet(w, "world")
}

func main() {
	// Greet(os.Stdout, "Elodie")
	log.Fatal(http.ListenAndServe(":5001", http.HandlerFunc(myGreeterHandler)))
}
