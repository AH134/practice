#include <iostream>

using namespace std;

class Board {
 private:
  bool checkRow();
  bool checkColumn();
  bool checkDiagonal();

 public:
  char board[3][3] = {
      {'-', '-', '-'},
      {'-', '-', '-'},
      {'-', '-', '-'}};
  void showBoard();
  void setInput(char player, int row, int column);
  bool checkConnect();
};