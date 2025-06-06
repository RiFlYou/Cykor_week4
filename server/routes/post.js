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
  }
  catch (err) {
    console.error('[POST /api/post] Error:', err); 
    res.status(500).json({ success: false, message: '서버 오류', error: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); 
    res.json({ posts });
  } 
  catch (err) {
    res.status(500).json({ message: '게시글 목록 불러오기 실패' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content
      },
      { new: true }
    );

    if (post.author !== req.user.username && !req.user.isAdmin) {
      return res.status(403).json({ message: '수정 권한 없음' });
    }

    res.json(post);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: '글 없음' });
    res.json(post);
  }
  catch (err) {
    res.status(500).json({ message: '서버 오류' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post.author !== req.user.username && !req.user.isAdmin) {
      return res.status(403).json({ message: '삭제 권한 없음' });
    }
    res.json({ message: '삭제 완료' });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
});

module.exports = router;
