import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
//XSS 방어 입력갑 escape 처리하기

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('http://localhost:5000/api/posts', {
        title: escapeHtml(title),
        content: escapeHtml(content)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('글이 등록되었습니다!');
      setTitle('');
      setContent('');
      navigate("/list");
    }

    catch (err) {
      alert('글 등록 실패');
      console.error(err);
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
