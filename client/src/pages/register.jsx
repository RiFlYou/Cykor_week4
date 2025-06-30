import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const usernameRegex = /^[a-zA-Z0-9_]{3,12}$/; //아이디 조건

  const handleRegister = async (e) => {
    e.preventDefault();

    // 아이디 유효성 검사
    if (!usernameRegex.test(username)) {
      alert('아이디는 3~12자의 영문자, 숫자, 밑줄(_)만 사용할 수 있습니다.');
      return;
    }

    if (password.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert('회원가입 성공! 한번 더 로그인해주세요!');
        navigate('/');
      } else {
        alert(data.message || '회원가입 실패');
      }
    } catch (err) {
      alert('요청 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>회원가입</h2>
      <input
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">회원가입</button>
    </form>
  );
}

export default Register;
