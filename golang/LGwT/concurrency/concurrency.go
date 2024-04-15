package concurrency

type Checker func(string) bool
type result struct {
	string
	bool
}

func CheckWebsite(wc Checker, urls []string) map[string]bool {
	results := make(map[string]bool)
	resultChannel := make(chan result)

	for _, url := range urls {
		go func(u string) {
			resultChannel <- result{u, wc(u)}
		}(url)
	}

	for i := 0; i < len(urls); i++ {
		r := <-resultChannel
		results[r.string] = r.bool
	}

	return results
}

func CheckStudentDebt(sc Checker, students []string) map[string]bool {
	results := make(map[string]bool)
	resultChannel := make(chan result)

	for _, student := range students {
		go func(s string) {
			resultChannel <- result{s, sc(s)}
		}(student)
	}

	for i := 0; i < len(students); i++ {
		r := <-resultChannel
		results[r.string] = r.bool
	}
	return results
}
