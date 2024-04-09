// 3.2
use std::io;

fn main() {
    // scalar types represents a single value
    // integers, floating-point, numbers, booleans, characters

    // need to declare the type or else compiler error
    // more types in book 3.2
    let _guess: u32 = "42".parse().expect("Not a number");

    // floats
    let _x = 2.0; // f64
    let _y: f32 = 3.0; // f32

    // booleans
    let _t = true;
    let _f: bool = false;

    // char
    let _c = 'z';
    let _z: char = 'g';
    let _skull_emoji = '💀';

    // compound types
    // tuples and arrays
    let tup: (i32, f64, u8) = (500, 6.4, 1);
    // destructure, similar to js
    let (_x, y, _z) = tup;
    // access directly
    let five_hundred = tup.0;
    println!("The value of y is: {y}");
    println!("The value of x is: {five_hundred}");

    // the array type
    let _a: [i32; 5] = [1, 2, 3, 4, 5];
    let _first = _a[0];
    // initialized 5 elements of the number 3
    let _b = [3; 5];

    // runtime error if index out of bounds
    println!("Please enter an array index.");

    let mut index = String::new();

    io::stdin()
        .read_line(&mut index)
        .expect("Failed to read line");

    let index: usize = index
        .trim()
        .parse()
        .expect("Index entered was not a number");

    let element = _a[index];

    println!("The value of the element at index {index} is: {element}");
}
