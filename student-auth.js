/**
 * UniDocs Student Authentication
 * Handles: Registration, Login, and Session Management
 */

// DOM Elements
const requestForm = document.getElementById('requestForm');

// Mock Database (Replace with API calls in production)
const studentDB = JSON.parse(localStorage.getItem('studentDB')) || [];

// Form Submission: Handles Login
requestForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Retrieve user input
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Look for user in the mock database (studentDB)
    const user = studentDB.find(user => user.email === email);

    // Validate email existence
    if (!user) {
        alert('No account found with this email. Please register first.');
        return;
    }

    // Verify password (in production, replace with hashed password comparison)
    if (user.password !== password) {
        alert('Incorrect password. Please try again.');
        return;
    }

    // Create session for the authenticated user
    localStorage.setItem('currentStudent', JSON.stringify({
        id: user.id,
        name: user.fullName
    }));

    // Notify the user and redirect to the dashboard
    alert('Login successful!');
    window.location.href = 'dashboard.html'; // Redirect to the dashboard page
});

// Session Management: Check if a user is logged in
function checkStudentAuth() {
    const currentStudent = localStorage.getItem('currentStudent');
    if (!currentStudent && location.pathname.includes('/student/')) {
        window.location.href = 'login.html'; // Redirect to login if not authenticated
    }
}

// Run on page load
checkStudentAuth();
