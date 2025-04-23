document.addEventListener('DOMContentLoaded', () => {
    const productListDiv = document.getElementById('productList');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const noProductsMessage = document.getElementById('noProductsMessage');
    if (productListDiv && loadingIndicator && noProductsMessage) {
        fetchProducts(productListDiv, loadingIndicator, noProductsMessage);
        productListDiv.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-product-btn')) {
                const button = event.target;
                const productId = button.dataset.productId; 
                const productName = button.dataset.productName || 'this product';

                if (productId) {
                    if (window.confirm(`Are you sure you want to remove "${productName}"?`)) {
                        button.disabled = true;
                        button.textContent = 'Removing...';
                        handleDeleteProduct(productId, button);
                    }
                }
            }
        });
    } else {
        console.error("Required HTML elements (productList, loadingIndicator, noProductsMessage) not found.");
    }
});

async function fetchProducts(productListDiv, loadingIndicator, noProductsMessage) {
    loadingIndicator.classList.remove('hidden');
    loadingIndicator.classList.add('flex');
    productListDiv.innerHTML = '';
    noProductsMessage.classList.add('hidden');

    try {
        const response = await fetch('/api/products');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }

        const products = await response.json();

        loadingIndicator.classList.add('hidden');
        loadingIndicator.classList.remove('flex');

        if (!Array.isArray(products)) {
             throw new Error("Invalid data received from server.");
        }

        if (products.length === 0) {
            noProductsMessage.classList.remove('hidden');
            productListDiv.innerHTML = '';
        } else {
            noProductsMessage.classList.add('hidden');
            renderProducts(products, productListDiv);
        }

    } catch (error) {
        console.error('Error fetching or processing products:', error);
        loadingIndicator.classList.add('hidden');
        loadingIndicator.classList.remove('flex');
        productListDiv.innerHTML = `
            <div class="col-span-full text-center text-red-600 bg-red-100 p-4 rounded-md">
                <p><strong>Error loading products.</strong></p>
                <p>${escapeHTML(error.message)}</p>
                <p>Please try refreshing the page.</p>
            </div>`;
        noProductsMessage.classList.add('hidden');
    }
}

function renderProducts(products, container) {
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.id = `product-card-${product._id}`;
        card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col';

        const formattedPrice = `₹${parseFloat(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        let typeBadgeColor = 'bg-gray-500';
        if (product.type.toLowerCase() === 'seed') {
            typeBadgeColor = 'bg-yellow-600';
        } else if (product.type.toLowerCase() === 'fertilizer') {
            typeBadgeColor = 'bg-green-600';
        } else if (product.type.toLowerCase() === 'pesticide') {
            typeBadgeColor = 'bg-red-600';
        } else if (product.type.toLowerCase() === 'equipment') {
            typeBadgeColor = 'bg-blue-600';
        }

        const removeButtonHTML = `
            <button
                class="remove-product-btn text-xs bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md transition duration-150 ease-in-out ml-2"
                data-product-id="${escapeHTML(product._id)}"
                data-product-name="${escapeHTML(product.name)}"
                title="Remove Product">
                Remove
            </button>
        `;

        card.innerHTML = `
            <img src="${escapeHTML(product.imageUrl || 'https://placehold.co/600x400/e2e8f0/a0aec0?text=No+Image')}"
                 alt="Image of ${escapeHTML(product.name)}"
                 class="w-full h-48 object-cover"
                 onerror="this.onerror=null; this.src='https://placehold.co/600x400/e2e8f0/a0aec0?text=Image+Error';">
            <div class="p-4 flex flex-col flex-grow"> <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-semibold text-gray-800 mr-2">${escapeHTML(product.name)}</h3>
                    <span class="text-xs font-medium text-white ${typeBadgeColor} px-2 py-1 rounded-full uppercase whitespace-nowrap">${escapeHTML(product.type)}</span>
                </div>
                <p class="text-sm text-gray-600 mb-3 flex-grow">${escapeHTML(product.description) || 'No description available.'}</p> <div class="mt-auto"> <p class="text-sm text-gray-500 mb-2">Supplier: <span class="font-medium text-gray-700">${escapeHTML(product.supplier)}</span></p>
                    <div class="flex justify-between items-center">
                        <p class="text-xl font-bold text-green-700">${formattedPrice}</p>
                        <div> <button class="text-sm bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded-md transition duration-150 ease-in-out" disabled>Details</button>
                            ${removeButtonHTML} </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

async function handleDeleteProduct(productId, button) {
    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData.message);
            const cardToRemove = document.getElementById(`product-card-${productId}`);
            if (cardToRemove) {
                cardToRemove.remove();
                 const productListDiv = document.getElementById('productList');
                 const noProductsMessage = document.getElementById('noProductsMessage');
                 if (productListDiv && noProductsMessage && productListDiv.children.length === 0) {
                     noProductsMessage.classList.remove('hidden');
                 }
            } else {
                console.warn(`Card with ID product-card-${productId} not found for removal.`);
            }
        } else {
            const errorData = await response.json();
            console.error(`Failed to delete product: ${response.status}`, errorData);
            alert(`Error: ${errorData.message || 'Could not remove product.'}`);
             button.disabled = false;
             button.textContent = 'Remove';
        }
    } catch (error) {
        console.error('Network or other error during deletion:', error);
        alert('An error occurred while trying to remove the product. Please check your connection and try again.');
         button.disabled = false;
         button.textContent = 'Remove';
    }
}

function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    const stringValue = String(str);
    return stringValue.replace(/&/g, '&amp;')
                      .replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;')
                      .replace(/"/g, '&quot;')
                      .replace(/'/g, '&#039;');
}