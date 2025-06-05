import { useState } from 'react';
    
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            alert('회원가입 성공!');
        } 
        else {
            alert(data.message || '회원가입 실패');
        }
    };

    return (
        <form onSubmit={handleRegister}>
        <h2>회원가입</h2>
        <input placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">회원가입</button>
        </form>
    );
    }

export default Register;