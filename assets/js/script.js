import Form from './form.js';
import formElements from './config.js';

// Register form initialization
document.addEventListener('DOMContentLoaded', () => {
    const formEl = document.querySelector('#form');
    const formContentEl = document.querySelector('#form-content');
    const registerButton = document.querySelector('#registerBtn');

    if (registerButton) {
        registerButton.addEventListener('click', (e) => {
            e.preventDefault();
            new Form({
                formEl,
                formContentEl,
                elements: formElements
            });
        });
    }

    // Login form validation and handling
    if (formEl && formEl.querySelector('button[type="submit"]')) {
        formEl.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameInput = document.querySelector('input[name="username"]');
            const passwordInput = document.querySelector('input[name="password"]');
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            // Fetch user data from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.username === username && user.password === password);

            // Validate user credentials
            if (user) {
                // Successful login
                window.location.href = './assets/html/home.html'; // Başarıyla giriş yaptıktan sonra yönlendir
            } else {
                // Show error message
                if (!username) {
                    showError(usernameInput, 'İstifadəçi adı boş ola bilməz!');
                }
                if (!password) {
                    showError(passwordInput, 'Şifrə boş ola bilməz!');
                } else {
                    showError(passwordInput, 'İstifadəçi adı və ya şifrə düzgün deyil');
                }
            }
        });

        function showError(element, message) {
            element.classList.add('border-red-500');
            let errorElement = element.nextElementSibling;
            if (errorElement && errorElement.classList.contains('text-red-500')) {
                errorElement.textContent = message;
            } else {
                element.insertAdjacentHTML('afterend', `<p class="text-red-500 text-sm mt-[2px]">${message}</p>`);
            }
        }
    }

    // Only for Register Page - Adds `data-register` attribute to the form
    if (window.location.pathname.includes('register.html')) {
        const form = document.querySelector('#form');
        if (form) {
            form.setAttribute('data-register', '');
        }
    }
});
