// Part F - Final Integration Challenge
// Run with: node quickcart.js
// Uses: class, destructuring, map, filter, reduce, Set, Map, Object.freeze,
// JSON.stringify, async/await with try/catch and template literals.

// Product class
class Product {
  constructor(id, name, price, qty) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.qty = qty;
  }

  // total price of this product (price x qty)
  getTotal() {
    return this.price * this.qty;
  }
}

// order configuration - frozen so nobody can change it by mistake
const orderConfig = Object.freeze({
  customer: "Rahul",
  currency: "₹",
  highValueLimit: 5000,
});

// small helper that waits for some time (to mimic a server call)
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// async order confirmation
async function confirmOrder(order) {
  try {
    console.log("Order Status: Processing...");
    await wait(1000);
    if (order.totalAmount <= 0) {
      throw new Error("Invalid order amount");
    }
    console.log("Order Status: Confirmed Successfully!");
    return true;
  } catch (error) {
    console.log(`Order Status: Failed - ${error.message}`);
    return false;
  }
}

async function main() {
  // raw data
  const productData = [
    { id: 1, name: "Laptop", price: 50000, qty: 1 },
    { id: 2, name: "Mouse", price: 1000, qty: 2 },
    { id: 3, name: "Monitor", price: 15000, qty: 1 },
    { id: 4, name: "Keyboard", price: 2000, qty: 1 },
  ];

  // create Product objects
  const products = productData.map(
    ({ id, name, price, qty }) => new Product(id, name, price, qty)
  );

  // map() for product totals
  const productTotals = products.map(({ name, price, qty }) => ({
    name,
    total: price * qty,
  }));

  // filter() for products over 5000
  const highValueProducts = products.filter(
    (product) => product.price > orderConfig.highValueLimit
  );

  // reduce() for the order total
  const totalAmount = productTotals.reduce((sum, item) => sum + item.total, 0);

  // Set of unique product IDs
  const uniqueIds = new Set(products.map((product) => product.id));

  // Map for inventory (id -> product)
  const inventory = new Map();
  products.forEach((product) => inventory.set(product.id, product));

  // build the order object
  const { customer, currency } = orderConfig; // destructuring
  const order = {
    customer,
    items: productTotals,
    highValueItems: highValueProducts.map((p) => p.name),
    totalAmount,
    uniqueProducts: uniqueIds.size,
    inventorySize: inventory.size,
  };

  // JSON.stringify() on the order
  const orderJSON = JSON.stringify(order);

  // print summary
  console.log("====== QUICKCART ORDER SUMMARY ======");
  console.log(`Customer: ${customer}`);
  console.log("Products:");
  productTotals.forEach(({ name, total }) => {
    console.log(`${name} - ${currency}${total}`);
  });
  console.log(`Total Order Amount: ${currency}${totalAmount}`);
  console.log(`Unique Products: ${uniqueIds.size}`);

  const confirmed = await confirmOrder(order);
  console.log("=====================================");

  // extra info to show the other requirements are working
  console.log("\n--- Extra info ---");
  console.log("Products over ₹5000:", order.highValueItems.join(", "));
  console.log("Order as JSON:", orderJSON);
  console.log("Confirmed?", confirmed);

  // proof that frozen config cannot be changed (silently ignored in normal mode)
  orderConfig.customer = "Someone Else";
  console.log("Customer after trying to change frozen config:", orderConfig.customer);
}

main();
