const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
    
router.post('/register', async (req, res) => {

    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
    }

    try {
        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashed });
        await newUser.save();
        res.status(201).json({ message: '회원가입 성공' });
    } 
    catch (err) {
        res.status(500).json({ message: '에러 발생', error: err });
    }
});
    
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ success: false, message: '유저 없음' });
            const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: '비밀번호 틀림' });
            const token = jwt.sign(
                { id: user._id, username: user.username }, process.env.JWT_SECRET, 
                { expiresIn: '1h' }
            );
            res.json({ success: true, message: '로그인 성공', token});
    } 
    catch (err) {
        res.status(500).json({ success: false, error: err });
    }
});

router.get('/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;