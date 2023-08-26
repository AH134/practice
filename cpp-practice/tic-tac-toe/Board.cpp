#include "Board.h"

void Board::showBoard() {
  cout << "    0   1   2  " << endl;
  for (int i = 0; i < 3; i++) {
    cout << i << " | ";
    for (int j = 0; j < 3; j++) {
      cout << board[i][j] << " | ";
    }
    cout << endl;
  }
}

void Board::setInput(char player, int row, int column) {
  char boardLocation = board[row][column];

  if (boardLocation == '-') {
    board[row][column] = player;
  } else {
    cout << "Already taken by " << boardLocation << endl;
  }
};