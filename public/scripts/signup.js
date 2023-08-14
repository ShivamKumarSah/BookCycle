const form = document.getElementById('regForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.elements["username"].value;
    const email = form.elements["email"].value;
    const phoneNumber = form.elements["phoneNumber"].value;
    const address = form.elements["address"].value;
    const pincode = form.elements["pincode"].value;
    const role = form.elements["user-seller"].value;
    const password = form.elements["password"].value;
    const cpassword = form.elements["cpassword"].value;

    if (password !== cpassword) {
        alert('Passwords do not match');
        return;
    }

    const userData = {
        username: username.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        address: address.trim(),
        pincode: pincode.trim(),
        password: password.trim(),
        role: role.trim(),
    };

    try {
        const response = await axios.post('/register', userData);
        console.log('Registration response:', response.data);
        window.location.href = 'SignIn.html';
    } catch (error) {
        console.error('Error registering user:', error);
    }
});
