const LoginForm = ({
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>

      <div>
        password
        <input type="text" value={password} onChange={handlePasswordChange} />
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
