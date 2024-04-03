#include "manager.h"

Book Manager::getBook(int id) {
  if (id < storage.size()) {
    return storage[id];
  }
  throw std::out_of_range("Invalid book ID");
}

Book Manager::getBook(std::string name) {
  for (Book book : storage) {
    if (book.getName() == name) {
      return book;
    }
  }
  throw std::out_of_range("Invalid book ID");
}

int Manager::getBookCount() {
  return storage.size();
}

void Manager::getAll() {
  for (Book book : storage) {
    printf("{Id: %d, Name: %s, Rating: %d}\n", book.getId(), book.getName().c_str(), book.getRating());
  }
}

void Manager::addBook(Book book) {
  storage.push_back(book);
}

void Manager::removeBook(int id) {
  storage.erase(storage.begin() + id);
  storage.shrink_to_fit();
}
