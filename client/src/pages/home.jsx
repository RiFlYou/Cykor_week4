import { useNavigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react'; 
import axios from 'axios';

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      setUser(null);
      return;
    }
    console.log('[Home] token:', token);

    axios.get('http://localhost:5000/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log('[Home] 유저 정보:', res.data);
      setUser(res.data);
    })
    .catch(err => {
      console.error('[Home] 인증 실패:', err);
      localStorage.removeItem('token');
      setUser(null); 
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>홈페이지</h1>

      {user ? (
        <div>
          <p>환영합니다, {user.username}님!</p>
          <button onClick={handleLogout}>로그아웃</button>
          <button onClick={() => navigate('/write')}> 글쓰기</button>
        </div>
      ) : (
        <div>
          <p>방문자님, 로그인해서 더 많은 기능을 이용해보세요!</p>
          <button onClick={() => navigate('/login')}>로그인</button>
        </div>
      )}
    </div>
  );
}

export default Home;
