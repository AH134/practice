#include <iostream>
#include <string>
#include <vector>

#include "book.h"
#include "storage.h"

int main() {
  Storage list;
  typedef Book book;

  list.addBook(book(0, 10, "Forest of the Netherlands"));
  list.addBook(book(1, 6, "To Kill a Mockingbird"));
  list.addBook(book(2, 8, "Animal Farm"));
  list.addBook(book(3, 10, "Your name"));

  std::cout << list.getBook("Your name") << std::endl;
  std::cout << list.getBook(1) << std::endl;

  return 0;
}
