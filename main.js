function addProductItem() {
    // Get the input field and button elements
    const inputBox = document.querySelector(".input-box");
    const addButton = document.querySelector(".input-button");
  
    // Get the container for product items
    const productItemsContainer = document.querySelector(".product-item.section").parentNode;
  
    // Get the value from the input field
    const itemName = inputBox.value.trim();
  
    // Check if the input field is empty
    if (!itemName) {
      return; // Do nothing if the input field is empty
    }
  
    // Create a new product item element
    const newProductItem = document.createElement("div");
    newProductItem.classList.add("product-item", "section");
  
    // Create the product name element
    const productName = document.createElement("h3");
    productName.classList.add("product-name");
    productName.textContent = itemName;
    newProductItem.appendChild(productName);
  
    // Create the quantity control element
    const quantityControl = document.createElement("div");
    quantityControl.classList.add("quantity-control");
  
    // Create the decrement button
    const decrementButton = document.createElement("button");
    decrementButton.classList.add("quantity-btn", "decrement", "disabled");
    decrementButton.textContent = "-";
    decrementButton.dataset.tooltip = "Зменшити кількість (Зменшити кількість unavailable)"; // Set tooltip with disabled text
    quantityControl.appendChild(decrementButton);
  
    // Create the quantity display
    const quantityDisplay = document.createElement("div");
    quantityDisplay.classList.add("quantity");
    quantityDisplay.textContent = "1"; // Default quantity to 1
    quantityControl.appendChild(quantityDisplay);
  
    // Create the increment button
    const incrementButton = document.createElement("button");
    incrementButton.classList.add("quantity-btn", "increment");
    incrementButton.textContent = "+";
    incrementButton.dataset.tooltip = "Збільшити кількість";
    quantityControl.appendChild(incrementButton);
  
    // Add the quantity control to the product item
    newProductItem.appendChild(quantityControl);
  
    // Create the action buttons element
    const actionButtons = document.createElement("div");
    actionButtons.classList.add("action-buttons");
  
    // Create the "Куплено" (Purchased) button
    const purchasedButton = document.createElement("button");
    purchasedButton.classList.add("action-btn");
    purchasedButton.textContent = "Куплено";
    purchasedButton.dataset.tooltip = "Позначити як куплене";
    actionButtons.appendChild(purchasedButton);
  
    // Create the remove button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.textContent = "⨉";
    removeButton.dataset.tooltip = "Видалити товар";
    actionButtons.appendChild(removeButton);
  
    // Add the action buttons to the product item
    newProductItem.appendChild(actionButtons);
  
    // Clear the input field
    inputBox.value = "";
  
    // Add the new product item to the container
    productItemsContainer.appendChild(newProductItem);
  }
  
  // Add event listener to the button
  const addButton = document.querySelector(".input-button");
  addButton.addEventListener("click", addProductItem);
  