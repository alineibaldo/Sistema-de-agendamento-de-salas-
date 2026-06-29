import { AuthLayout } from '../../layouts/AuthLayout';
import { LoginForm } from '../../components/Auth/LoginForm';

import './LoginPage.css';

type LoginPageProps = {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onLogin: () => void;
};

export function LoginPage({
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
}: LoginPageProps) {
  return (
    <AuthLayout>
      <div className="login-card">
        <div>
          <h1>Entrar</h1>
          <p>
            Acesse o sistema utilizando seu e-mail e senha.
          </p>
        </div>

        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onLogin={onLogin}
        />

        <footer className="login-footer">
          Versão 1.0.0 • Desenvolvido por Aline Ibaldo
          Gonçalves
        </footer>
      </div>
    </AuthLayout>
  );
}