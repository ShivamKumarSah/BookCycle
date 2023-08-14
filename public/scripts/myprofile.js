function newList() {
  var details = document.getElementById("articleWrapper");
  var box = document.getElementById("box");
  details.style.display = "none";
  box.style.display = "flex";
}

function MyList() {
  var details = document.getElementById("articleWrapper");
  var box = document.getElementById("box");
  details.style.display = "flex";
  box.style.display = "none";
}

document.addEventListener('DOMContentLoaded', async () => {
  const userData = localStorage.getItem('email');

  if (!userData) {
    alert('You are not logged in. Redirecting to Sign-In page.');
    window.location.href = 'SignIn.html'; // Redirect to the signup page
  } else {
    console.log('User is logged in:', userData);

    // Display user details
    displayUserDetails();

    // Display document sections
    const articleWrapper = document.getElementById('articleWrapper');
    if (articleWrapper) {
      await createDocumentSections(userData, articleWrapper);
    }
  }

  // Logout button event listener
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', () => {
    localStorage.clear(); // Remove all data from local storage
    console.log('All data removed from local storage');
    window.location.href = 'SignIn.html';
  });

  // ... Other functions and event listeners ...
});

// Function to display user details
function displayUserDetails() {
  const personName = document.getElementById('username');
  const personName2 = document.getElementById('userName');
  const mail = document.getElementById('mail');
  const city = document.getElementById('city');
  const phone = document.getElementById('phone');
  const role = document.getElementById('role');
  const pincode = document.getElementById('pincode');

  personName.innerText = localStorage.getItem('username');
  personName2.innerText = localStorage.getItem('username');
  mail.innerText = localStorage.getItem('email');
  city.innerText = localStorage.getItem('address');
  phone.innerText = localStorage.getItem('phoneNumber');
  role.innerText = localStorage.getItem('role');
  pincode.innerText = localStorage.getItem('pincode');
}

// Function to fetch documents by email (replace with your actual implementation)
async function fetchDocumentsByEmail(email) {
  try {
    const response = await axios.get(`/api/fetchDocuments?email=${email}`);
    return response.data.documents;
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}
// Function to create and populate HTML sections
async function createDocumentSections(email) {
  const documents = await fetchDocumentsByEmail(email);
  const articleWrapper = document.getElementById('articleWrapper'); // Assuming you have a container element with this ID

  documents.forEach(doc => { // Change the variable name from "document" to "doc"
    const article = document.createElement('div');
    article.classList.add('article-wrapper');

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = "https://freeiconshop.com/wp-content/uploads/edd/book-open-outline-filled.png"; // Replace with the actual image URL property in your document
    img.alt = '';
    figure.appendChild(img);

    const articleBody = document.createElement('div');
    articleBody.classList.add('article-body');

    const h2 = document.createElement('h2');
    h2.textContent = doc.bookName;

    const p = document.createElement('p');
    p.textContent = "By " + doc.authorName;

    const price = document.createElement('h3');
    price.textContent = doc.price + "/-";

    const button = document.createElement('button');
    button.classList.add('button-28');
    button.setAttribute('role', 'button');
    button.textContent = "Delete"; // Replace with the actual stock status property in your document

    articleBody.appendChild(h2);
    articleBody.appendChild(p);
    articleBody.appendChild(price);
    articleBody.appendChild(button);

    article.appendChild(figure);
    article.appendChild(articleBody);

    articleWrapper.appendChild(article);


    // getting clicked book details
    button.addEventListener('click', () => {
      const bookName = doc.bookName;
      const confirmation = confirm(`Are you sure you want to delete "${bookName}" book?`);
      if (confirmation) {
        deleteDocument(doc.email, doc.bookName);
      }
    });

    article.addEventListener('click', () => {
      const bookName = doc.bookName;
      window.location.href = `order.html?email=${email}&bookName=${bookName}`;
    });
  });
}

async function deleteDocument(email, bookName) {
  try {
    console.log('Deleting document with email:', email, 'and bookName:', bookName);
    const response = await axios.delete(`/api/deleteDocument?email=${email}&bookName=${bookName}`);
    console.log('Delete response:', response.data);
    location.reload();
  } catch (error) {
    console.error('Error deleting document:', error);
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Book Add section
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const form = document.getElementById('uploadBookForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const bookName = form.elements["bookName"].value;
  const authorName = form.elements["authorName"].value;
  const price = form.elements["price"].value;
  const origin = form.elements["origin"].value;
  const description = form.elements["description"].value;

  // const reader = new FileReader();

  // const imageData = Buffer.from(reader.result);

  // const imageInput = document.getElementById("photo");
  // const selectedImage = imageInput.files[0];

  const currentDate = new Date();

  const bookData = {
    email: localStorage.getItem('email'),
    bookName: bookName.trim(),
    authorName: authorName.trim(),
    description: description.trim(),
    price: price.trim(),
    origin: origin.trim(),
    address: localStorage.getItem('address'),
    pincode: localStorage.getItem('pincode'),
    time: currentDate,
    // imageData: imageData
  };

  try {
    const response = await axios.post('/upload', bookData);
    console.log('Addition response:', response.data);
    location.reload();
  } catch (error) {
    console.error('Error adding Book:', error);
  }
});