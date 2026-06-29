import type { User } from '../types/User';

import './UsersPage.css';

type UsersPageProps = {
  users: User[];

  newUserName: string;
  newUserEmail: string;
  newUserPassword: string;
  newUserRole: 'ADMIN' | 'SERVIDOR';

  editingUser: User | null;
  editUserName: string;
  editUserEmail: string;
  editUserRole: 'ADMIN' | 'SERVIDOR';
  editUserActive: boolean;
  temporaryPassword: string;

  setNewUserName: (value: string) => void;
  setNewUserEmail: (value: string) => void;
  setNewUserPassword: (value: string) => void;
  setNewUserRole: (value: 'ADMIN' | 'SERVIDOR') => void;

  setEditUserName: (value: string) => void;
  setEditUserEmail: (value: string) => void;
  setEditUserRole: (value: 'ADMIN' | 'SERVIDOR') => void;
  setEditUserActive: (value: boolean) => void;
  setTemporaryPassword: (value: string) => void;

  handleCreateUser: () => void;
  handleUpdateUser: () => void;
  cancelEditUser: () => void;
  startEditUser: (user: User) => void;
  toggleUserActive: (user: User) => void;
};

function formatRole(role: string) {
  if (role === 'ADMIN') return 'Administrador';
  if (role === 'SERVIDOR') return 'Servidor';
  return role;
}

export function UsersPage({
  users,
  newUserName,
  newUserEmail,
  newUserPassword,
  newUserRole,
  editingUser,
  editUserName,
  editUserEmail,
  editUserRole,
  editUserActive,
  temporaryPassword,
  setNewUserName,
  setNewUserEmail,
  setNewUserPassword,
  setNewUserRole,
  setEditUserName,
  setEditUserEmail,
  setEditUserRole,
  setEditUserActive,
  setTemporaryPassword,
  handleCreateUser,
  handleUpdateUser,
  cancelEditUser,
  startEditUser,
  toggleUserActive,
}: UsersPageProps) {
  const activeUsers = users.filter((user) => user.active !== false).length;
  const inactiveUsers = users.length - activeUsers;

  return (
    <div className="users-page">
      <section className="users-summary">
        <div className="users-summary-card">
          <span>Total de usuários</span>
          <strong>{users.length}</strong>
        </div>

        <div className="users-summary-card success">
          <span>Usuários ativos</span>
          <strong>{activeUsers}</strong>
        </div>

        <div className="users-summary-card danger">
          <span>Usuários inativos</span>
          <strong>{inactiveUsers}</strong>
        </div>
      </section>

      <div className="users-content">
        <section className="users-form-card">
          <div className="users-card-header">
            <h2>
              {editingUser ? 'Editar usuário' : 'Cadastrar usuário'}
            </h2>

            <p>
              {editingUser
                ? 'Atualize os dados do usuário selecionado.'
                : 'Cadastre servidores e administradores do sistema.'}
            </p>
          </div>

          <div className="users-form-grid">
            <label>
              Nome
              <input
                placeholder="Nome completo"
                value={editingUser ? editUserName : newUserName}
                onChange={(e) =>
                  editingUser
                    ? setEditUserName(e.target.value)
                    : setNewUserName(e.target.value)
                }
              />
            </label>

            <label>
              E-mail
              <input
                placeholder="email@exemplo.com"
                value={editingUser ? editUserEmail : newUserEmail}
                onChange={(e) =>
                  editingUser
                    ? setEditUserEmail(e.target.value)
                    : setNewUserEmail(e.target.value)
                }
              />
            </label>

            {!editingUser && (
              <label>
                Senha temporária
                <input
                  placeholder="Mínimo de 6 caracteres"
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                />
              </label>
            )}

            {editingUser && (
              <label>
                Nova senha temporária
                <input
                  placeholder="Opcional"
                  type="password"
                  value={temporaryPassword}
                  onChange={(e) => setTemporaryPassword(e.target.value)}
                />
              </label>
            )}

            <label>
              Perfil
              <select
                value={editingUser ? editUserRole : newUserRole}
                onChange={(e) =>
                  editingUser
                    ? setEditUserRole(e.target.value as 'ADMIN' | 'SERVIDOR')
                    : setNewUserRole(e.target.value as 'ADMIN' | 'SERVIDOR')
                }
              >
                <option value="SERVIDOR">Servidor</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </label>

            {editingUser && (
              <label>
                Status
                <select
                  value={editUserActive ? 'active' : 'inactive'}
                  onChange={(e) =>
                    setEditUserActive(e.target.value === 'active')
                  }
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </label>
            )}
          </div>

          <div className="users-actions">
            <button
              className="users-primary-button"
              onClick={editingUser ? handleUpdateUser : handleCreateUser}
            >
              {editingUser ? 'Salvar alterações' : 'Cadastrar usuário'}
            </button>

            {editingUser && (
              <button
                className="users-secondary-button"
                onClick={cancelEditUser}
              >
                Cancelar edição
              </button>
            )}
          </div>
        </section>

        <section className="users-list-card">
          <div className="users-card-header">
            <h2>Usuários cadastrados</h2>
            <p>Gerencie acessos e perfis do sistema.</p>
          </div>

          {users.length === 0 ? (
            <div className="users-empty">
              Nenhum usuário cadastrado até o momento.
            </div>
          ) : (
            <div className="users-list">
              {users.map((item) => (
                <article key={item.id} className="users-item">
                  <div className="users-item-main">
                    <div className="users-avatar">
                      {item.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.email}</span>

                      <div className="users-badges">
                        <small>{formatRole(item.role)}</small>

                        <small
                          className={
                            item.active === false
                              ? 'user-status inactive'
                              : 'user-status active'
                          }
                        >
                          {item.active === false ? 'Inativo' : 'Ativo'}
                        </small>

                        {item.mustChangePassword && (
                          <small className="user-status warning">
                            Deve trocar senha
                          </small>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="users-item-actions">
                    <button onClick={() => startEditUser(item)}>
                      Editar
                    </button>

                    <button
                      className={
                        item.active === false
                          ? 'activate-button'
                          : 'deactivate-button'
                      }
                      onClick={() => toggleUserActive(item)}
                    >
                      {item.active === false ? 'Ativar' : 'Desativar'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}