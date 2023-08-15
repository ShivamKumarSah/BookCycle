const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.elements["email"].value;
    const password = form.elements["password"].value;

    const loginData = {
        email: email.trim(),
        password: password.trim()
    };

    try {
        const response = await axios.post('/login', loginData);
        document.cookie = `token=${response.data.token}; Secure; HttpOnly; SameSite=Strict`;
        console.log('Login response:', response.data);

        // After successful login response
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('phoneNumber', response.data.phoneNumber);
        localStorage.setItem('address', response.data.address);
        localStorage.setItem('pincode', response.data.pincode);
        localStorage.setItem('role', response.data.role);
        window.location.href = 'myprofile.html';
    } catch (error) {
        alert('something diferent this time');
        // console.error('Error logging in', error);
        console.error('different message', response.data);
    }
});