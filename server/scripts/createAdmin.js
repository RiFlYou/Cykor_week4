const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('MongoDB 연결됨');

  const username = 'admin';
  const password = 'cykor';

  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await User.findOne({ username });
  if (existing) {
    console.log('이미 관리자자 계정이 존재합니다.');
    process.exit();
  }

  const adminUser = new User({
    username,
    password: hashedPassword,
    isAdmin: true
  });

  await adminUser.save();
  console.log('관리자 계정 생성 완료!');
  console.log(`ID: ${username},  PW: ${password}`);
  process.exit();
}).catch(err => {
  console.error('MongoDB 연결 실패:', err);
});
