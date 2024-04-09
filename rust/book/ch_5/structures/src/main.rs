struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

struct Color(i32, i32, i32);
struct Point(i32, i32, i32);
struct AlwaysEqual;

fn main() {
    let mut user1 = build_user(String::from("user1"), String::from("user1@example.com"));

    change_email(&mut user1, "anotheremail@example.com");
    println!("user: {}", user1.email);

    // struct update syntax
    // user1 no longer becomes valid
    // as usrname and email are String,
    // therefore it gets moved to user2
    let _user2 = User {
        email: String::from("user2@exmaple.com"),
        // must come last
        ..user1
    };

    // tuple structs
    // useful when you want to name your tuples
    let _black = Color(0, 0, 0);
    let _origin = Point(0, 0, 0);
    let subject = AlwaysEqual;
}

fn build_user(email: String, username: String) -> User {
    return User {
        active: true,
        username,
        email,
        sign_in_count: 1,
    };
}

fn change_email(user: &mut User, new_email: &str) {
    user.email = new_email.to_string();
}
