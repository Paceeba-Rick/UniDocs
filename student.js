// Dynamic School Fields

document.getElementById('educationLevel').addEventListener('change', function() {
    const level = this.value;
    const fields = document.getElementById('schoolFields');
    
    let html = '';
    if (level === 'junior' || level === 'senior') {
        html = `
            <div class="form-group">
                <label>School Name</label>
                <input type="text" required>
            </div>
            <div class="form-group">
                <label>Principal's Name</label>
               
                
            </div>`;
    } else if (level === 'university') {
        html = `
            <div class="form-group">
                <label>Institution Name</label>
                  <input type="text" id="institutionName" required>
            </div>
            <div class="form-group">
                <label>Student ID</label>
                <input type="text" id="IDNumber" required
                placeholder="e.g., UNILAG/2020/12345">
            </div>`;
    }
    
    fields.innerHTML = html;
});

// Form Submission
document.getElementById('requestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Request submitted! Our team will contact you within 24 hours.');
    // In production: Save to localStorage/API
});