# QuickCart – Advanced JavaScript Practical Assignment

## Overview
QuickCart is an online shopping platform. In this assignment I fixed, implemented and
optimised its features using modern JavaScript (ES6+): objects and classes, array
methods, JSON handling, asynchronous order flow, performance optimisation and DOM
events. No frameworks or libraries are used.

## Technologies Used
- JavaScript (ES6+)
- HTML5 and CSS3 (Part E)
- Node.js (to run Parts A, B, C, D and F in the terminal)
- Git and GitHub

## How to Run

Make sure Node.js is installed (`node -v`).

```bash
node part-a-objects-classes/products.js
node part-b-array-methods/shopping-cart.js
node part-c-json-debugging/json-handling.js
node part-d-asynchronous/order-processing.js     # takes about 20 seconds
node part-f-integration/quickcart.js
```

Part E runs in the browser: open `part-e-optimization-events/index.html`
(double click it, or use the Live Server extension in VS Code).

## Folder Structure
```
quickcart-advanced-javascript/
├── part-a-objects-classes/products.js
├── part-b-array-methods/shopping-cart.js
├── part-c-json-debugging/json-handling.js
├── part-d-asynchronous/order-processing.js
├── part-e-optimization-events/index.html, script.js, style.css
├── part-f-integration/quickcart.js
└── README.md
```

## Explanation of Each Part

**Part A – Objects, Prototypes & ES6 Classes**
Created a `Product` constructor with `displayProduct()` on the prototype, then ES6
classes (`Product`, `ElectronicProduct`, `ClothingProduct`) using `extends` and
`super()`. Also used arrow functions, template literals, destructuring, rest and spread.

**Part B – Array Methods, Map, Set & Object Methods**
Used `map`, `filter`, `reduce` and `forEach` on the cart. Built a `Map` inventory
(get, update, delete, loop), removed duplicate emails with `Set`, and compared
`Object.freeze()` with `Object.seal()`.

**Part C – JSON Handling & Output-Based Debugging**
Used `JSON.stringify` / `JSON.parse` and showed which properties are lost
(`undefined` and functions). Predicted the output of six tricky JSON lines
(undefined, NaN, invalid JSON, circular reference, Date).

**Part D – Asynchronous JavaScript**
Event loop output order, then the 5-step order flow written with callbacks,
Promises (`.then/.catch`) and `async/await` with `try/catch`. Also compared
`Promise.all`, `allSettled`, `race` and `any` using three mock APIs.

**Part E – Performance Optimization & DOM Events**
Debounced search (500 ms), throttled scroll (1000 ms), memoized discount function,
event bubbling with `stopPropagation()`, and event delegation for Remove buttons.

**Part F – Final Integration Challenge**
Order summary for customer Rahul using a `Product` class, destructuring, `map`,
`filter`, `reduce`, `Set`, `Map`, `Object.freeze`, `JSON.stringify`, `async/await`
with `try/catch` and a template literal. Values are calculated, not hardcoded.

## Screenshots (DOM features – Part E)
> Add your own screenshots in a `screenshots/` folder and link them here, e.g.

- `![Debounce search](screenshots/debounce.png)`
- `![Throttle scroll](screenshots/throttle.png)`
- `![Memoization](screenshots/memoization.png)`
- `![Bubbling and delegation](screenshots/events.png)`

## Submission Links
- GitHub Repository: *(paste your public repo URL)*
- Loom Video: *(paste your Loom link)*
- Live Link: N.A
