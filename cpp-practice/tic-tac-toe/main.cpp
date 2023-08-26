#include <iostream>
using namespace std;

class Board {
 public:
  char board[3][3] = {
      {'-', '-', '-'},
      {'-', '-', '-'},
      {'-', '-', '-'}};

  void showBoard() {
    cout << "\n\n\n\n";
    for (int i = 0; i < 3; i++) {
      for (int j = 0; j < 3; j++) {
        cout << board[i][j] << " ";
      }
      cout << endl;
    }
  }
};

int main() {
  Board newBoard;

  newBoard.showBoard();
  newBoard.board[0][0] = 'x';
  newBoard.showBoard();
  return 0;
}