type LoginFormProps = {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onLogin: () => void;
};

export function LoginForm({
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
}: LoginFormProps) {
  function handleForgotPassword() {
    alert(
      'Para recuperar sua senha, entre em contato com um administrador do sistema.',
    );
  }

  return (
    <>
      <input
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={onLogin}>Entrar</button>

      <button
        type="button"
        className="link-button"
        onClick={handleForgotPassword}
      >
        Esqueci minha senha
      </button>
    </>
  );
}