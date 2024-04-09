#[derive(Debug)] // implements Debug trait for our struct
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn width(&self) -> bool {
        // rust auto references and dereferences
        // so not need to do (&self).width
        self.width > 0
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }

    // associated function
    // returns a new instance of this struct
    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }

    fn new(width: u32, height: u32) -> Self {
        Self { width, height }
    }
}

fn main() {
    // let width1 = 30;
    // let height1 = 50;
    // let rect1 = (30, 50);
    let scale = 2;
    let rect1 = Rectangle {
        // dbg returns the expression of the owners value
        // aka returns 60
        // width will get the same value even without dbg!
        width: dbg!(30 * scale),
        height: 50,
    };
    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    let rect3 = Rectangle {
        width: 110,
        height: 45,
    };

    // println!(
    //     "The area of the rectangle is {} square pixels.",
    //     area(&rect1)
    // );
    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );

    // :? formats our struct to make it printable
    // :#? does a pretty print
    println!("rect1 is {:#?}", rect1);
    dbg!(&rect1);

    if rect1.width() {
        println!("The rectangle has a nonzero width; it is {}", rect1.width);
    }

    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
    println!("Can rect1 hold rect3? {}", rect1.can_hold(&rect3));

    let sq1 = Rectangle::square(2);
    println!("The square is {:?}", sq1);

    let rect_from_new = Rectangle::new(12, 12);
    println!(
        "Rectangle from the 'new()' associated function: {:?}",
        rect_from_new
    );
}

// fn area(rectangle: &Rectangle) -> u32 {
//     // return width * height;
//     // return dimensions.0 * dimensions.1;
//     return rectangle.width * rectangle.height;
// }
