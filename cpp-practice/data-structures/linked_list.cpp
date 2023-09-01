#include <iostream>
using namespace std;

struct Node {
  int data;
  Node* next;
};

class LinkedList {
 private:
  Node* head;
  Node* tail;

 public:
  LinkedList() {
    head = NULL;
    tail = NULL;
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
      temp->next = newNode;
      tail = newNode;
    }
  }

  void getData() {
    Node* temp = head;

    while (temp->next != NULL) {
      cout << temp->data << " ";
      temp = temp->next;
    }
    cout << temp->data << endl;
  }

  int getTail() {
    return tail->data;
  }

  int getHead() {
    return head->data;
  }
};

int main() {
  LinkedList list;
  list.addNode(1);
  list.addNode(2);
  list.addNode(3);
  list.getData();
  cout << list.getHead() << endl;
  cout << list.getTail() << endl;

  return 0;
}