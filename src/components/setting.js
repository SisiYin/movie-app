// src/components/Setting.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Setting = () => {
  const navigate = useNavigate();

  // 退出账户
  const handleLogout = () => {
    // 清除本地存储中的 JWT token
    localStorage.removeItem('token');
    navigate('/login'); // 跳转到登录页面
  };

  // 注销账户
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User is not logged in');
      return;
    }

    try {
      // 发送删除账户请求到后端
      await axios.delete('http://localhost:3001/user/account/delete', {
        headers: { Authorization: user.token },
      });

      // 清除 token 并跳转到登录页面
      localStorage.removeItem('token');
      alert('Account deleted successfully');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Failed to delete account');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Account Settings</h2>
      <button onClick={handleLogout} style={buttonStyle}>
        Logout
      </button>
      <button onClick={handleDeleteAccount} style={{ ...buttonStyle, backgroundColor: 'red', color: 'white' }}>
        Delete Account
      </button>
    </div>
  );
};

// 按钮样式
const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default Setting;
