package main

import "testing"

// function must start with the word test
// takes only one argument
func TestHello(t *testing.T) {
	t.Run("saying hello to people", func(t *testing.T) {
		got := Hello("Chris", "")
		want := "Hello, Chris"
		assertCorrectMessage(t, got, want)

	})

	t.Run("say 'Hello, World' when an epmty string is supplied", func(t *testing.T) {
		got := Hello("", "")
		want := "Hello, World"
		assertCorrectMessage(t, got, want)
	})

	t.Run("in Chinese", func(t *testing.T) {
		got := Hello("Elodie", "Chinese")
		want := "你好, Elodie"
		assertCorrectMessage(t, got, want)
	})

	t.Run("in Chinese", func(t *testing.T) {
		got := Hello("Elodie", "French")
		want := "Bonjour, Elodie"
		assertCorrectMessage(t, got, want)
	})
}

func assertCorrectMessage(t testing.TB, got, want string) {
	// it show tell the compiler that its a helper method
	// so that it will show the lines of the actual function call
	t.Helper()
	if got != want {
		t.Errorf("got %q want %q", got, want)
	}
}
