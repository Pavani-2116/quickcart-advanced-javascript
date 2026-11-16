// Part C - JSON Handling & Output-Based Debugging
// Run with: node json-handling.js

// ---------------------------------------------------------
// Task 1 - JSON.stringify() and JSON.parse()
// ---------------------------------------------------------
function task1() {
  console.log("===== Task 1: stringify and parse =====");

  const order = {
    orderId: 501,
    customer: "Rahul",
    amount: 5000,
    deliveryDate: undefined,
    discount: null,
    calculateTax: function () {
      return 500;
    },
  };

  const jsonString = JSON.stringify(order);
  console.log("JSON string:", jsonString);
  // {"orderId":501,"customer":"Rahul","amount":5000,"discount":null}

  const parsedOrder = JSON.parse(jsonString);
  console.log("Parsed object:", parsedOrder);

  console.log("Has deliveryDate?", "deliveryDate" in parsedOrder); // false
  console.log("Has calculateTax?", "calculateTax" in parsedOrder); // false
  console.log("discount kept as:", parsedOrder.discount); // null

  /*
    Properties lost: deliveryDate (undefined) and calculateTax (function).
    discount: null is kept because null is a valid JSON value.

    Why do functions and undefined behave differently?
    Ans: JSON is only a text format for data. It supports string, number,
    boolean, null, array and object. It has no way to represent undefined or
    functions, so in an object they are skipped. (In an array, they become null
    so the positions do not shift.)
  */
}

// ---------------------------------------------------------
// Task 2 - Predict the output
// ---------------------------------------------------------
function task2() {
  console.log("\n===== Task 2: Predict the output =====");

  // Q1 - undefined in an object
  console.log("Q1:", JSON.stringify({ name: "Rahul", age: undefined }));
  // Output: {"name":"Rahul"}
  // Reason: properties with undefined value are skipped in objects.

  // Q2 - undefined in an array
  console.log("Q2:", JSON.stringify([10, undefined, 30]));
  // Output: [10,null,30]
  // Reason: in arrays undefined is converted to null to keep the positions.

  // Q3 - NaN and Infinity
  console.log("Q3:", JSON.stringify({ price: NaN, discount: Infinity }));
  // Output: {"price":null,"discount":null}
  // Reason: NaN and Infinity are not valid JSON numbers, so they become null.

  // Q4 - invalid JSON
  try {
    console.log("Q4:", JSON.parse("{name: 'Rahul', age: 25}"));
  } catch (error) {
    console.log("Q4: Error ->", error.name);
    // Output: SyntaxError
    // Reason: JSON needs double quotes for keys and strings. Here the key has
    // no quotes and the value uses single quotes, so it is invalid.
  }

  // Q5 - circular reference
  const user = { name: "Rahul" };
  user.self = user;
  try {
    console.log("Q5:", JSON.stringify(user));
  } catch (error) {
    console.log("Q5: Error ->", error.name);
    // Output: TypeError (Converting circular structure to JSON)
    // Reason: user.self points to user itself, so stringify would loop forever.
  }

  // Q6 - Date object
  console.log("Q6:", JSON.stringify({ createdAt: new Date("2026-01-01") }));
  // Output: {"createdAt":"2026-01-01T00:00:00.000Z"}
  // Reason: Date has a toJSON() method which returns an ISO string. After
  // JSON.parse it will be a plain string, not a Date object again.
}

task1();
task2();
