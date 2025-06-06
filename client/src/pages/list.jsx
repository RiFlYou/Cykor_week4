import { useEffect, useState } from 'react';
import axios from 'axios';

function List() {
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
      {posts.length === 0 ? (
        <p>아직 작성된 글이 없습니다.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <strong>{post.title}</strong> - {post.author} / {new Date(post.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default List;
