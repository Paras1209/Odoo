import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    const user = { email, password };
    localStorage.setItem(`user_${email}`, JSON.stringify(user));
    alert("Signup successful! Please login.");
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <div className="glass">
        <h2>Sign Up</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
}
