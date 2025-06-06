const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: '토큰 없음' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('[authMiddleware] decoded:', decoded);
    next();
  } 
  catch (err) {
    return res.status(403).json({ message: '토큰이 유효하지 않음' });
  }
}

module.exports = authMiddleware;
