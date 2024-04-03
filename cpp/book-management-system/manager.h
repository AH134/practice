#include <iostream>
#include <string>
#include <vector>

#include "book.h"

class Manager {
 private:
  std::vector<Book> storage;

 public:
  Book getBook(int id);
  Book getBook(std::string name);
  int getBookCount();
  void getAll();
  void addBook(Book book);
  void removeBook(int id);
};