use std::io;

fn main() {
    let number = 3;

    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }

    let condition = true;
    // returned values must be the same type
    let number = if condition { 5 } else { 6 };

    println!("The value of number is: {number}");

    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            // assign to result after break
            break counter * 2;
        }
    };

    println!("The result is {result}");

    let mut count = 0;
    // a label for using keywords within an inner loop
    'counting_up: loop {
        println!("count = {count}");
        let mut remaining = 10;

        loop {
            println!("remaining = {remaining}");
            if remaining == 9 {
                // breaks this loop
                break;
            }
            if count == 2 {
                // breaks the outer loop
                break 'counting_up;
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {count}");

    // for loops
    let arr = [10, 20, 30, 40, 50, 60];

    for element in arr {
        println!("The value is: {element}");
    }

    // looping in reverse
    for number in (1..4).rev() {
        println!("{number}!");
    }
    println!("LIFTOFF!!!");
}
