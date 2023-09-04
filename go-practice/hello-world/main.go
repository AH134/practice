package main

import (
	"fmt"

	"rsc.io/quote"
)

func print(input string) {
	fmt.Println(input)
}

func main() {
	print("Hello World")
	print(quote.Go())
}