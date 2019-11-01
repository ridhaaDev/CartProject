let cart = new Map()

function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
}

function saveCart() {
    localStorage.setItem("shoppingCart",
        JSON.stringify(
            Array.from(
                cart.entries()
            )
        )
    );
}

function clearCart() {
    cart = new Map()
    saveCart()
}

function loadCart() {
    cart = new Map(
        JSON.parse(
            localStorage.getItem("shoppingCart")
        )
    );
}

loadCart()

/**
 * This function adds a new item to the cart or updates the count if its there
 * @param {*} name this is the name of the item
 * @param {*} price this is the price of the item
 * @param {*} count this is the number of units selected, optional
 */
function addToCart(name, price, count=1) {
    let item = cart.get(name);

    // Item is already in cart
    if (item) {
        item.count += count; // update the count
    } else {
        item = new Item(name, price, count); // Add the new item
        cart.set(name, item)
    }

    saveCart()
}

function removeFromCart(name, count=1) {
    let item = cart.get(name);

    if (item) {
        if (item.count <= count) {
            cart.delete(name);
        } else {
            item.count -= count; // update the count
        }
    }

    saveCart()
}

/**
 * Get the total of all the items in the cart
 */
function totalCart() {
    let total = 0;

    for (let item of cart.values()) {
        total += item.price * item.count
    }

    return total;
}


// GUI
function addGUI(item) {
    let name = item.getAttribute("data-name");
    let price = item.getAttribute("data-price");

    addToCart(name, price)
    
}