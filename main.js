// Add event listener to the button
const addButton = document.querySelector(".input-button");
addButton.addEventListener("click", addProductItem);
const field = document.querySelector(".input-box");
field.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
      addProductItem();
  }
});

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
  
    initAddProductItem(itemName);
  
    // Clear the input field
    inputBox.value = "";
    inputBox.focus();
  }
  function addProductItemEnter() {
    // Get the input field and button elements
    const inputBox = document.querySelector(".input-box");
    const addButton = document.querySelector(".input-button");
  
    // Get the container for product items
    const productItemsContainer = document.querySelector(".product-item.section").parentNode;
  
    // Get the value from the input field
    const itemName = inputBox.ariaValueNow.trim();

  
    // Check if the input field is empty
    if (!itemName) {
      return; // Do nothing if the input field is empty
    }
  
    initAddProductItem(itemName);
  
    // Clear the input field
    inputBox.value = "";
    inputBox.focus();
  }
  function initAddProductItem(name) {
  
    // Get the container for product items
    const productItemsContainer = document.querySelector(".product-item.section").parentNode;
  
    // Get the value from the input field
    const itemName = name;
  
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
    if (productName) {
      const editProductName = document.createElement('input');
      editProductName.type = 'text';
      editProductName.className = 'edit-product-name';
      editProductName.style.display = 'none';
      productName.parentNode.insertBefore(editProductName, productName.nextSibling);

      productName.addEventListener('click', () => {
          if (!productName.classList.contains('purchased')) {
              editProductName.value = productName.textContent;
              productName.style.display = 'none';
              editProductName.style.display = 'block';
              editProductName.focus();
          }
      });

      editProductName.addEventListener('blur', () => {
          if(!editProductName.value.trim()){
            editProductName.value = productName.textContent;
          }
          productName.textContent = editProductName.value;
          productName.style.display = 'block';
          editProductName.style.display = 'none';
      });

      editProductName.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
              editProductName.blur();
          }
      });

      addItem(name);
    }

    function addItem(name){
        // Create a new product item element
      const newProductItem = document.createElement("div");
      newProductItem.classList.add("product-item", "section");

      // Create the product name element
      const productName = document.createElement("h3");
      productName.classList.add("product-name");
      productName.textContent = itemName;
      newProductItem.appendChild(productName);

      // Create the badge element
      const badge = document.createElement("div");
      badge.classList.add("badge");
      badge.textContent = "1";
       newProductItem.appendChild(badge);

  // Add the item to the pending list
      const pendingList = document.querySelector(".pending-list");
      const pendingItem = document.createElement("div");
      pendingItem.classList.add("item");
      pendingItem.textContent = itemName;
      pendingItem.appendChild(badge.cloneNode(true)); // Clone the badge for consistency
      pendingList.appendChild(pendingItem);
    }
  
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
    if (decrementButton && incrementButton && quantityDisplay) {
      // Initialize button states
      updateButtonState(decrementButton, quantityDisplay);

      // Handle decrement button click
      decrementButton.addEventListener('click', function () {
          let quantity = parseInt(quantityDisplay.textContent);
          if (quantity > 1) {
              quantity--;
              quantityDisplay.textContent = quantity;
          }
          updateButtonState(decrementButton, quantityDisplay);
      });

      // Handle increment button click
      incrementButton.addEventListener('click', function () {
          let quantity = parseInt(quantityDisplay.textContent);
          quantity++;
          quantityDisplay.textContent = quantity;
          updateButtonState(decrementButton, quantityDisplay);
      });
  }

  function updateButtonState(decrementButton, quantityDisplay) {
    if (parseInt(quantityDisplay.textContent) <= 1) {
      decrementButton.classList.add('disabled');
    } else {
      decrementButton.classList.remove('disabled');
    }
  }
  
    // Create the action buttons element
    const actionButtons = document.createElement("div");
    actionButtons.classList.add("action-buttons");
  
    // Create the "Куплено" (Purchased) button
    const purchasedButton = document.createElement("button");
    purchasedButton.classList.add("action-btn");
    purchasedButton.textContent = "Куплено";
    purchasedButton.dataset.tooltip = "Позначити як куплене";
    actionButtons.appendChild(purchasedButton);
    purchasedButton.addEventListener('click', ()=>{
      // Find the closest product-item and remove it
      const productItem = removeButton.closest('.product-item');
      if (productItem) {
          markAsPurchased(productItem);
      }
    });
  
    // Create the remove button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.textContent = "⨉";
    removeButton.dataset.tooltip = "Видалити товар";
    actionButtons.appendChild(removeButton);
    removeButton.addEventListener('click', ()=>{
      // Find the closest product-item and remove it
      const productItem = removeButton.closest('.product-item');
      if (productItem) {
          productItem.remove();
      }
    });
  
    // Add the action buttons to the product item
    newProductItem.appendChild(actionButtons);
  
    // Add the new product item to the container
    productItemsContainer.appendChild(newProductItem);
  }
// Pre-load three product items on page load
initAddProductItem("Помідори"); // Change these names to your products
initAddProductItem("Печиво"); 
initAddProductItem("Сир"); 

function markAsPurchased(productItem) {
  const productName = productItem.querySelector('.product-name');
  const quantityControl = productItem.querySelector('.quantity-control');
  const actionButtons = productItem.querySelector('.action-buttons');
  
  productName.classList.add('purchased');
  productName.style.textDecoration = 'line-through';
  
  if (quantityControl) {
    const quantBtns = quantityControl.querySelectorAll(".quantity-btn");
    if(quantBtns){
      Array.prototype.forEach.call(quantBtns, child => {
        child.style.display = "none";
      });
    }
  }
  
  actionButtons.innerHTML = `
      <button data-tooltip="Видалити з куплених" class="action-btn unpurchase-btn">Не куплено</button>
  `;
  
  const unpurchaseBtn = productItem.querySelector('.unpurchase-btn');
  unpurchaseBtn.addEventListener('click', function() {
      markAsUnpurchased(productItem);
  });
}

// Function to mark product as unpurchased
function markAsUnpurchased(productItem) {
  const productName = productItem.querySelector('.product-name');
  const quantityControl = productItem.querySelector('.quantity-control');
  const actionButtons = productItem.querySelector('.action-buttons');
  
  productName.classList.remove('purchased');
  productName.style.textDecoration = 'none';
  
  if (quantityControl) {
    const quantBtns = quantityControl.querySelectorAll(".quantity-btn");
    if(quantBtns){
      Array.prototype.forEach.call(quantBtns, child => {
        child.style.display = "block";
      });
    }
  }
  
  actionButtons.innerHTML = `
      <button data-tooltip="Позначити як куплене" class="action-btn purchase-btn">Куплено</button>
      <button data-tooltip="Видалити товар" class="remove-btn">⨉</button>
  `;
  
  const purchaseBtn = productItem.querySelector('.purchase-btn');
  purchaseBtn.addEventListener('click', function() {
      markAsPurchased(productItem);
  });
  
  const removeBtn = productItem.querySelector('.remove-btn');
  removeBtn.addEventListener('click', function() {
      productItem.remove();
  });
}
  