document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const bookName = urlParams.get('bookName');

    const userData = localStorage.getItem('email');

    if (!userData) {
        alert('You are not logged in. Redirecting to Sign-In page.');
        window.location.href = 'SignIn.html'; // Redirect to the signup page
    } else {
        console.log('User is logged in:', userData);
    }

    const book = document.getElementById('bookName');
    const writer = document.getElementById('writerName');
    const price = document.getElementById('price');
    const description = document.getElementById('description');

    const Book = document.getElementById('Book-Name');
    const AuthName = document.getElementById('Author-Name');
    const Origin = document.getElementById('Origin');
    const Address = document.getElementById('Address');
    const Pincode = document.getElementById('Pincode');
    const Posted = document.getElementById('Posted');
    const SellerEmail = document.getElementById('email');
    const SellerPhone = document.getElementById('phone');

    try {
        const response = await axios.get(`/api/fetchDocument?email=${email}&bookName=${bookName}`);
        const document = response.data.document;
        console.log('Fetched Document:', document);
        book.innerText = document.bookName;
        writer.innerText = document.authorName;
        price.innerText = "₹" + document.price;
        description.innerText = document.description;

        Book.innerText = document.bookName;
        AuthName.innerText = document.authorName;
        Origin.innerText = document.origin;
        Address.innerText = document.address;
        Pincode.innerText = document.pincode;
        SellerEmail.innerText = document.email;
        SellerPhone.innerText = localStorage.getItem('phoneNumber');

        const isoDateString = document.time;
        const isoDate = new Date(isoDateString);

        const day = String(isoDate.getUTCDate()).padStart(2, '0');
        const month = String(isoDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = isoDate.getUTCFullYear();

        const formattedDate = `${day}/${month}/${year}`;


        Posted.innerText = formattedDate;
    } catch (error) {
        console.error('Error fetching document:', error);
    }
});

document.getElementById('callbtn').addEventListener('click', function () {
    var phoneNumber = localStorage.getItem('phoneNumber');
    alert('Please dial ' + phoneNumber + ' on your phone to make the call.');
});

document.getElementById('mailbtn').addEventListener('click', function () {
    // const emailId = localStorage.getItem('email');


    // var promptMessage = 'Click "Ok" to mail the seller';
    // const link = "mailto:" + JSON.stringify(emailId);

    // console.log(link);

    // if (confirm(promptMessage)) {
    //     // alert('Please dial ' + phoneNumber + ' on your phone to make the call.');
    //     window.location.href = link;
    // }
    const emailId = localStorage.getItem('email');

    var promptMessage = 'Click "Ok" to mail the seller';
    const link = "mailto:" + emailId;

    console.log(link);

    if (confirm(promptMessage)) {
        // Open the default email client
        window.location.href = link;
    }

});

document.getElementById('signupButton').style.display = 'none';
document.getElementById('loginButton').style.display = 'none';

document.querySelector('#logOut').addEventListener('click', function (event) {
    event.preventDefault();

    // Hide the sign-up button
    document.getElementById('logOut').style.display = 'none';
    document.getElementById('loginButton').style.display = 'inline-block';
    document.getElementById('signupButton').style.display = 'inline-block';
    setTimeout(() => {
        alert("Logout Successful");
    }, 100)

    document.getElementById('logOut').querySelector('form').reset();
});

const logoutBtn = document.getElementById('logOut');
logoutBtn.addEventListener('click', () => {
    localStorage.clear(); // Remove all data from local storage
    console.log('All data removed from local storage');
});