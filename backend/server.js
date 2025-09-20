const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const UserSchema = new mongoose.Schema({
  name: String,
  dob: String,
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', UserSchema);


mongoose.connect('mongodb://localhost:27017/auth_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


app.post('/api/register', async (req, res) => {
  const { name, dob, email, password } = req.body;
  if (!name || !dob || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, dob, email, password: hash });
    const token = jwt.sign({ userId: user._id }, 'SECRET');
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ userId: user._id }, 'SECRET');
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(5000, () => console.log('Server running on port 5000'));
