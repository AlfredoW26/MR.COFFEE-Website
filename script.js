// Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Menu Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Modal Functions
function showDownloadModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const downloadModal = document.getElementById('downloadModal');
    const confirmationModal = document.getElementById('confirmationModal');
    
    if (event.target === downloadModal) {
        downloadModal.style.display = 'none';
    }
    if (event.target === confirmationModal) {
        confirmationModal.style.display = 'none';
    }
});

// Close modal with X button
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').style.display = 'none';
    });
});

// Order Form Functionality
const orderForm = document.getElementById('orderForm');

if (orderForm) {
    const orderItems = document.getElementById('orderItems');
    const addonsCheckboxes = document.querySelectorAll('input[name="addons"]');
    const subtotalElement = document.getElementById('subtotal');
    const addonsTotalElement = document.getElementById('addonsTotal');
    const totalPriceElement = document.getElementById('totalPrice');
    const deliveryFee = 2.50;

    // Update total price when items or addons change
    function updateTotal() {
        let subtotal = 0;
        let addonsTotal = 0;

        // Calculate subtotal from selected items
        const selectedOptions = Array.from(orderItems.selectedOptions);
        selectedOptions.forEach(option => {
            const price = parseFloat(option.value.split('-')[1]);
            subtotal += price;
        });

        // Calculate addons total
        addonsCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const price = parseFloat(checkbox.value.split('-')[1]);
                addonsTotal += price;
            }
        });

        const total = subtotal + addonsTotal + deliveryFee;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        addonsTotalElement.textContent = `$${addonsTotal.toFixed(2)}`;
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }

    // Add event listeners
    if (orderItems) {
        orderItems.addEventListener('change', updateTotal);
    }

    addonsCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotal);
    });

    // Form Validation Functions
    function validateName(name) {
        if (!name || name.trim().length < 2) {
            return "Name must be at least 2 characters long";
        }
        if (name.trim().length > 50) {
            return "Name must be less than 50 characters";
        }
        return "";
    }

    function validateEmail(email) {
        if (!email || email.trim().length === 0) {
            return "Email is required";
        }
        if (!email.includes('@') || !email.includes('.')) {
            return "Please enter a valid email address";
        }
        if (email.length > 100) {
            return "Email must be less than 100 characters";
        }
        return "";
    }

    function validateAddress(address) {
        if (!address || address.trim().length < 10) {
            return "Address must be at least 10 characters long";
        }
        if (address.trim().length > 200) {
            return "Address must be less than 200 characters";
        }
        return "";
    }

    function validateItems(items) {
        if (!items || items.length === 0) {
            return "Please select at least one item";
        }
        if (items.length > 10) {
            return "Maximum 10 items allowed per order";
        }
        return "";
    }

    function validateTime(time) {
        if (time) {
            const selectedTime = new Date(`2024-01-01 ${time}`);
            const openTime = new Date(`2024-01-01 06:00`);
            const closeTime = new Date(`2024-01-01 22:00`);
            
            if (selectedTime < openTime || selectedTime > closeTime) {
                return "Delivery time must be between 6:00 AM and 10:00 PM";
            }
        }
        return "";
    }

    // Form submission
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });

        let isValid = true;

        // Validate all fields
        const name = document.getElementById('customerName').value;
        const email = document.getElementById('customerEmail').value;
        const address = document.getElementById('customerAddress').value;
        const selectedItems = Array.from(orderItems.selectedOptions);
        const time = document.getElementById('deliveryTime').value;

        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const addressError = validateAddress(address);
        const itemsError = validateItems(selectedItems);
        const timeError = validateTime(time);

        // Display errors
        if (nameError) {
            document.getElementById('nameError').textContent = nameError;
            isValid = false;
        }

        if (emailError) {
            document.getElementById('emailError').textContent = emailError;
            isValid = false;
        }

        if (addressError) {
            document.getElementById('addressError').textContent = addressError;
            isValid = false;
        }

        if (itemsError) {
            document.getElementById('itemsError').textContent = itemsError;
            isValid = false;
        }

        if (timeError) {
            document.getElementById('timeError').textContent = timeError;
            isValid = false;
        }

        // If form is valid, show confirmation
        if (isValid) {
            const modal = document.getElementById('confirmationModal');
            if (modal) {
                modal.style.display = 'block';
            }
            
            // Reset form
            orderForm.reset();
            updateTotal();
        }
    });

    // Initialize total calculation
    updateTotal();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .reward-card, .menu-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});