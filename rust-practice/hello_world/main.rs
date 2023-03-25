fn hello(name: &mut String) -> String {
    name.push_str(" Jones");
    return "Hello World ".to_owned() + &name;
}

fn main() {
    //let mut string = String::from("bob");
    println!("{}", hello(&mut String::from("bob")));
}