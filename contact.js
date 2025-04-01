document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const contactData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        type: document.getElementById('contactType').value,
        message: document.getElementById('contactMessage').value,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage (replace with API call in production)
    const contacts = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
    contacts.push(contactData);
    localStorage.setItem('contactSubmissions', JSON.stringify(contacts));
    
    // Show confirmation
    alert('Thank you! Your message has been sent. We\'ll respond within 24 hours.');
    this.reset();
    
    // Optional: Send to backend
    // fetch('/api/contact', {
    //   method: 'POST',
    //   body: JSON.stringify(contactData)
    // });
});