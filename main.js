/**
 * NexStore - Main Application Logic
 * Shared across all dashboard screens
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Global Sidebar Toggle (for Mobile)
    const sidebar = document.getElementById('sidebar');
    window.toggleSidebar = () => {
        if (sidebar) {
            sidebar.classList.toggle('sidebar-closed');
            sidebar.classList.toggle('-translate-x-full'); // Tailwind utility for sliding
        }
    };

    // 3. POS Cart System (Only runs on sales.html)
    let cart = [];
    
    window.addToCart = (name, price) => {
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        renderCart();
    };

    function renderCart() {
        const cartContainer = document.getElementById('cart-items');
        if (!cartContainer) return;

        cartContainer.innerHTML = cart.map((item, index) => `
            <div class="flex items-center gap-4 animate-in slide-in-from-right-2 duration-200">
                <div class="flex-1">
                    <h4 class="font-bold text-sm">${item.name}</h4>
                    <p class="text-xs text-slate-500">Rs ${item.price} x ${item.quantity}</p>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="updateQty(${index}, -1)" class="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200">-</button>
                    <span class="font-bold text-sm">${item.quantity}</span>
                    <button onclick="updateQty(${index}, 1)" class="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200">+</button>
                </div>
                <span class="font-black text-sm text-slate-800 w-20 text-right">Rs ${item.price * item.quantity}</span>
            </div>
        `).join('');

        updateTotals();
        lucide.createIcons(); // Re-render icons if any in cart
    }

    window.updateQty = (index, change) => {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        renderCart();
    };

    function updateTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalElement = document.getElementById('total-payable'); // Ensure this ID exists in your HTML
        const subtotalElement = document.getElementById('subtotal');
        
        if (totalElement) totalElement.innerText = `Rs ${subtotal}`;
        if (subtotalElement) subtotalElement.innerText = `Rs ${subtotal}`;
    }

    // 4. Universal Table Search
    // Usage: Add id="searchBar" to any input and id="dataTable" to the table
    const searchBar = document.getElementById('searchBar');
    const dataTable = document.getElementById('dataTable');

    if (searchBar && dataTable) {
        searchBar.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            const rows = dataTable.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(term) ? '' : 'none';
            });
        });
    }

    // 5. Modal Management
    window.toggleModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.toggle('hidden');
            modal.classList.toggle('flex');
        }
    };
});