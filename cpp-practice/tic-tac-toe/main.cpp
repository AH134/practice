#include <iostream>

#include "Board.h"

using namespace std;

void swapPlayer(char &player) {
  if (player == 'x') {
    player = 'o';
  } else {
    player = 'x';
  }
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

    if (newBoard.checkConnect()) {
      cout << player << " is the winner!" << endl;
      break;
    }

    swapPlayer(player);

  } while (turns <= 9);

  return 0;
}