import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// 복붙
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function List() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // 로그인 정보 가져오기
  const username = localStorage.getItem('username');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => {
        setPosts(res.data.posts);
      })
      .catch(err => {
        console.error('게시글 불러오기 실패:', err);
      });
  }, []);

  return (
    <div>
      <h2> 게시글 목록</h2>

      <button onClick={() => navigate('/')}>홈으로</button>
      {posts.length === 0 ? (
        <p>아직 작성된 글이 없습니다.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              {/* 제목 escape 처리 */}
              <Link to={`/post/${post._id}`}>
                <strong dangerouslySetInnerHTML={{ __html: escapeHtml(post.title) }} />
              </Link>

              - {escapeHtml(post.author)} / {new Date(post.createdAt).toLocaleString()}

              {/* 받아온 정보 작성자 or 관리자일 때만 수정 버튼 보이게 */}
              {(post.author === username || isAdmin) && (
                <button onClick={() => navigate(`/edit/${post._id}`)} style={{ marginLeft: '10px' }}>
                  수정
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default List;
