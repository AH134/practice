fn main() {
    let nth = 10;

    let nth_fib = fibonacci(nth);
    println!("The {}th fibonacci number is: {}", nth, nth_fib);
}

fn fibonacci(n: i32) -> i32 {
    if n <= 1 {
        return n;
    }

    fibonacci(n - 1) + fibonacci(n - 2)
}
