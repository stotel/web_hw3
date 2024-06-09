const addButton = document.querySelector(".input-button");
addButton.addEventListener("click", addProductItem);

const field = document.querySelector(".input-box");
field.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        addProductItem();
    }
});

function addProductItem() {
    const inputBox = document.querySelector(".input-box");
    const itemName = inputBox.value.trim();

    if (!itemName || isProductItemExists(itemName)) {
      inputBox.focus();
      return;
    }
    initAddProductItem(itemName);

    inputBox.value = "";
    inputBox.focus();
}

function isProductItemExists(name) {
    const productItemsNames = document.querySelectorAll(".product-name");
    for (const prName of productItemsNames) {
        if (prName.textContent.trim().toLowerCase() === name.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function initAddProductItem(name) {
    const productItemsContainer = document.querySelector(".product-item.section").parentNode;

    const newProductItem = document.createElement("div");
    newProductItem.classList.add("product-item", "section");

    const productName = document.createElement("h3");
    productName.classList.add("product-name");
    productName.textContent = name;
    newProductItem.appendChild(productName);

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
        /*if (!editProductName.value.trim()) {
            editProductName.value = productName.textContent;
        }*/
        if (!editProductName.value.trim() || isProductItemExists(editProductName.value.trim())) editProductName.value = productName.textContent;
        productName.textContent = editProductName.value;
        productName.style.display = 'block';
        editProductName.style.display = 'none';
        const badge = item.querySelector(".badge");
        item.textContent = editProductName.value;
        item.appendChild(badge);
    });

    editProductName.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            editProductName.blur();
        }
    });

    const item = addItem(name);

    function addItem(name) {  
        const newProductItem = document.createElement("div");
        newProductItem.classList.add("product-item", "section");

        const productName = document.createElement("h3");
        productName.classList.add("product-name");
        productName.textContent = name;
        newProductItem.appendChild(productName);

        const badge = document.createElement("div");
        badge.classList.add("badge");
        badge.textContent = "1";
        newProductItem.appendChild(badge);

        const pendingList = document.querySelector(".pending-list");
        const pendingItem = document.createElement("div");
        pendingItem.classList.add("item");
        pendingItem.textContent = name;
        pendingItem.appendChild(badge);
        pendingList.appendChild(pendingItem);

        return pendingItem;
    }

    const quantityControl = document.createElement("div");
    quantityControl.classList.add("quantity-control");

    const decrementButton = document.createElement("button");
    decrementButton.classList.add("quantity-btn", "decrement", "disabled");
    decrementButton.textContent = "-";
    decrementButton.dataset.tooltip = "Зменшити кількість (Зменшити кількість unavailable)";
    quantityControl.appendChild(decrementButton);

    const quantityDisplay = document.createElement("div");
    quantityDisplay.classList.add("quantity");
    quantityDisplay.textContent = "1";
    quantityControl.appendChild(quantityDisplay);

    const incrementButton = document.createElement("button");
    incrementButton.classList.add("quantity-btn", "increment");
    incrementButton.textContent = "+";
    incrementButton.dataset.tooltip = "Збільшити кількість";
    quantityControl.appendChild(incrementButton);

    newProductItem.appendChild(quantityControl);

    updateButtonState(decrementButton, quantityDisplay);

    decrementButton.addEventListener('click', function () {
        let quantity = parseInt(quantityDisplay.textContent);
        if (quantity > 1) {
            item.querySelector(".badge").textContent = quantity - 1;
            quantity--;
            quantityDisplay.textContent = quantity;
        }
        updateButtonState(decrementButton, quantityDisplay);
    });

    incrementButton.addEventListener('click', function () {
        let quantity = parseInt(quantityDisplay.textContent);
        item.querySelector(".badge").textContent = quantity + 1;
        quantity++;
        quantityDisplay.textContent = quantity;
        updateButtonState(decrementButton, quantityDisplay);
    });

    function updateButtonState(decrementButton, quantityDisplay) {
        if (parseInt(quantityDisplay.textContent) <= 1) {
            decrementButton.classList.add('disabled');
        } else {
            decrementButton.classList.remove('disabled');
        }
    }

    const actionButtons = document.createElement("div");
    actionButtons.classList.add("action-buttons");

    const purchasedButton = document.createElement("button");
    purchasedButton.classList.add("action-btn");
    purchasedButton.textContent = "Куплено";
    purchasedButton.dataset.tooltip = "Позначити як куплене";
    actionButtons.appendChild(purchasedButton);
    purchasedButton.addEventListener('click', () => {
        const productItem = purchasedButton.closest('.product-item');
        if (productItem) {
            const boughtList = document.querySelector(".bought-list");
            boughtList.appendChild(item);
            item.classList.add("purchased");
            markAsPurchased(productItem, item);
        }
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.textContent = "⨉";
    removeButton.dataset.tooltip = "Видалити товар";
    actionButtons.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        const productItem = removeButton.closest('.product-item');
        if (productItem) {
            item.remove();
            productItem.remove();
        }
    });

    newProductItem.appendChild(actionButtons);
    productItemsContainer.appendChild(newProductItem);
}

function markAsPurchased(productItem, item) {
    const productName = productItem.querySelector('.product-name');
    const quantityControl = productItem.querySelector('.quantity-control');
    const actionButtons = productItem.querySelector('.action-buttons');

    productName.classList.add('purchased');
    productName.style.textDecoration = 'line-through';

    if (quantityControl) {
        const quantBtns = quantityControl.querySelectorAll(".quantity-btn");
        Array.prototype.forEach.call(quantBtns, (child) => {
            child.style.display = "none";
        });
    }

    actionButtons.innerHTML = `<button data-tooltip="Видалити з куплених" class="action-btn unpurchase-btn">Не куплено</button>`;
    
    const unpurchaseBtn = productItem.querySelector('.unpurchase-btn');
    unpurchaseBtn.addEventListener('click', function () {
        const pendingList = document.querySelector(".pending-list");
        pendingList.appendChild(item);
        item.classList.remove("purchased");
        markAsUnpurchased(productItem, item);
    });
}

function markAsUnpurchased(productItem, item) {
    const productName = productItem.querySelector('.product-name');
    const quantityControl = productItem.querySelector('.quantity-control');
    const actionButtons = productItem.querySelector('.action-buttons');

    productName.classList.remove('purchased');
    productName.style.textDecoration = 'none';

    if (quantityControl) {
        const quantBtns = quantityControl.querySelectorAll(".quantity-btn");
        Array.prototype.forEach.call(quantBtns, (child) => {
            child.style.display = "block";
        });
    }

    actionButtons.innerHTML = `
        <button data-tooltip="Позначити як куплене" class="action-btn purchase-btn">Куплено</button>
        <button data-tooltip="Видалити товар" class="remove-btn">⨉</button>
    `;

    const purchaseBtn = productItem.querySelector('.purchase-btn');
    purchaseBtn.addEventListener('click', function () {
        const boughtList = document.querySelector(".bought-list");
        boughtList.appendChild(item);
        item.classList.add("purchased");
        markAsPurchased(productItem, item);
    });

    const removeBtn = productItem.querySelector('.remove-btn');
    removeBtn.addEventListener('click', function () {
        item.remove();
        productItem.remove();
    });
}

initAddProductItem("Помідори");
initAddProductItem("Печиво");
initAddProductItem("Сир");
