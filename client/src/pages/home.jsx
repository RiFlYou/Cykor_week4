function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:5000/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setUser(res.data))
    .catch(() => {
      localStorage.removeItem('token');
      navigate('/login');
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Home</h1>
      {user ? (
        <div>
          <p>환영합니다, {user.username}님!</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
}

export default Home;
