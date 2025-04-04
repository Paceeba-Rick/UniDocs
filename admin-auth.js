/**
 * UniDocs Admin Authentication
 * Handles: Admin Login, Session Validation
 */

// DOM Elements


// Helper function to prevent XSS
function escapeHtml(unsafe) {
  return unsafe?.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;") || '';
}

// Example view function
function viewStudent(studentId) {
  const student = JSON.parse(localStorage.getItem('studentDB'))
    .find(s => s.id === studentId);
  console.log('Viewing student:', student);
  // Implement your view modal logic here
}

const adminLoginForm = document.getElementById('adminLoginForm');

// Admin Credentials (Replace with server auth in production)
const ADMIN_CREDENTIALS = [
  {
    id: 'admin1',
    password: 'unidocs2025',
    role: 'supervisor'
  },
  {
    id: 'retrieval_team',
    password: 'documents123',
    role: 'retriever'
  }
];

// ======================
// LOGIN LOGIC
// ======================
if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const adminId = document.getElementById('adminId').value;
    const password = document.getElementById('adminPassword').value;
    const Role = document.getElementById('roleId').value;

    const admin = ADMIN_CREDENTIALS.find(user => 
      user.id === adminId && user.password === password
    );

    if (admin) {
      // Create session
      localStorage.setItem('currentAdmin', JSON.stringify({
        id: admin.id,
        password: admin.password,
        role: admin.role,
       
      }));

      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid admin credentials');
      document.getElementById('adminPassword').value = '';
    }
  });
}



// ======================
// SESSION MANAGEMENT
// ======================
function checkAdminAuth() {
  const currentAdmin = localStorage.getItem('currentAdmin');
  const isAdminPage = location.pathname.includes('/admin/');

  if (!currentAdmin && isAdminPage) {
    window.location.href = 'login.html';
  }

  // Role-based redirection
  if (currentAdmin) {
    const adminData = JSON.parse(currentAdmin);
    if (adminData.role === 'retriever' && location.pathname.includes('/admin/reports')) {
      window.location.href = 'dashboard.html';
    }
  }
}

// Run on every admin page
checkAdminAuth();

// ======================
// LOGOUT FUNCTION
// ======================
function adminLogout() {
  localStorage.removeItem('currentAdmin');
  window.location.href = 'login.html';
}

// Attach logout to buttons
document.querySelectorAll('.admin-logout').forEach(btn => {
  btn.addEventListener('click', adminLogout);
});


