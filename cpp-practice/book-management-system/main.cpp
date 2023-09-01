#include <iostream>
#include <string>
#include <vector>

#include "book.h"
#include "manager.h"

using book = Book;

int main() {
  Manager storage;

  storage.addBook(book(10, "Forest of the Netherlands"));
  storage.addBook(book(6, "To Kill a Mockingbird"));
  storage.addBook(book(8, "Animal Farm"));
  storage.addBook(book(10, "Your name"));

  std::cout << "[Get book index by name: Your name] -> Expected: 3, Got: " << storage.getBook("Your name").getId() << "\n"
            << std::endl;

  std::cout << "[Get book object by id: 1] -> Expected: To Kill a Mockingbird, Got: " << storage.getBook(1) << std::endl;

  storage.removeBook(3);
  try {
    std::cout << storage.getBook("Your name").getId() << "\n"
              << std::endl;
  } catch (std::out_of_range e) {
    std::cout << "[Expect error from removing book: Your name] -> " << e.what() << "\n"
              << std::endl;
  }

  std::cout << "[Get book Count] -> "
            << "Expected: 3, Got: " << storage.getBookCount() << "\n"
            << std::endl;

  std::cout << "[Get all books]" << std::endl;
  storage.getAll();

  return 0;
}
