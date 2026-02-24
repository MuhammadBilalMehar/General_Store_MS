/**
 * NexStore Admin Terminal - Central Logic
 */

// 1. Initialize Global Components on Page Load
document.addEventListener('DOMContentLoaded', () => {
    loadSidebar();
    if (document.getElementById('live-clock')) {
        updateClock();
        setInterval(updateClock, 1000);
    }
});

// 2. Sidebar Injection Logic
function loadSidebar() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            container.innerHTML = data;
            // Initialize Lucide icons after sidebar is injected
            lucide.createIcons();
            setActiveNavLink();
        })
        .catch(err => console.error('Error loading sidebar:', err));
}

// 3. Highlight Active Sidebar Link
function setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('#sidebar nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('bg-indigo-600/10', 'text-indigo-400', 'border', 'border-indigo-600/20');
        }
    });
}

// 4. Modal & Drawer Toggles
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Support both 'hidden' class and 'modal-active' (used in your products/suppliers)
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
        } else if (modal.classList.contains('hidden-modal')) {
             modal.classList.remove('hidden-modal');
        } else {
            modal.classList.toggle('modal-active');
            modal.classList.toggle('hidden');
        }
    }
}

// Specifically for Customer Modal (matches your previous custom code)
function openCustomerModal() {
    const modal = document.getElementById('customerModal');
    if (modal) {
        modal.classList.remove('hidden-modal');
        document.body.style.overflow = 'hidden';
    }
}

function closeCustomerModal() {
    const modal = document.getElementById('customerModal');
    if (modal) {
        modal.classList.add('hidden-modal');
        document.body.style.overflow = 'auto';
    }
}

// 5. Shared Utilities (Clock & Formatting)
function updateClock() {
    const clockElement = document.getElementById('live-clock');
    if (!clockElement) return;
    const now = new Date();
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    clockElement.innerText = now.toLocaleString('en-GB', options).replace(',', ' |');
}

// 6. Global Event Listeners (Close modals on outside click)
window.onclick = function(event) {
    const customerModal = document.getElementById('customerModal');
    const supplierModal = document.getElementById('supplierModal');
    if (event.target == customerModal) closeCustomerModal();
    if (event.target == supplierModal) toggleModal('supplierModal');
}