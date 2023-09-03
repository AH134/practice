package main

import (
	"fmt"
);

func sum(a int, b int) int {
	return a + b;
}


func main() {
	
	var sum int = sum(1, 2);

	fmt.Println("Hello World!");
	fmt.Println(sum);

}