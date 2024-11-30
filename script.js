const API_URL = "http://localhost:3000/auth"; // Replace with your server URL

// Elements
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const signinModal = document.getElementById('signin-modal');
const signupModal = document.getElementById('signup-modal');
const closeSignin = document.getElementById('close-signin');
const closeSignup = document.getElementById('close-signup');
const signinLink = document.getElementById('signin-link');
const signupLink = document.getElementById('signup-link');

// Toggle Active Content
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');

        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        document.getElementById(sectionId).classList.add('active');
    });
});

// Open and Close Modals
signinLink.addEventListener('click', () => signinModal.style.display = 'block');
signupLink.addEventListener('click', () => signupModal.style.display = 'block');
closeSignin.addEventListener('click', () => signinModal.style.display = 'none');
closeSignup.addEventListener('click', () => signupModal.style.display = 'none');

// Handle Sign In
document.getElementById('signin-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(`Welcome, ${data.user.fullName}!`);
            localStorage.setItem('token', data.token);
            signinModal.style.display = 'none';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
    }
});

// Handle Sign Up
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('signup-fullname').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('signup-role').value;
    const institution = document.getElementById('signup-institution').value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, phone, password, role, institution }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            signupModal.style.display = 'none';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error(error);
    }
});

// Fetch Weather API
    fetch('https://api.open-meteo.com/v1/forecast?latitude=9.082&longitude=8.6753&current_weather=true')
        .then((response) => response.json())
        .then((data) => {
            const weatherElement = document.getElementById('weather');
            const { temperature, weathercode } = data.current_weather;
            weatherElement.textContent = `Current Weather: ${temperature}°C, Code: ${weathercode}`;
        });

