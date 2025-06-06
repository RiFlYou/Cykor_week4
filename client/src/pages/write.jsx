import { useState } from 'react';
import axios from 'axios';

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('http://localhost:5000/api/posts', {
        title, content
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('글이 등록되었습니다!');
      setTitle('');
      setContent('');
    } catch (err) {
      alert('글 등록 실패');
    }
  };

  return (
    <div>
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default Write;
