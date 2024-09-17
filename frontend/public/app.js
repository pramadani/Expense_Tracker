const apiUrl = '/api';

document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('auth');
    const expensesSection = document.getElementById('expenses');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const registerButton = document.getElementById('registerButton');
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');

    const tokenKey = 'authToken';

    const setToken = (token) => {
        localStorage.setItem(tokenKey, token);
    };

    const getToken = () => {
        return localStorage.getItem(tokenKey);
    };

    const showSection = (section) => {
        authSection.style.display = 'none';
        expensesSection.style.display = 'none';
        document.getElementById(section).style.display = 'block';
    };

    const fetchExpenses = async () => {
        const token = getToken();
        if (token) {
            try {
                const response = await fetch(`${apiUrl}/expenses`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                expenseList.innerHTML = data.map(expense => `
                    <li>${expense.description}: $${expense.amount}</li>
                `).join('');
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        }
    };

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }
            const data = await response.json();
            setToken(data.token);
            showSection('expenses');
            fetchExpenses();
        } catch (error) {
            console.error('Error logging in:', error);
            alert(error.message); // Provide user feedback on login failure
        }
    });

    registerButton.addEventListener('click', async () => {
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        try {
            const response = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) {
                throw new Error('Registration failed. Please try again.');
            }
            alert('Registration successful. Please login.');
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        } catch (error) {
            console.error('Error registering:', error);
            alert(error.message); // Provide user feedback on registration failure
        }
    });

    expenseForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const amount = document.getElementById('amount').value;
        const description = document.getElementById('description').value;
        try {
            const response = await fetch(`${apiUrl}/expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify({ amount, description })
            });
            if (!response.ok) {
                throw new Error('Failed to add expense. Please try again.');
            }
            fetchExpenses();
        } catch (error) {
            console.error('Error adding expense:', error);
            alert(error.message); // Provide user feedback on add expense failure
        }
    });

    document.getElementById('showRegister').addEventListener('click', () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    if (getToken()) {
        showSection('expenses');
        fetchExpenses();
    } else {
        showSection('auth');
    }
});
