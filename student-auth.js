/**
 * UniDocs Student Authentication
 * Handles: Registration, Login, Session Management
 */

// DOM Elements
const registerForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');

// Mock Database (Replace with API calls in production)
const studentDB = JSON.parse(localStorage.getItem('studentDB')) || [];

// ======================
// REGISTRATION LOGIC
// ======================
if (registerForm) {
  // Education Level Selection
  document.querySelectorAll('.level-card').forEach(card => {
    card.addEventListener('click', function() {
      document.querySelectorAll('.level-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      document.getElementById('educationLevel').value = this.dataset.level;
      updateSchoolFields(this.dataset.level);
    });
  });

  // Dynamic School Fields
  function updateSchoolFields(level) {
    let html = '';
    if (level === 'junior' || level === 'senior') {
      html = `
        <div class="form-group">
          <label>School Name</label>
          <input type="text" id="schoolName" required>
        </div>
        <div class="form-group">
          <label>Graduation Year</label>
          <input type="number" id="graduationYear" min="2000" max="2030">
        </div>`;
    } else if (level === 'university') {
      html = `
        <div class="form-group">
          <label>Institution Name</label>
          <input type="text" id="institutionName" required>
        </div>
        <div class="form-group">
          <label>Student ID</label>
          <input type="text" id="IDNumber" required>
        </div>`;
    }
    document.getElementById('schoolFields').innerHTML = html;
  }
  // Form Submission
  document.getElementById('requestForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Request submitted! Our team will contact you within 24 hours.');
  // In production: Save to localStorage/API
});

  // Form Submission
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const studentData = {
      id: 'ST' + Math.floor(Math.random() * 1000000),
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      password: document.getElementById('password').value,
      educationLevel: document.getElementById('educationLevel').value,
      schoolInfo: {
        name: document.getElementById('schoolName')?.value || 
              document.getElementById('institutionName')?.value,
        IDNumber: document.getElementById('IDNumber')?.value,
        graduationYear: document.getElementById('graduationYear')?.value
      },
      createdAt: new Date().toISOString()
    };

    // Validate required fields
    if (!studentData.educationLevel) {
      alert('Please select your education level');
      return;
    }

    // Check if email/phone already exists
    if (studentDB.some(user => 
      user.email === studentData.email || 
      user.phone === studentData.phone)) {
      alert('An account with this email/phone already exists');
      return;
    }

    // Save to "database"
    studentDB.push(studentData);
    localStorage.setItem('studentDB', JSON.stringify(studentDB));
    
    // Create session
    localStorage.setItem('currentStudent', JSON.stringify({
      id: studentData.id,
      name: studentData.fullName
    }));

    alert('Registration successful!');
    window.location.href = 'request.html';
  });
}

// ======================
// LOGIN LOGIC
// ======================
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const loginId = document.getElementById('loginId').value;
    const password = document.getElementById('loginPassword').value;

    // Find student
    const student = studentDB.find(user => 
      (user.email === loginId || user.phone === loginId) && 
      user.password === password
    );

    if (student) {
      // Create session
      localStorage.setItem('currentStudent', JSON.stringify({
        id: student.id,
        name: student.fullName
      }));

      if (document.getElementById('rememberMe').checked) {
        localStorage.setItem('rememberMe', 'true');
      }

      window.location.href = 'request.html';
    } else {
      alert('Invalid login credentials');
    }
  });
}

// ======================
// SESSION MANAGEMENT
// ======================
function checkStudentAuth() {
  const currentStudent = localStorage.getItem('currentStudent');
  if (!currentStudent && location.pathname.includes('/student/')) {
    window.location.href = 'login.html';
  }
}

// Add this code in student-auth.js
const educationLevelDropdown = document.getElementById('educationLevel');

if (educationLevelDropdown) {
  educationLevelDropdown.addEventListener('change', function () {
    updateSchoolFields(this.value);
  });
}

// Run on every student page
checkStudentAuth();
