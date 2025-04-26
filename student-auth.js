
        /**
         * UniDocs Student Authentication
         * Handles: Registration, Login, Session Management
         */
    
        // DOM Elements
        const requestForm = document.getElementById('requestForm');
        
        // Mock Database (Replace with API calls in production)
        const studentDB = JSON.parse(localStorage.getItem('studentDB')) || [];
    
        // Camera elements
        const startCameraBtn = document.getElementById('startCameraBtn');
        const cameraContainer = document.getElementById('cameraContainer');
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const captureBtn = document.getElementById('captureBtn');
        const retakeBtn = document.getElementById('retakeBtn');
        const selfiePreview = document.getElementById('selfiePreview');
        let stream = null;
    
        // Start camera when button is clicked
        startCameraBtn.addEventListener('click', async function() {
            try {
                // Request camera access
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'user', // Front camera
                        width: { ideal: 640 },
                        height: { ideal: 480 }
                    },
                    audio: false
                });
                
                // Show camera interface
                video.srcObject = stream;
                startCameraBtn.style.display = 'none';
                cameraContainer.style.display = 'flex';
            } catch (err) {
                console.error("Camera error: ", err);
                alert("Could not access the camera. Please make sure you've granted camera permissions.");
            }
        });
    
        // Capture photo
        captureBtn.addEventListener('click', function() {
            // Set canvas dimensions to match video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            // Draw video frame to canvas
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Stop camera stream
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            
            // Hide camera interface and show preview
            cameraContainer.style.display = 'none';
            startCameraBtn.style.display = 'block';
            
            // Set the preview image
            selfiePreview.src = canvas.toDataURL('image/jpeg');
            selfiePreview.style.display = 'block';
        });
    
        // Retake photo
        retakeBtn.addEventListener('click', function() {
            // Clear the preview
            selfiePreview.style.display = 'none';
            selfiePreview.src = '';
            
            // Show camera interface again
            cameraContainer.style.display = 'flex';
            
            // Restart the camera
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            
            navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                },
                audio: false
            }).then(newStream => {
                stream = newStream;
                video.srcObject = stream;
            });
        });
    
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
    
        // Document Type Selection
        document.getElementById('documentType').addEventListener('change', function() {
            const otherInput = document.getElementById('otherDocument');
            if (this.value === '') {
                otherInput.style.display = 'block';
                otherInput.required = true;
            } else {
                otherInput.style.display = 'none';
                otherInput.required = false;
            }
        });
    
        // Copy Type Selection
        document.querySelectorAll('input[name="copyType"]').forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'soft') {
                    document.getElementById('softCopyFields').style.display = 'block';
                    document.getElementById('hardCopyFields').classList.add('hidden');
                    document.getElementById('whatsappNumber').required = true;
                    document.getElementById('deliveryAddress').required = false;
                    document.getElementById('deliveryPhone').required = false;
                } else {
                    document.getElementById('softCopyFields').style.display = 'none';
                    document.getElementById('hardCopyFields').classList.remove('hidden');
                    document.getElementById('whatsappNumber').required = false;
                    document.getElementById('deliveryAddress').required = true;
                    document.getElementById('deliveryPhone').required = true;
                }
            });
        });
    
        // ID Upload
        document.getElementById('idUploadArea').addEventListener('click', function() {
            document.getElementById('idUpload').click();
        });
        
        document.getElementById('idUpload').addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const preview = document.getElementById('idPreview');
                    preview.src = event.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    
        // Payment Method Selection
        document.querySelectorAll('.payment-option').forEach(option => {
            option.addEventListener('click', function() {
                // Update radio button selection
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
                
                // Update UI
                document.querySelectorAll('.payment-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                
                // Show corresponding payment details
                const method = this.dataset.method;
                document.querySelectorAll('.payment-details').forEach(detail => {
                    detail.classList.remove('active');
                });
                document.getElementById(`${method}Details`).classList.add('active');
                
                // Update required fields
                if (method === 'momo') {
                    document.getElementById('momoNumber').required = true;
                    document.getElementById('momoName').required = true;
                    document.getElementById('bankName').required = false;
                    document.getElementById('accountNumber').required = false;
                    document.getElementById('accountName').required = false;
                } else {
                    document.getElementById('momoNumber').required = false;
                    document.getElementById('momoName').required = false;
                    document.getElementById('bankName').required = true;
                    document.getElementById('accountNumber').required = true;
                    document.getElementById('accountName').required = true;
                }
            });
        });
    
        // Form Submission
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
            
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
                documentType: document.getElementById('documentType').value,
                copyType: document.querySelector('input[name="copyType"]:checked').value,
                deliveryInfo: {
                    whatsappNumber: document.getElementById('whatsappNumber')?.value,
                    address: document.getElementById('deliveryAddress')?.value,
                    landmark: document.getElementById('landmark')?.value,
                    phone: document.getElementById('deliveryPhone')?.value
                },
                verification: {
                    idCard: document.getElementById('idPreview').src || null,
                    selfie: selfiePreview.src || null
                },
                payment: {
                    method: paymentMethod,
                    details: paymentMethod === 'momo' ? {
                        momoNumber: document.getElementById('momoNumber').value,
                        momoName: document.getElementById('momoName').value
                    } : {
                        bankName: document.getElementById('bankName').value,
                        accountNumber: document.getElementById('accountNumber').value,
                        accountName: document.getElementById('accountName').value,
                        branch: document.getElementById('branch').value
                    }
                },
                createdAt: new Date().toISOString()
            };
    
            // Validate required fields
            if (!studentData.educationLevel) {
                alert('Please select your education level');
                return;
            }
    
            if (!studentData.verification.idCard) {
                alert('Please upload your ID card for verification');
                return;
            }
    
            if (!studentData.verification.selfie) {
                alert('Please take a selfie for verification');
                return;
            }
    
            // Validate payment details
            if (paymentMethod === 'momo') {
                if (!studentData.payment.details.momoNumber || !studentData.payment.details.momoName) {
                    alert('Please provide your MTN Mobile Money details');
                    return;
                }
            } else {
                if (!studentData.payment.details.bankName || !studentData.payment.details.accountNumber || !studentData.payment.details.accountName) {
                    alert('Please provide your bank account details');
                    return;
                }
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
    
            alert('Registration and request submitted successfully!');
            // In production: Redirect to dashboard or confirmation page
            // window.location.href = 'dashboard.html';
        });
    
        // Session Management
        function checkStudentAuth() {
            const currentStudent = localStorage.getItem('currentStudent');
            if (!currentStudent && location.pathname.includes('/student/')) {
                window.location.href = 'login.html';
            }
        }
    
        // Run on page load
        checkStudentAuth();
