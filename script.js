// Form handling
const form = document.getElementById('optInForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = form.querySelector('.submit-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim()
    };

    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone) {
        alert('Please fill in all fields');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.querySelector('.btn-text').textContent = 'Submitting...';

    try {
        // Here you would typically send the data to your backend
        // For now, we'll simulate an API call
        await simulateSubmission(formData);

        // Hide form and show success message
        form.style.display = 'none';
        successMessage.classList.remove('hidden');

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
        // Handle error
        alert('Something went wrong. Please try again.');
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.querySelector('.btn-text').textContent = 'Join Waitlist';
    }
});

// Simulate API submission (replace with actual API call)
function simulateSubmission(data) {
    return new Promise((resolve) => {
        // Log the data (in production, send to your backend)
        console.log('Form submission:', data);
        
        // Simulate network delay
        setTimeout(() => {
            resolve(data);
        }, 1000);
    });
}

// Format phone number as user types (optional enhancement)
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    e.target.value = value;
});

