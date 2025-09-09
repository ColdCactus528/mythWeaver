import './LoginPage.css';

function LoginPage() {
  const clientId = 'clientId';
  const redirectUri = 'http://localhost:5173/oauth-callback';

  const handleLogin = () => {
    const authUrl = `Здесь_должна_быть_ссылка_на_переход${clientId}${redirectUri}`;
    window.location.href = authUrl;
  };

  const handleGuest = () => {
    window.location.href = '/characters';
  };

  return (
    <div className="login-page">
      <div className="background" >
        <div className="overlay">
          <div className="login-content">
            <div className="title-block">
              <h1 className="title">MythWeaver</h1>
            </div>
              <div className="subtitle-block">
                <p className="subtitle1">Миф начинается с нити.</p>
                <p className="subtitle2">Протяни руку — и вплети свою судьбу.</p>
              </div>
            </div>
            <div className="button-group">
              <button className="rune-button" onClick={handleLogin}  disabled>
                Авторизация через Яндекс
              </button>
              <button className="rune-button ghost" onClick={handleGuest}>
                Продолжить без регистрации
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default LoginPage;
