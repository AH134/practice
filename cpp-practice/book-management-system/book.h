#include <iostream>
#include <string>

class Book {
 private:
  int id;
  int rating;
  std::string name;
  friend std::ostream &operator<<(std::ostream &strm, const Book &book) {
    return strm << book.name;
  }

 public:
  Book(int id, int rating, std::string name);
  int getId();
  int getRating();
  std::string getName();
};
