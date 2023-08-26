#include <iostream>

#include "Board.h"

using namespace std;

bool checkRow(Board b) {
  bool isWin;
  for (int i = 0; i < 3; i++) {
    if (b.board[i][1] == '-') {
      continue;
    }

    isWin = b.board[i][1] == b.board[i][0] && b.board[i][1] == b.board[i][2];

    if (isWin) {
      break;
    }
  }
  return isWin;
}

bool checkColumn(Board b) {
  bool isWin;
  for (int i = 0; i < 3; i++) {
    if (b.board[1][i] == '-') {
      continue;
    }

    isWin = b.board[1][i] == b.board[0][i] && b.board[1][i] == b.board[2][i];

    if (isWin) {
      break;
    }
  }
  return isWin;
}

bool checkDiagonal(Board b) {
  if (b.board[1][1] != '-') {
    bool firstDiag = b.board[1][1] == b.board[0][2] && b.board[1][1] == b.board[2][0];
    bool secondDiag = b.board[1][1] == b.board[0][0] && b.board[1][1] == b.board[2][2];
    return firstDiag || secondDiag;
  }
  return false;
}

int main() {
  Board newBoard;
  int turns = 1;
  int row;
  int column;
  char player = 'x';

  newBoard.showBoard();
  do {
    cout << "Enter row then colum (eg. 0 0, 1 3): ";
    cin >> row >> column;
    newBoard.setInput(player, row, column);
    newBoard.showBoard();

    bool isWin = checkRow(newBoard) || checkColumn(newBoard) || checkDiagonal(newBoard);

    if (isWin) {
      cout << player << " is the winner!" << endl;
      break;
    }

    if (player == 'x') {
      player = 'o';
    } else {
      player = 'x';
    }

  } while (turns <= 9);

  return 0;
}