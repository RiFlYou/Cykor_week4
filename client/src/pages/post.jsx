import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// 복붙
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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
        {/*  제목, 작성자, 내용에 escape 적용 */}
        <h2 dangerouslySetInnerHTML={{ __html: escapeHtml(post.title) }} />
        <p><b>작성자:</b> {escapeHtml(post.author)}</p>
        <p><b>작성일:</b> {new Date(post.createdAt).toLocaleString()}</p>
        <p dangerouslySetInnerHTML={{ __html: escapeHtml(post.content) }} />

        <button onClick={() => navigate('/list')}>← 목록으로</button>

        {(post.author === localStorage.getItem('username') || localStorage.getItem('isAdmin') === 'true') && (
          <>
            <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
              삭제
            </button>
            <button onClick={() => navigate(`/edit/${post._id}`)} style={{ marginLeft: '10px' }}>
              수정
            </button>
          </>
        )}
    </div>
  );
}

export default Post;
