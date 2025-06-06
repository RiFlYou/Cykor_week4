const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const authMiddleware = require('../middleware/auth'); 

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user.username;

    console.log('title:', title, 'content:', content, 'author:', author);

    const newPost = new Post({ title, content, author });
    await newPost.save();

    res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    console.error('[POST /api/post] Error:', err); 
    res.status(500).json({ success: false, message: '서버 오류', error: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); 
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: '게시글 목록 불러오기 실패' });
  }
});


module.exports = router;
