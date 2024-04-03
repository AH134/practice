# Pointers

- When to use pointers?
  - Answer by u/CryingDutch9:
    - "The answer is pretty simple: when you want to pass a large dataset without actually passing the large dataset. A pointer is just an integer, so a pointer to an array is still the size of a integer instead of the size of the array containing 3.000.000 objects. If you need to pass it 100times through functions, it’s just cheaper to pass the pointer. "
