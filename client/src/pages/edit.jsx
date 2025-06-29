import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// XSS 방어 : HTML 특수문자 escape 함수
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch(err => {
        alert('글 불러오기 실패');
        console.error(err);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, {
        title: escapeHtml(title),
        content: escapeHtml(content)
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("수정 완료!");
      navigate("/list");
    } 
    catch (err) {
      alert("수정 실패");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>글 수정</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}

export default Edit;
