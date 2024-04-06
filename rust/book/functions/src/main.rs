fn main() {
    println!("Hello, world!");
    another_function();
    print_labeled_measurement(5, 'h');

    // expressions and statements
    // cannot do let x = let x = 5

    let x = five();
    println!("The value of x is: {x}");

    let y = plus_one(5);
    println!("The value of y is: {y}");
}

fn another_function() {
    println!("Another function.")
}

fn print_labeled_measurement(value: i32, unit_label: char) {
    println!("The measurement is: {value}{unit_label}");
}

// last line is the return value, no semicolon
// or can return early by using the return keyword
fn five() -> i32 {
    5 // or return 5;
}

fn plus_one(y: i32) -> i32 {
    y + 1
}
