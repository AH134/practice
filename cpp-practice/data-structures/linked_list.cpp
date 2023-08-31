#include <iostream>
using namespace std;

// linked list implementation after watching a video

struct Node {
  int data;
  Node* next;
};

class LinkedList {
 private:
  Node* head;

 public:
  LinkedList() {
    head = NULL;
  }

  void addNode(int num) {
    Node* newNode = new Node;
    newNode->data = num;
    newNode->next = NULL;

    if (head == NULL) {
      head = newNode;
    } else {
      Node* temp = head;
      while (temp->next != NULL) {
        temp = temp->next;
      }
      //(*temp).next = newNode;
      temp->next = newNode;
    }
  }

  int getHead() {
    if (head != NULL) {
      return head->data;
    }
    return -1;
  }

  int getNext() {
    if (head->next != NULL) {
      Node* next = head->next;
      return next->data;
    }
    return -1;
  }
};

int main() {
  LinkedList list;
  list.addNode(5);
  cout
      << list.getHead() << endl;
  list.addNode(6);
  cout << list.getNext() << endl;

  return 0;
}