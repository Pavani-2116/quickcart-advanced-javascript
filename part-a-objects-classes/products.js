// Part A - Objects, Prototypes & ES6 Classes
// Run with: node products.js

// ---------------------------------------------------------
// Task 1 - Prototype based products
// ---------------------------------------------------------
function task1Prototype() {
  console.log("===== Task 1: Prototype based products =====");

  // constructor function
  function Product(productName, price, category) {
    this.productName = productName;
    this.price = price;
    this.category = category;
  }

  // method added on prototype, so all products share ONE copy of it
  Product.prototype.displayProduct = function () {
    return `Product: ${this.productName}, Price: ₹${this.price}, Category: ${this.category}`;
  };

  // creating three products
  const p1 = new Product("Laptop", 50000, "Electronics");
  const p2 = new Product("T-Shirt", 799, "Clothing");
  const p3 = new Product("Headphones", 2500, "Accessories");

  console.log(p1.displayProduct());
  console.log(p2.displayProduct());
  console.log(p3.displayProduct());

  // proof that the method is shared and not copied
  console.log("Same method shared?", p1.displayProduct === p2.displayProduct); // true
  console.log("p1.__proto__ === Product.prototype ?", p1.__proto__ === Product.prototype); // true

  /*
    Q1. Why add displayProduct() to the prototype instead of the constructor?
    Ans: If we write it inside the constructor, every new product gets its own
    copy of the function, which wastes memory. On the prototype there is only
    one copy and all objects share it.

    Q2. Difference between __proto__ and prototype?
    Ans: "prototype" is a property of a constructor FUNCTION (Product.prototype).
    "__proto__" is a property of an OBJECT (p1.__proto__) and it points to the
    prototype of the constructor that created it.

    Q3. What happens when JS cannot find a property on an object?
    Ans: It looks in the object's __proto__, then that object's __proto__ and so on
    (this is the prototype chain). If it reaches null and still not found,
    it returns undefined (or TypeError if we try to call it like a function).
  */
  console.log("p1.discountCode (not found):", p1.discountCode); // undefined
}

// ---------------------------------------------------------
// Task 2 - ES6 classes
// ---------------------------------------------------------
function task2Classes() {
  console.log("\n===== Task 2: ES6 classes =====");

  class Product {
    constructor(productName, price, category) {
      this.productName = productName;
      this.price = price;
      this.category = category;
    }

    getProductDetails() {
      return `${this.productName} (${this.category}) - ₹${this.price}`;
    }
  }

  class ElectronicProduct extends Product {
    constructor(productName, price, warrantyYears) {
      super(productName, price, "Electronics"); // must come before this
      this.warrantyYears = warrantyYears;
    }

    // unique method of ElectronicProduct
    getWarrantyInfo() {
      return `${this.productName} has ${this.warrantyYears} year(s) warranty`;
    }
  }

  class ClothingProduct extends Product {
    constructor(productName, price, size) {
      super(productName, price, "Clothing");
      this.size = size;
    }

    // unique method of ClothingProduct
    getSizeInfo() {
      return `${this.productName} is available in size ${this.size}`;
    }
  }

  const phone = new ElectronicProduct("Smartphone", 20000, 2);
  const shirt = new ClothingProduct("Denim Shirt", 1200, "M");

  console.log(phone.getProductDetails());
  console.log(phone.getWarrantyInfo());
  console.log(shirt.getProductDetails());
  console.log(shirt.getSizeInfo());
  console.log("phone instanceof Product:", phone instanceof Product); // true

  /*
    Q1. Purpose of extends?
    Ans: It creates a child class that inherits properties and methods of the
    parent class, so we can reuse code and add new things in the child.

    Q2. Why must super() be called before using this?
    Ans: In a child class the "this" object is created by the parent constructor.
    Until super() runs, "this" does not exist, so using it gives a ReferenceError.

    Q3. Are ES6 classes completely different from prototype inheritance?
    Ans: No. Classes are just a cleaner syntax (syntactic sugar) over the same
    prototype system. typeof Product is still "function" and methods still
    live on Product.prototype.
  */
  console.log("typeof Product:", typeof Product); // function
}

// ---------------------------------------------------------
// Task 3 - ES6 syntax in checkout
// ---------------------------------------------------------
function task3Syntax() {
  console.log("\n===== Task 3: ES6 syntax in checkout =====");

  // (A) arrow function for final price after discount
  const finalPrice = (price, discountPercent) => price - (price * discountPercent) / 100;
  console.log("(A) Final price of 50000 with 10% off:", finalPrice(50000, 10)); // 45000

  // (B) template literal
  const customerName = "Rahul";
  const productName = "Laptop";
  const total = 50000;
  console.log(`(B) Hello ${customerName}, your order of ${productName} is confirmed. Total: ₹${total}`);

  // (C) destructuring
  const customer = { name: "Rahul", email: "rahul@gmail.com", city: "Mumbai" };
  const { name, email } = customer;
  console.log("(C) name:", name, "| email:", email);

  // (D) rest operator
  const calculateTotal = (...prices) => prices.reduce((sum, p) => sum + p, 0);
  console.log("(D) Total of 500, 1000, 1500:", calculateTotal(500, 1000, 1500)); // 3000

  // (E) spread to copy product with new price
  const product = { name: "Laptop", price: 50000, category: "Electronics" };
  const updatedProduct = { ...product, price: 45000 };
  console.log("(E) original:", product);
  console.log("(E) copy with new price:", updatedProduct);
}

task1Prototype();
task2Classes();
task3Syntax();
