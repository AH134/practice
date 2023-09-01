#include "book.h"

Book::Book(int id, int rating, std::string name) {
  this->id = id;
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