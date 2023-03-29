use std::io;
use rand::Rng;


fn random_number(){
    let secret_number = rand::thread_rng().gen_range(1..=100);
    println!("The correct number was {}!", secret_number);

}

fn main() {
    println!("Guess the number!");

    println!("Please input your guess.");

    let mut guess = String::new(); // binds a new object to s dtring type

    io::stdin().read_line(&mut guess).expect("Failed ot read line");


    println!("Your guess was {}!", guess);
    random_number();
}
