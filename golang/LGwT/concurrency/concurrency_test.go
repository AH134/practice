package concurrency

import (
	"reflect"
	"testing"
	"time"
)

func mockWebsiteChecker(url string) bool {
	return url != "waat://furhurterwe.geds"
}

func TestCheckWebsites(t *testing.T) {
	websites := []string{
		"http://google.com",
		"http://blog.gypsydave5.com",
		"waat://furhurterwe.geds",
	}

	want := map[string]bool{
		"http://google.com":          true,
		"http://blog.gypsydave5.com": true,
		"waat://furhurterwe.geds":    false,
	}

	got := CheckWebsite(mockWebsiteChecker, websites)

	if !reflect.DeepEqual(want, got) {
		t.Fatalf("wanted %v, got %v", want, got)
	}
}

func slowStubWebsiteChecker(_ string) bool {
	time.Sleep(20 * time.Millisecond)
	return true
}

func BenchmarkCheckWebsites(b *testing.B) {
	urls := make([]string, 100)
	for i := 0; i < len(urls); i++ {
		urls[i] = "a url"
	}
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		CheckWebsite(slowStubWebsiteChecker, urls)
	}
}

func mockStudentDebtChecker(name string) bool {
	return name == "bob"
}

func TestCheckStudentDebt(t *testing.T) {
	students := []string{
		"bob",
		"jake",
		"joe",
		"jone",
		"foo",
		"bar"}

	want := map[string]bool{
		"bob":  true,
		"jake": false,
		"joe":  false,
		"jone": false,
		"foo":  false,
		"bar":  false,
	}

	got := CheckStudentDebt(mockStudentDebtChecker, students)

	if !reflect.DeepEqual(got, want) {
		t.Fatalf("got %v, wanted %v", got, want)
	}
}

func slowStubStudentchecker(name string) bool {
	time.Sleep(20 * time.Millisecond)
	return true
}

func BenchmarkCheckStudentDebt(b *testing.B) {
	students := make([]string, 100)
	for i := 0; i < len(students); i++ {
		students[i] = "a student"
	}

	b.ResetTimer()

	for i := 0; i < b.N; i++ {
		CheckStudentDebt(slowStubStudentchecker, students)
	}

}
