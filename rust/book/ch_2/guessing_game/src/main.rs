// 2
use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("Guess the number!");

    // thread_rng() gives us a random number generater seeded by the os
    // gen_range() method defined by the Rng trait generates a number between 1 and 100 (inclusive)
    let secret_number = rand::thread_rng().gen_range(1..=100);

    // println!("The secret number is: {secret_number}");

    loop {
        println!("Please input your guess.");

        let mut guess = String::new();

        // read_line() reads the input from the user and returns a enum Result (Ok or Err)
        // expect() returns the value if Ok otherwise terminates the program and outputs a message
        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        // parse() parses a value into another type, need to specify the type on the variable or parse::<u32>()
        // let guess: u32 = guess.trim().parse().expect("Please type a numer");

        // handling invalid input
        // guess.trim().parse() returns a Result type
        // check if returned Result variant is Ok or Err
        // Ok return a num, which is matched with the one below
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {guess}");

        // guess.cmp() returns an Ordering variant (Less, Greater, Equal)
        // match express is similar to a swtich statement
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}
