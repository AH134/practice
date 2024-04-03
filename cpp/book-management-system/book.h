#ifndef BOOK_H
#define BOOK_H

#include <iostream>
#include <string>

class Book {
 private:
  static int createdBooks;
  int id;
  int rating;
  std::string name;
  friend std::ostream &operator<<(std::ostream &strm, const Book &book) {
    return strm << book.name;
  }

 public:
  Book(int rating, std::string name);
  int getRating();
  int getId();
  std::string getName();
};

#endif