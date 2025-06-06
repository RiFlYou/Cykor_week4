import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function List() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

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
              <Link to ={`/post/${post._id}`}><strong>{post.title}</strong></Link>
              - {post.author} / {new Date(post.createdAt).toLocaleString()}
              <button onClick={() => navigate(`/edit/${post._id}`)}>수정</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default List;
