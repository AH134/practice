package main

import (
	"fmt"

	"example.com/bot"
)

func main() {
	flag := true
	frank := bot.CreateBot("frank")
	var userHand int

	for flag {
		fmt.Print("Hand: ")
		fmt.Scan(&userHand)
		if frank.HandShape.HandNo > userHand {
			fmt.Println("You lose!")
			fmt.Println(frank.HandShape)
			break
		}
		fmt.Println(frank.HandShape)
	}

}
