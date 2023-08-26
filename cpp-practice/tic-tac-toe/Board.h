#include <iostream>

using namespace std;

class Board {
 public:
  char board[3][3] = {
      {'-', '-', '-'},
      {'-', '-', '-'},
      {'-', '-', '-'}};
  void showBoard();
  void setInput(char player, int row, int column);
};