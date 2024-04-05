// 3.1

// constants can be declared globally as well
// const THREE: u32 = 3;
fn main() {
    // mut makes the variable mutable
    let mut x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");

    // shadowing
    let x = 5;
    let x = x + 1;
    {
        let x = x * 2;
        println!("The value of x in the inner scope is: {x}");
    }

    println!("The value of x is: {x}");

    // shadowing allows us to change the variale type
    // because we are effectivley creating a new variable
    // when using the let keyword
    let spaces = "   "; // spaces is a string type
    let spaces = spaces.len(); // variable space is now a number type

    // compiler error as spaces is still a string type
    let mut spaces = "   ";
    // spaces = spaces.len();
}
