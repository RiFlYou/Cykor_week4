import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => {
        alert("게시글을 불러오는 데 실패했습니다.");
        console.error(err);
      });
  }, [id]);

  if (!post) return <div>로딩 중...</div>;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("삭제 완료!");
      navigate("/list");
    } catch (err) {
      alert("삭제 실패");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p><b>작성자:</b> {post.author}</p>
      <p><b>작성일:</b> {new Date(post.createdAt).toLocaleString()}</p>
      <p>{post.content}</p>

      <button onClick={() => navigate('/list')}>← 목록으로</button>

      {post.author === localStorage.getItem('username') && (
        <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
          삭제
        </button>
      )}
    </div>
  );
}

export default Post;
