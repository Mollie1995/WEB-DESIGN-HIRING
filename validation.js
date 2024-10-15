// Show loader on page load
document.addEventListener("DOMContentLoaded", function() {
    const loader = document.querySelector(".loader");
    loader.style.display = "block";
    });
    
    // Hide loader after 3 seconds
    setTimeout(function() {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
    }, 3000);



    // Show/hide text input based on selected option
const genderSelect = document.getElementById('gender');
const genderText = document.getElementById('gender-text');

genderSelect.addEventListener('change', () => {
if (genderSelect.value === 'Other') {
genderText.style.display = '';
} else {
genderText.style.display = 'none';
}
});


//Registration validate
const registrationForm = document.getElementById('registration-form');

registrationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const gender = document.getElementById('gender').value;
  const country = document.getElementById('country').value;
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirm-password').value.trim();
  const terms = document.getElementById('terms').checked;

  // First Name validation
  if (firstName === '') {
    alert('First name cannot be empty');
    return;
  }

  // Last Name validation
  if (lastName === '') {
    alert('Last name cannot be empty');
    return;
  }

  // Gender validation
  if (gender === '') {
    alert('Please select a gender');
    return;
  }

  // Country validation
  if (country === '') {
    alert('Please select a country');
    return;
  }

  // Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert('Invalid email format');
    return;
  }

  // Password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert('Password must be at least 8 characters, contain uppercase, lowercase, numbers, and special characters');
    return;
  }

  // Confirm Password validation
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // Terms and Conditions validation
  if (!terms) {
    alert('Please agree to the terms and conditions');
    return;
  }

  // Submit form
  registrationForm.submit();
});

//Login validate
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

function validateLogin() {
  if (usernameInput.value.trim() === '') {
    alert('Username cannot be empty');
    return false;
  }
  
  if (passwordInput.value.trim() === '') {
    alert('Password cannot be empty');
    return false;
  }
  
  // Additional validations...
  
  return true;
}

//Cookies and session SQL
// Server side
const express = require('express');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Session configuration
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Cookie parser
app.use(cookieParser());

// Registration route
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    res.status(400).send('Invalid input');
    return;
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Insert user into database
  db.query('INSERT INTO users SET ?', { username, email, password: hashedPassword }, (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).send('Error registering user');
      return;
    }

    // Create session
    req.session.username = username;
    req.session.email = email;

    // Set cookie
    res.cookie('session_id', req.sessionID, { maxAge: 900000 });

    res.send('User registered successfully');
  });
});

//Client-side (JavaScript)


const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Validate input
  if (!username || !email || !password) {
    alert('Invalid input');
    return;
  }

 
     

// Verify credentials
db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
    console.error(err);
    res.status(500).send({ message: 'Error logging in' });
    } else if (results.length > 0) {
    req.session.username = username;
    res.send({ message: 'Logged in successfully' });
    } else {
    res.status(401).send({ message: 'Invalid credentials' });
    }
    });
    });
    