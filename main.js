// JavaScript for E-commerce Website

// Toggle Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('open');
});

// Cart Icon Functionality
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.querySelector('.cart-modal');
const cartClose = document.querySelector('.cart-close');

// Toggle Cart Modal
cartIcon.addEventListener('click', () => {
    cartModal.classList.add('open');
});

cartClose.addEventListener('click', () => {
    cartModal.classList.remove('open');
});

// Add to Cart Functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total span');
let cart = [];

// Add Item to Cart
addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        const product = event.target.closest('.product-item');
        const productName = product.querySelector('h3').textContent;
        const productPrice = parseFloat(product.querySelector('.price').textContent.replace('$', ''));
        const productImage = product.querySelector('img').src;

        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        updateCart();
    });
});

// Update Cart Display
function updateCart() {
    cartItemsContainer.innerHTML = ''; // Clear cart items
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <button class="remove-item" data-name="${item.name}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Add Remove Item Event
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', event => {
            const name = event.target.getAttribute('data-name');
            cart = cart.filter(item => item.name !== name);
            updateCart();
        });
    });
}

// Smooth Scroll for Links
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }

        navMenu.classList.remove('active');
        menuToggle.classList.remove('open');
    });
});

// Scroll to Top Button
const scrollToTopButton = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Testimonial Carousel (if included)
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000); // 5 seconds interval

// Initialize
showTestimonial(0);
