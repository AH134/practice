use std::io;

fn main() {
    println!("Guess the number!");

    println!("Please input your guess.");

    let mut guess = String::new(); // binds a new object to s dtring type

    io::stdin().read_line(&mut guess).expect("Failed ot read line");

    println!("You guessed: {guess}");
}
