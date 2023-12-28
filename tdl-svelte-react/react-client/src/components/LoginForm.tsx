type Props = {
  handleLogin: (e: React.FormEvent) => Promise<void>;
  name: string;
  password: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

function LoginForm({
  handleLogin,
  name,
  password,
  setName,
  setPassword,
}: Props) {
  return (
    <form onSubmit={handleLogin}>
      <div>
        Name
        <input
          type="text"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>

      <div>
        Password:
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <div>
        <button type="submit">login</button>
      </div>
    </form>
  );
}

export default LoginForm;
