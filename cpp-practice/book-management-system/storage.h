#include <iostream>
#include <string>
#include <vector>

class Storage {
 private:
  std::vector<Book> storage;

 public:
  Book getBook(int id) {
    if (id < storage.size()) {
      return storage[id];
    }
    throw std::out_of_range("Invalid book ID");
  }

  Book getBook(std::string name) {
    for (Book book : storage) {
      if (book.getName() == name) {
        return book;
      }
    }
    throw std::out_of_range("Invalid book ID");
  }

  void addBook(Book book) {
    storage.push_back(book);
  }
};