const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./middleware');

const baseURL = process.env.BASE_URL || 'http://localhost:8082';
// const response = await axios.post(`${baseURL}/login`, loginData);

const app = express();
let userVer;
connectDB();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/profile', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    phoneNumber: String,
    address: String,
    pincode: String,
    password: String,
    role: String
});

const bookSchema = new mongoose.Schema({
    email: String,
    bookName: String,
    authorName: String,
    description: String,
    price: String,
    origin: String,
    address: String,
    pincode: String,
    time: String
});
// imageData: Buffer
const User = mongoose.model('User', userSchema);
const Books = mongoose.model('Books', bookSchema);

app.post('/register', (req, res) => {
    const userData = req.body;

    const newUser = new User(userData);

    newUser.save()
        .then(user => {
            console.log('User registered:', user);
            res.redirect('/home');
        })
        .catch(err => {
            console.error('Error registering user:', err);
            res.status(500).json({ error: 'Error registering user' });
        });
    res.json({ message: 'User registered successfully' });
});

app.get('/user/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ username: user.username }); // Return JSON data
    } catch (error) {
        console.error('Error retrieving user:', error);
    }
});
app.get('/api/fetchDocuments', async (req, res) => {
    const userEmail = req.query.email; // Get the email from the query parameter

    try {
        const userDocuments = await Books.find({ email: userEmail });

        res.json({ documents: userDocuments });
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Error fetching documents' });
    }
});

// const secretKey = 'mYs3cR3tK3y!$2023';
const secretKey = process.env.SECRET_KEY || 'mYs3cR3tK3y!$2023';

app.post(`${baseURL}/login`, async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            // return res.status(401).json({ error: 'Invalid email or password' });
            return res.status(401).json({ 'just for checking': baseURL });
        }

        const token = jwt.sign({ email: user.email }, secretKey);
        res.json({
            message: 'Login successful', token,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            pincode: user.pincode,
            role: user.role
        });

    } catch (error) {
        // console.error('Error logging in:', error);
        // res.status(500).json({ error: 'Error logging in' });
        return res.status(401).json({ baseURL:'just for checking':  });
    }
});

app.post('/upload', (req, res) => {
    const userData = req.body;

    const newBook = new Books(userData);

    newBook.save()
        .then(book => {
            console.log('Book Added:', book);
        })
        .catch(err => {
            console.error('Error adding book:', err);
            res.status(500).json({ error: 'Error adding book.' });
        });
    res.json({ message: 'Book added successfully' });
});

// Add this route after your other routes
app.delete('/api/deleteDocument', async (req, res) => {
    const { email, bookName } = req.query;
    console.log('DELETE request received with email:', email, 'and bookName:', bookName);

    try {
        const result = await Books.deleteOne({ email, bookName });
        console.log('Delete result:', result);
        if (result.deletedCount === 1) {
            res.json({ message: 'Document deleted successfully' });
        } else {
            res.status(404).json({ error: 'Document not found' });
        }
    } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ error: 'Error deleting document' });
    }
});

app.get('/api/fetchDocument', async (req, res) => {
    const { email, bookName } = req.query;

    try {
        const document = await Books.findOne({ email, bookName });
        if (document) {
            res.json({ document });
        } else {
            res.status(404).json({ error: 'Document not found' });
        }
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({ error: 'Error fetching document' });
    }
});

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));