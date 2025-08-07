// src/pages/OAuthCallbackPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect сработал');

    const code = new URLSearchParams(window.location.search).get('code');

    if (!code) {
      console.log('нет кода в Url');
      return;
    }

    console.log('Код из Url:', code);

    fetch('http://localhost:3000/auth/yandex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Ответ от сервера:', data);

        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log('Токен сохранен:', data.token);
        } else {
          console.log('Токен не получен:', data);
        }
        navigate('/characters');
      })
      .catch((err) => {
        console.error('Ошибка авторизации:', err);
      });
  }, );

  return <p>Авторизация...</p>;
}

export default OAuthCallbackPage;
