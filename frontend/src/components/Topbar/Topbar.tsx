import type { ActivePage } from '../Sidebar/Sidebar';
import type { User } from '../../types/User';

import './Topbar.css';

type TopbarProps = {
  activePage: ActivePage;
  user: User;
};

const titles: Record<ActivePage, string> = {
  dashboard: 'Dashboard',
  calendar: 'Calendário',
  booking: 'Nova Reserva',
  rooms: 'Salas',
  users: 'Usuários',
  profile: 'Perfil',
};

const descriptions: Record<ActivePage, string> = {
  dashboard: 'Acompanhe os principais indicadores do sistema.',
  calendar: 'Visualize as reservas das salas no calendário.',
  booking: 'Crie uma nova solicitação de agendamento.',
  rooms: 'Gerencie as salas disponíveis para reserva.',
  users: 'Cadastre, edite e desative usuários.',
  profile: 'Gerencie sua conta e altere sua senha.',
};

function formatRole(role: string) {
  if (role === 'ADMIN') {
    return 'Administrador';
  }

  if (role === 'SERVIDOR') {
    return 'Servidor';
  }

  return role;
}

export function Topbar({ activePage, user }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar-title">
        <span className="topbar-eyebrow">
          Agenda IFRS
        </span>

        <h1>{titles[activePage]}</h1>

        <p>{descriptions[activePage]}</p>
      </div>

      <div className="topbar-user">
        <div className="topbar-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <strong>{user.name}</strong>
          <p>{formatRole(user.role)}</p>
        </div>
      </div>
    </header>
  );
}