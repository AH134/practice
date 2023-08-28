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

bool Board::checkRow() {
  bool isWin;
  for (int i = 0; i < 3; i++) {
    if (this->board[i][1] == '-') {
      continue;
    }

    isWin = this->board[i][1] == this->board[i][0] && this->board[i][1] == this->board[i][2];

    if (isWin) {
      break;
    }
  }
  return isWin;
}

bool Board::checkColumn() {
  bool isWin;
  for (int i = 0; i < 3; i++) {
    if (this->board[1][i] == '-') {
      continue;
    }

    isWin = this->board[1][i] == this->board[0][i] && this->board[1][i] == this->board[2][i];

    if (isWin) {
      break;
    }
  }
  return isWin;
}

bool Board::checkDiagonal() {
  if (this->board[1][1] != '-') {
    bool firstDiag = this->board[1][1] == this->board[0][2] && this->board[1][1] == this->board[2][0];
    bool secondDiag = this->board[1][1] == this->board[0][0] && this->board[1][1] == this->board[2][2];
    return firstDiag || secondDiag;
  }
  return false;
}

bool Board::checkConnect() {
  return checkRow() || checkColumn() || checkDiagonal();
}