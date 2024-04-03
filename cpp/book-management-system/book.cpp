#include "book.h"

int Book::createdBooks = -1;

Book::Book(int rating, std::string name) {
  createdBooks++;
  id = createdBooks;
  this->rating = rating;
  this->name = name;
}

int Book::getId() {
  return id;
}

int Book::getRating() {
  return rating;
}

std::string Book::getName() {
  return name;
}