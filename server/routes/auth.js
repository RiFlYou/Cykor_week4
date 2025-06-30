router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // 유효성 검사 3~12자 영어, 숫자, _만 가능
  const usernameRegex = /^[a-zA-Z0-9_]{3,12}$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      message: '아이디는 3~12자의 영문자, 숫자, 밑줄(_)만 사용 가능합니다.'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: '비밀번호는 최소 6자 이상이어야 합니다.'
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashed });
    await newUser.save();
    res.status(201).json({ message: '회원가입 성공' });
  } catch (err) {
    res.status(500).json({ message: '에러 발생', error: err });
  }
});
