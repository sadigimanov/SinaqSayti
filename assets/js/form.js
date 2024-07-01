export default class Form {
    constructor({ formEl, formContentEl, elements }) {
        this.formEl = formEl;
        this.formContentEl = formContentEl;
        this.elements = elements;

        this.init();
    }

    init() {
        this.renderForm();
        this.addEventListeners();
    }

    renderForm() {
        this.formContentEl.innerHTML = this.elements
            .map(element => this.getElementHTML(element))
            .join('');
    }

    getElementHTML({ type, name, label, errors }) {
        return `
            <div class="relative">
                <label for="${name}" class="block text-sm font-medium text-gray-700">${label}</label>
                <input type="${type}" name="${name}" id="${name}" class="mt-1 h-[36px] block w-full border border-gray-300 rounded-[5px] shadow-sm outline-none px-[10px] sm:text-sm" />
                <div class="text-red-500 text-sm mt-1"></div>
            </div>
        `;
    }

    addEventListeners() {
        this.formEl.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        const formData = new FormData(this.formEl);
        const formObject = Object.fromEntries(formData.entries());
        const errors = this.validateForm(formObject);

        if (Object.keys(errors).length > 0) {
            this.showErrors(errors);
        } else {
            this.saveData(formObject);
            window.location.href = './index.html'; // Kayıt başarılıysa giriş sayfasına yönlendir
        }
    }

    validateForm(data) {
        let errors = {};

        this.elements.forEach(({ name, errors: errorRules }) => {
            if (errorRules.required && !data[name]) {
                errors[name] = errorRules.required;
            }
            if (errorRules.min && data[name].length < errorRules.min) {
                errors[name] = `Ən azı ${errorRules.min} simvol  lazımdır`;
            }
            if (errorRules.same && data['password'] !== data['rpassword']) {
                errors['rpassword'] = errorRules.same;
            }
            if (errorRules.email && !/\S+@\S+\.\S+/.test(data[name])) {
                errors[name] = errorRules.email;
            }
            if (name === 'username' && this.userExists(data[name])) {
                errors[name] = 'Bu istifadəçi adı mövcuddur';
            }
        });

        return errors;
    }

    userExists(username) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.some(user => user.username === username);
    }

    showErrors(errors) {
        Object.keys(errors).forEach(name => {
            const input = this.formEl.querySelector(`[name=${name}]`);
            const errorDiv = input.nextElementSibling;
            errorDiv.textContent = errors[name];
        });
    }

    saveData(data) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(data);
        localStorage.setItem('users', JSON.stringify(users));
    }
}
