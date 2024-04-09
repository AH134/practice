fn main() {
    let f = 128;
    println!("fahrenheit value is: {f}");

    let f: f64 = fahrenheit_to_celcius(f);
    // rounds to 2 decimals
    println!("Converted fahrenheit value is: {:.2}", f);

    let c = 41;
    println!("fahrenheit value is: {c}");

    let c: f64 = celcius_to_fahrenheit(c);
    println!("Converted celcius value is: {c}");
}

fn fahrenheit_to_celcius(value: i32) -> f64 {
    (value as f64 - 32.0) * 5.0 / 9.0
}

fn celcius_to_fahrenheit(value: i32) -> f64 {
    (value as f64 * (9.0 / 5.0)) + 32.0
}
