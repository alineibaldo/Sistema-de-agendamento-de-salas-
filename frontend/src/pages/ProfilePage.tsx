import './ProfilePage.css';

type ProfilePageProps = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  setCurrentPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  setConfirmNewPassword: (value: string) => void;
  handleChangePassword: () => void;
};

export function ProfilePage({
  currentPassword,
  newPassword,
  confirmNewPassword,
  setCurrentPassword,
  setNewPassword,
  setConfirmNewPassword,
  handleChangePassword,
}: ProfilePageProps) {
  return (
    <div className="profile-page">
      <section className="profile-card">
        <div className="profile-header">
          <h2>Alterar senha</h2>
          <p>
            Mantenha sua conta protegida utilizando uma senha forte.
          </p>
        </div>

        <div className="profile-form">
          <label>
            Senha atual
            <input
              type="password"
              placeholder="Digite sua senha atual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </label>

          <label>
            Nova senha
            <input
              type="password"
              placeholder="Digite a nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>

          <label>
            Confirmar nova senha
            <input
              type="password"
              placeholder="Repita a nova senha"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </label>
        </div>

        <button
          className="profile-primary-button"
          onClick={handleChangePassword}
        >
          Alterar senha
        </button>
      </section>

      <aside className="profile-info-card">
        <h3>Recomendações</h3>

        <ul>
          <li>Utilize pelo menos 8 caracteres.</li>
          <li>Combine letras maiúsculas e minúsculas.</li>
          <li>Inclua números e símbolos.</li>
          <li>Não reutilize senhas antigas.</li>
        </ul>
      </aside>
    </div>
  );
}