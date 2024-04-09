// this function is error prone as the returned value
// is not synced with the reference parameter
// possibly cause an error if we were to use
// the returned value after using .clear()
// on the actual string value
pub fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    println!("{} as bytes: {:?}", s, bytes);

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    return &s[..];
}

// pub fn string_sliced(s: &String) {
//     let slice = s[0..2];
//     let slice = s[..2];

//     let slice = s[0..s.len()];
//     let slice = s[0..];
//     let slice = s[..];
// }
