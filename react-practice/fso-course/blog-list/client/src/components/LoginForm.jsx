const LoginForm = ({
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <form id="login" onSubmit={handleSubmit}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>

      <div>
        password
        <input
          id="password"
          type="text"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <button id="login-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
