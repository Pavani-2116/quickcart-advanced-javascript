// Part D - Asynchronous JavaScript & Promises
// Run with: node order-processing.js
// (takes around 20 seconds because of the 1 second delays)

// ---------------------------------------------------------
// Task 1 - Event loop (predict the output order)
// ---------------------------------------------------------
function task1EventLoop() {
  console.log("===== Task 1: Event loop =====");
  console.log("Order Started");
  setTimeout(() => console.log("Payment Processing"), 0);
  Promise.resolve().then(() => console.log("Payment Successful"));
  console.log("Order Completed");

  /*
    Output order:
      Order Started
      Order Completed
      Payment Successful
      Payment Processing

    Q1. Why does the Promise callback run before setTimeout()?
    Ans: Promise .then() callbacks go to the microtask queue and setTimeout
    callbacks go to the macrotask queue. After the main code finishes, the event
    loop runs ALL microtasks first and only then picks a macrotask.

    Q2. What are microtask and macrotask queues?
    Ans: Microtask queue = promise callbacks (.then/.catch), queueMicrotask.
         Macrotask queue = setTimeout, setInterval, DOM events etc.

    Q3. What role does the call stack play?
    Ans: It keeps track of the function currently running. Synchronous code runs
    on the call stack one by one (last in, first out).

    Q4. What does the event loop do?
    Ans: It keeps checking if the call stack is empty. If it is, it moves the
    next task from the queues (microtasks first) to the call stack.
  */
}

// ---------------------------------------------------------
// Task 2 - Callbacks (callback hell)
// ---------------------------------------------------------
function validateOrder(cb) {
  setTimeout(() => {
    console.log("Order Validated");
    cb();
  }, 1000);
}

function processPayment(cb) {
  setTimeout(() => {
    console.log("Payment Completed");
    cb();
  }, 1000);
}

function sendConfirmation(cb) {
  setTimeout(() => {
    console.log("Confirmation Sent");
    cb();
  }, 1000);
}

function task2Callbacks(done) {
  console.log("\n===== Task 2: Callbacks =====");
  // nested callbacks - each step starts after the previous one finishes
  validateOrder(() => {
    processPayment(() => {
      sendConfirmation(() => {
        console.log("All steps done with callbacks");
        done();
      });
    });
  });

  /*
    Why is callback hell hard to maintain?
    Ans: The code keeps going deeper to the right (pyramid shape), so it is
    hard to read. Error handling has to be repeated at every level, and adding
    or changing a step means editing nested code, which easily creates bugs.
  */
}

// ---------------------------------------------------------
// Task 3 - Promises
// ---------------------------------------------------------
function validateOrderPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Order Validated");
      resolve();
    }, 1000);
  });
}

// shouldFail is only to test the .catch() / try-catch part
function processPaymentPromise(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Payment Failed"));
      } else {
        console.log("Payment Completed");
        resolve();
      }
    }, 1000);
  });
}

function sendConfirmationPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Confirmation Sent");
      resolve();
    }, 1000);
  });
}

function task3Promises() {
  console.log("\n===== Task 3: Promises =====");
  // success flow
  return validateOrderPromise()
    .then(() => processPaymentPromise())
    .then(() => sendConfirmationPromise())
    .then(() => console.log("All steps done with promises"))
    .catch((error) => console.log("Error:", error.message))
    .then(() => {
      // failure flow to show .catch()
      console.log("-- now testing a failing payment --");
      return validateOrderPromise()
        .then(() => processPaymentPromise(true))
        .then(() => sendConfirmationPromise()) // skipped because payment failed
        .catch((error) => console.log("Error caught in .catch():", error.message));
    });
}

// ---------------------------------------------------------
// Task 4 - async / await
// ---------------------------------------------------------
async function placeOrder(paymentShouldFail = false) {
  try {
    await validateOrderPromise();
    await processPaymentPromise(paymentShouldFail);
    await sendConfirmationPromise();
    console.log("SUCCESS: Order placed successfully!");
  } catch (error) {
    console.log("FAILURE: Order could not be placed ->", error.message);
  }
}

async function task4AsyncAwait() {
  console.log("\n===== Task 4: async/await =====");
  await placeOrder(false); // success
  await placeOrder(true); // failure
}

// ---------------------------------------------------------
// Task 5 - Promise combinators
// ---------------------------------------------------------
const productsAPI = () =>
  new Promise((resolve) => setTimeout(() => resolve("Products Loaded"), 1000));

const paymentAPI = () =>
  new Promise((_, reject) => setTimeout(() => reject("Payment Service Failed"), 1500));

const deliveryAPI = () =>
  new Promise((resolve) => setTimeout(() => resolve("Delivery Loaded"), 2000));

async function task5Combinators() {
  console.log("\n===== Task 5: Promise combinators =====");

  // Promise.all - fails if any one fails
  try {
    const results = await Promise.all([productsAPI(), paymentAPI(), deliveryAPI()]);
    console.log("all():", results);
  } catch (error) {
    console.log("all() failed ->", error); // Payment Service Failed
  }

  // Promise.allSettled - gives status of every request
  const settled = await Promise.allSettled([productsAPI(), paymentAPI(), deliveryAPI()]);
  console.log("allSettled():");
  settled.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`  API ${index + 1}: fulfilled -> ${result.value}`);
    } else {
      console.log(`  API ${index + 1}: rejected -> ${result.reason}`);
    }
  });

  // Promise.race - first promise to settle (success or fail)
  try {
    const first = await Promise.race([productsAPI(), paymentAPI(), deliveryAPI()]);
    console.log("race():", first); // Products Loaded (1000ms is fastest)
  } catch (error) {
    console.log("race() rejected ->", error);
  }

  // Promise.any - first SUCCESS
  try {
    const firstSuccess = await Promise.any([productsAPI(), paymentAPI(), deliveryAPI()]);
    console.log("any():", firstSuccess); // Products Loaded
  } catch (error) {
    console.log("any() failed ->", error.message);
  }

  // Promise.any when every promise rejects
  try {
    await Promise.any([Promise.reject("A failed"), Promise.reject("B failed")]);
  } catch (error) {
    console.log("any() with all rejected ->", error.name, "|", error.errors);
  }

  /*
    Q1. Difference between all() and allSettled()?
    Ans: all() rejects immediately if any promise rejects. allSettled() waits for
    every promise and returns an array with status (fulfilled/rejected) for each.

    Q2. Does race() wait for success or just the first settled result?
    Ans: Just the first settled result. It can be a success or a rejection.

    Q3. How is any() different from race()?
    Ans: any() ignores rejections and returns the first FULFILLED promise.
    race() returns whichever finishes first, even if it is a failure.

    Q4. What happens when every promise in any() rejects?
    Ans: It rejects with an AggregateError that contains all the errors
    in its .errors array.
  */
}

// ---------------------------------------------------------
// Run everything one after another
// ---------------------------------------------------------
async function main() {
  task1EventLoop();
  // wait a bit so Task 1 output finishes before Task 2 starts
  await new Promise((resolve) => setTimeout(resolve, 100));
  await new Promise((resolve) => task2Callbacks(resolve));
  await task3Promises();
  await task4AsyncAwait();
  await task5Combinators();
  console.log("\nPart D finished.");
}

main();
