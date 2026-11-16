// Part B - Higher-Order Functions, Map, Set & Object Methods
// Run with: node shopping-cart.js
"use strict"; // strict mode so freeze/seal errors are visible

const cart = [
  { id: 101, name: "Laptop", price: 50000, qty: 1, category: "Electronics" },
  { id: 102, name: "Mouse", price: 800, qty: 2, category: "Accessories" },
  { id: 103, name: "Keyboard", price: 1500, qty: 1, category: "Accessories" },
  { id: 104, name: "Monitor", price: 12000, qty: 1, category: "Electronics" },
  { id: 105, name: "Headphones", price: 2500, qty: 2, category: "Accessories" },
];

// ---------------------------------------------------------
// Task 1 - Array methods
// ---------------------------------------------------------
function task1ArrayMethods() {
  console.log("===== Task 1: Array methods =====");

  // map() -> names with total item price
  const itemTotals = cart.map((item) => ({
    name: item.name,
    totalPrice: item.price * item.qty,
  }));
  console.log("map():", itemTotals);

  // filter() -> products above 2000
  const expensive = cart.filter((item) => item.price > 2000);
  console.log("filter() above ₹2000:", expensive.map((i) => i.name));

  // reduce() -> total cart value
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  console.log("reduce() total cart value: ₹" + cartTotal);

  // forEach() -> log name, category and quantity
  console.log("forEach():");
  cart.forEach((item) => {
    console.log(`  ${item.name} | ${item.category} | Qty: ${item.qty}`);
  });

  // combined -> total value of all Electronics products
  const electronicsTotal = cart
    .filter((item) => item.category === "Electronics")
    .reduce((sum, item) => sum + item.price * item.qty, 0);
  console.log("Combined - Electronics total: ₹" + electronicsTotal); // 62000

  // check that filter did not change the original array
  console.log("Original cart length after filter:", cart.length); // still 5

  /*
    Q1. Difference between map() and forEach()?
    Ans: map() returns a NEW array with the results. forEach() just loops and
    returns undefined, so it is used for side effects like console.log.

    Q2. Does filter() change the original array?
    Ans: No. It returns a new array and the original stays the same.

    Q3. Why is reduce() useful for totals?
    Ans: It goes through the array and keeps an accumulator, so it can combine
    all the values into a single value (like a sum).

    Q4. Which method returns a new transformed array?
    Ans: map()
  */
}

// ---------------------------------------------------------
// Task 2 - Map and Set
// ---------------------------------------------------------
function task2MapAndSet() {
  console.log("\n===== Task 2A: Map inventory =====");

  // key = product ID, value = product details
  const inventory = new Map();
  cart.forEach((item) => {
    inventory.set(item.id, { name: item.name, price: item.price, quantity: item.qty });
  });

  // get a product
  console.log("Get 101:", inventory.get(101));

  // update its quantity
  const laptop = inventory.get(101);
  laptop.quantity = 10;
  inventory.set(101, laptop);
  console.log("After update, 101 quantity:", inventory.get(101).quantity);

  // delete one
  inventory.delete(103);
  console.log("Has 103 after delete?", inventory.has(103)); // false
  console.log("Inventory size:", inventory.size);

  // loop over all entries
  for (const [id, details] of inventory) {
    console.log(`  ID ${id} -> ${details.name}, ₹${details.price}, qty ${details.quantity}`);
  }

  console.log("\n===== Task 2B: Remove duplicates with Set =====");
  const emails = [
    "rahul@gmail.com",
    "priya@gmail.com",
    "rahul@gmail.com",
    "arjun@gmail.com",
    "priya@gmail.com",
  ];
  const uniqueEmails = [...new Set(emails)];
  console.log("Unique emails:", uniqueEmails);

  /*
    Q1. How is Map different from a plain object?
    Ans: Map keys can be any type (even objects), Map remembers insertion order,
    has a .size property and is easy to loop over. Plain object keys are
    only strings or symbols.

    Q2. Why is Set good for removing duplicates?
    Ans: A Set only stores unique values, so duplicates are ignored automatically.

    Q3. Can a Map use an object as a key?
    Ans: Yes.

    Q4. Does Set keep insertion order?
    Ans: Yes, it keeps the order in which values were first added.
  */
  const objKey = { id: 1 };
  const demoMap = new Map([[objKey, "object as key works"]]);
  console.log("Object as Map key:", demoMap.get(objKey));
}

// ---------------------------------------------------------
// Task 3 - Object.freeze() vs Object.seal()
// ---------------------------------------------------------
function task3FreezeSeal() {
  console.log("\n===== Task 3: freeze vs seal =====");

  const productConfig = { name: "Laptop", price: 50000, stock: 20 };

  const frozenConfig = Object.freeze({ ...productConfig });
  const sealedConfig = Object.seal({ ...productConfig });

  // helper to try an action and log what happened
  const tryAction = (label, action) => {
    try {
      action();
      console.log(`  ${label}: worked`);
    } catch (error) {
      console.log(`  ${label}: FAILED -> ${error.message}`);
    }
  };

  console.log("Frozen object:");
  tryAction("change price", () => { frozenConfig.price = 45000; });
  tryAction("add property", () => { frozenConfig.color = "Black"; });
  tryAction("delete property", () => { delete frozenConfig.stock; });
  console.log("  Final frozen:", frozenConfig);

  console.log("Sealed object:");
  tryAction("change price", () => { sealedConfig.price = 45000; });
  tryAction("add property", () => { sealedConfig.color = "Black"; });
  tryAction("delete property", () => { delete sealedConfig.stock; });
  console.log("  Final sealed:", sealedConfig);

  // nested object example (shallow freeze)
  const order = Object.freeze({ id: 1, address: { city: "Mumbai" } });
  order.address.city = "Delhi"; // works because freeze is shallow
  console.log("Nested object changed after freeze:", order.address.city);

  /*
    Q1. Difference between freeze() and seal()?
    Ans: freeze() - cannot add, delete or change properties.
         seal()   - cannot add or delete properties, but existing ones CAN be changed.

    Q2. Can a property be changed after seal()?
    Ans: Yes (as we saw price changed to 45000).

    Q3. Are nested objects frozen automatically?
    Ans: No, freeze only works on the first level.

    Q4. What is shallow freezing?
    Ans: Only the top level properties are locked, objects inside it can still
    be changed. For deep freeze we need to freeze the inner objects too
    (recursively).
  */
}

task1ArrayMethods();
task2MapAndSet();
task3FreezeSeal();
