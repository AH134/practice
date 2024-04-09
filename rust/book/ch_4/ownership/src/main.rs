mod slices;

fn main() {
    // called a move
    // s1 becomes invalid as the "data"
    // stack data of s1 (pointer, length, capacity) gets moved to s2
    let s1 = String::from("Hello");
    let s2 = s1;

    println!("A move from s1 to s2: {s2}");

    // to do a deep copy (copy the heap data)
    let s3 = s2.clone();

    println!("Cloned data s3: {s3}");

    let some = String::from("yo");
    takes_ownership(some);
    // println!("{}", some);

    let some_int = 5;
    makes_copy(some_int);
    println!("some_int still works: {}", some_int);

    let given = gives_ownership();
    println!("given: {}", given);

    let taken_back = takes_and_gives_back(given);
    println!("taken back: {}", taken_back);

    let (taken_back, len) = calculate_length(taken_back);
    println!("taken back as a tuple: {}|{}", taken_back, len);

    let len = calulate_length_reference(&taken_back);
    println!("The length of '{}' is {}.", taken_back, len);

    let mut changeable_string = String::from("hello");
    change(&mut changeable_string);

    let words = String::from("Hello World!");
    // first word fucntion takes a string slice
    // which can be passed either by a &str or &String
    let _first_word = slices::first_word(&words);
    let first_word = slices::first_word(&words[1..]);
    println!("First word from '{}' is: {}", words, first_word);

    let string_literals = "world hello";
    // string literals are alreasy slices by default
    // so no need to specify the slice
    let fs_word = slices::first_word(string_literals);
    println!("First word from '{}' is: {}", string_literals, fs_word);

    let a = [1, 2, 3, 4, 5];
    // stores a reference to a -> [2,3]
    let a_slice = &a[1..3];
    assert_eq!(a_slice, &[2, 3]);
}

fn takes_ownership(some_string: String) {
    // some_string gets dropped in this function
    // as it took ownership of the heap data
    println!("{}", some_string);
}

fn makes_copy(some_int: i32) {
    // values gets copied here
    // since scalar types are on the stack
    println!("{}", some_int);
}

// returned value's ownership gets transferred
// to the variable that calls it
fn gives_ownership() -> String {
    let some_string = String::from("yours");
    some_string
}

// takes and returns the ownership
// to a variable that calls it
fn takes_and_gives_back(a_string: String) -> String {
    a_string
}

// retuns tuples
fn calculate_length(s: String) -> (String, usize) {
    let length = s.len();

    (s, length)
}

fn calulate_length_reference(s: &String) -> usize {
    s.len()
}

fn change(some_string: &mut String) {
    some_string.push_str(", hohoho");
}
