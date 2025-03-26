document.addEventListener('DOMContentLoaded', function() {
    // File upload display
    const setupFileUpload = (inputId, displayId) => {
        const fileInput = document.getElementById(inputId);
        const fileNameDisplay = document.getElementById(displayId);
        
        if (fileInput && fileNameDisplay) {
            fileInput.addEventListener('change', function() {
                if (this.files && this.files.length > 0) {
                    fileNameDisplay.textContent = this.files[0].name;
                } else {
                    fileNameDisplay.textContent = 'No file chosen';
                }
            });
        }
    };
    
    setupFileUpload('studentIdUpload', 'fileName');
    setupFileUpload('verificationFile', 'verificationFileName');
    
    // Show/hide other document field
    const documentType = document.getElementById('documentType');
    const otherDocumentGroup = document.getElementById('otherDocumentGroup');
    
    if (documentType && otherDocumentGroup) {
        documentType.addEventListener('change', function() {
            otherDocumentGroup.style.display = this.value === 'other' ? 'block' : 'none';
        });
    }
    
    // Show/hide physical delivery fields
    const deliveryMethod = document.getElementById('deliveryMethod');
    const physicalDeliveryGroup = document.getElementById('physicalDeliveryGroup');
    
    if (deliveryMethod && physicalDeliveryGroup) {
        deliveryMethod.addEventListener('change', function() {
            physicalDeliveryGroup.style.display = this.value === 'physical' ? 'block' : 'none';
            updateShippingFee();
        });
    }
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Shipping fee calculation
    function updateShippingFee() {
        const shippingFeeElement = document.getElementById('shippingFee');
        const totalAmountElement = document.getElementById('totalAmount');
        const deliveryMethod = document.getElementById('deliveryMethod').value;
        
        let shippingFee = 0;
        if (deliveryMethod === 'physical') {
            const country = document.getElementById('country').value;
            shippingFee = country === 'VN' ? 2.00 : 5.00;
        }
        
        const documentFee = 10.00;
        const total = documentFee + shippingFee;
        
        if (shippingFeeElement) shippingFeeElement.textContent = `$${shippingFee.toFixed(2)}`;
        if (totalAmountElement) totalAmountElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Country change affects shipping fee
    const countrySelect = document.getElementById('country');
    if (countrySelect) {
        countrySelect.addEventListener('change', updateShippingFee);
    }
    
    // MoMo payment modal
    const momoPaymentBtn = document.getElementById('momoPaymentBtn');
    const modal = document.getElementById('paymentModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (momoPaymentBtn && modal) {
        momoPaymentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    }
    
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Check required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--danger-color)';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            // Check password match for registration
            if (form.id === 'registerForm') {
                const password = document.getElementById('password');
                const confirmPassword = document.getElementById('confirmPassword');
                
                if (password.value !== confirmPassword.value){
                    isValid = false;
                    password.style.borderColor = 'var(--danger-color)';
                    confirmPassword.style.borderColor = 'var(--danger-color)';
                    alert('Passwords do not match!');
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields correctly.');
            } else {
                // Simulate form submission
                if (form.id === 'loginForm') {
                    e.preventDefault();
                    alert('Login successful! Redirecting to dashboard...');
                    window.location.href = 'dashboard.html';
                } else if (form.id === 'registerForm') {
                    e.preventDefault();
                    alert('Registration successful! Redirecting to login...');
                    window.location.href = 'login.html';
                } else if (form.id === 'documentRequestForm') {
                    e.preventDefault();
                    const selectedMethod = document.querySelector('.payment-method.selected');
                    
                    if (!selectedMethod) {
                        alert('Please select a payment method.');
                        return;
                    }
                    
                    if (selectedMethod.id === 'momoMethod') {
                        // Show MoMo payment modal
                        modal.style.display = 'flex';
                    } else {
                        // Simulate other payment processing
                        alert('Payment processed successfully! Your document request has been submitted.');
                        window.location.href = 'dashboard.html';
                    }
                }
            }
        });
    });
    
    // Complete MoMo payment
    const completePaymentBtn = document.getElementById('completePaymentBtn');
    if (completePaymentBtn) {
        completePaymentBtn.addEventListener('click', function() {
            alert('MoMo payment successful! Your document request has been submitted.');
            modal.style.display = 'none';
            window.location.href = 'dashboard.html';
        });
    }
    
    // Initialize shipping fee
    updateShippingFee();
});
// Profile Photo Upload
const changePhotoBtn = document.getElementById('changePhotoBtn');
const photoModal = document.getElementById('photoModal');
const photoUpload = document.getElementById('photoUpload');
const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');

if (changePhotoBtn && photoModal) {
    changePhotoBtn.addEventListener('click', () => {
        photoModal.style.display = 'flex';
    });
}

if (photoUpload) {
    photoUpload.addEventListener('change', () => {
        if (photoUpload.files.length > 0) {
            document.getElementById('photoFileName').textContent = photoUpload.files[0].name;
            uploadPhotoBtn.disabled = false;
        }
    });
}

// Logout Confirmation
const confirmLogout = document.getElementById('confirmLogout');
if (confirmLogout) {
    confirmLogout.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real app, you would call logout API here
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
    });
}