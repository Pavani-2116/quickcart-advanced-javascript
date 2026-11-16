// Part E - Performance Optimization & DOM Events
// Open index.html in the browser to test.

// wrapped in a function so we do not create global variables
(function () {
  // ---------------------------------------------------------
  // Task 1 - Debouncing
  // ---------------------------------------------------------
  // runs callback only after the user stops calling it for `delay` ms
  function debounce(callback, delay) {
    let timerId; // closure keeps this variable alive
    return function (...args) {
      clearTimeout(timerId); // cancel the previous timer
      timerId = setTimeout(() => {
        callback.apply(this, args);
      }, delay);
    };
  }

  const searchInput = document.getElementById("searchInput");
  const keyCount = document.getElementById("keyCount");
  const searchCount = document.getElementById("searchCount");
  const searchResult = document.getElementById("searchResult");
  let keys = 0;
  let searches = 0;

  function searchProducts(text) {
    searches++;
    searchCount.textContent = searches;
    searchResult.textContent = `Searching for "${text}" ...`;
    console.log("Search API called with:", text);
  }

  const debouncedSearch = debounce((event) => searchProducts(event.target.value), 500);

  searchInput.addEventListener("input", (event) => {
    keys++;
    keyCount.textContent = keys; // runs on every key
    debouncedSearch(event); // runs only after 500 ms pause
  });

  // ---------------------------------------------------------
  // Task 2 - Throttling
  // ---------------------------------------------------------
  // runs callback at most once in every `delay` ms
  function throttle(callback, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        callback.apply(this, args);
      }
    };
  }

  const scrollBox = document.getElementById("scrollBox");
  const scrollEvents = document.getElementById("scrollEvents");
  const scrollRuns = document.getElementById("scrollRuns");
  let scrollEventCount = 0;
  let scrollRunCount = 0;

  const throttledScroll = throttle(() => {
    scrollRunCount++;
    scrollRuns.textContent = scrollRunCount;
    console.log("Throttled scroll handler ran. scrollTop =", scrollBox.scrollTop);
  }, 1000);

  scrollBox.addEventListener("scroll", () => {
    scrollEventCount++;
    scrollEvents.textContent = scrollEventCount;
    throttledScroll();
  });

  /*
    Q1. Debouncing vs throttling?
    Ans: Debounce waits until the user STOPS doing the action for some time and
    then runs once. Throttle runs the function regularly, but at most once per
    interval while the action keeps happening.
    Q2. Which suits search suggestions?  Ans: Debouncing.
    Q3. Which suits scroll and resize?   Ans: Throttling.
  */

  // ---------------------------------------------------------
  // Task 3 - Memoization
  // ---------------------------------------------------------
  function calculateDiscount(price, percentage) {
    return price - (price * percentage) / 100;
  }

  // wrapper which caches results by arguments
  function memoize(fn) {
    const cache = {}; // closure - cache stays private
    return function (...args) {
      const key = JSON.stringify(args);
      if (key in cache) {
        console.log("From cache for", key);
        return { value: cache[key], source: "cache" };
      }
      console.log("Fresh calculation for", key);
      const result = fn(...args);
      cache[key] = result;
      return { value: result, source: "fresh calculation" };
    };
  }

  const memoizedDiscount = memoize(calculateDiscount);

  const priceInput = document.getElementById("priceInput");
  const percentInput = document.getElementById("percentInput");
  const discountResult = document.getElementById("discountResult");
  const discountLog = document.getElementById("discountLog");

  document.getElementById("discountBtn").addEventListener("click", () => {
    const price = Number(priceInput.value);
    const percentage = Number(percentInput.value);
    const { value, source } = memoizedDiscount(price, percentage);

    discountResult.textContent = `Final price: ₹${value} (from ${source})`;
    const li = document.createElement("li");
    li.textContent = `price=${price}, discount=${percentage}% -> ₹${value} [${source}]`;
    discountLog.appendChild(li);
  });

  /*
    Q1. What is memoization?
    Ans: Saving (caching) the result of a function for given arguments so if the
    same arguments come again, we return the saved result.
    Q2. How does it improve performance?
    Ans: It avoids repeating heavy calculations.
    Q3. Role of closures?
    Ans: The returned function remembers the cache object from its outer function,
    so the cache stays private and keeps its data between calls.
  */

  // ---------------------------------------------------------
  // Task 4a - Event bubbling
  // ---------------------------------------------------------
  const bubbleParent = document.getElementById("bubbleParent");
  const bubbleButton = document.getElementById("bubbleButton");
  const bubbleLog = document.getElementById("bubbleLog");
  const stopCheck = document.getElementById("stopCheck");

  function addLog(text) {
    const li = document.createElement("li");
    li.textContent = text;
    bubbleLog.appendChild(li);
  }

  bubbleButton.addEventListener("click", (event) => {
    addLog("Child button handler ran");
    if (stopCheck.checked) {
      event.stopPropagation(); // parent handler will NOT run
      addLog("stopPropagation() called - bubbling stopped");
    }
  });

  bubbleParent.addEventListener("click", () => {
    addLog("Parent div handler ran (event bubbled up)");
  });

  // ---------------------------------------------------------
  // Task 4b - Event delegation
  // ---------------------------------------------------------
  const productList = document.getElementById("productList");
  const deleteMsg = document.getElementById("deleteMsg");

  // ONE listener on the parent handles all Remove buttons
  productList.addEventListener("click", (event) => {
    // event.target = the exact element clicked
    // event.currentTarget = the element the listener is attached to (productList)
    if (event.target.classList.contains("remove-btn")) {
      const item = event.target.closest("li");
      const name = item.querySelector("span").textContent;
      item.remove();
      deleteMsg.textContent = `Removed: ${name}`;
      console.log("target:", event.target.tagName, "| currentTarget:", event.currentTarget.id);
    }
  });

  // add a new product dynamically - the Remove button works without a new listener
  let nextId = 4;
  document.getElementById("addProductBtn").addEventListener("click", () => {
    const li = document.createElement("li");
    li.dataset.id = nextId;
    li.innerHTML = `<span>New Product ${nextId} - ₹${nextId * 100}</span> <button class="remove-btn">Remove</button>`;
    productList.appendChild(li);
    nextId++;
  });

  /*
    Q1. Event bubbling?
    Ans: When an event happens on an element, it first runs on that element and
    then moves up to its parent, grandparent and so on.
    Q2. Event delegation?
    Ans: Adding one listener on a parent and using event.target to find which
    child was clicked, instead of adding a listener to every child.
    Q3. Why useful for dynamic elements?
    Ans: New elements added later are covered automatically since the parent
    listener already exists. Also less memory usage.
    Q4. event.stopPropagation()?
    Ans: Stops the event from going up to the parent elements.
    Q5. event.target vs event.currentTarget?
    Ans: target = the element that was actually clicked (can be the inner child).
    currentTarget = the element on which the listener is attached.
  */
})();
