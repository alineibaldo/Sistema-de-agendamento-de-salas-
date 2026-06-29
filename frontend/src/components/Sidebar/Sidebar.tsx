import {
  CalendarDays,
  DoorOpen,
  LayoutDashboard,
  LogOut,
  Plus,
  UserRound,
  Users,
} from 'lucide-react';

import './Sidebar.css';

export type ActivePage =
  | 'dashboard'
  | 'calendar'
  | 'booking'
  | 'rooms'
  | 'users'
  | 'profile';

type SidebarProps = {
  activePage: ActivePage;
  userRole: string;
  onNavigate: (page: ActivePage) => void;
  onLogout: () => void;
};

export function Sidebar({
  activePage,
  userRole,
  onNavigate,
  onLogout,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">IFRS</div>

        <div>
          <h2>Agenda IFRS</h2>
          <p>Campus Zona Norte</p>
        </div>
      </div>

      <nav className="sidebar-menu">
        <button
          className={activePage === 'dashboard' ? 'active' : ''}
          onClick={() => onNavigate('dashboard')}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button
          className={activePage === 'calendar' ? 'active' : ''}
          onClick={() => onNavigate('calendar')}
        >
          <CalendarDays size={18} />
          Calendário
        </button>

        <button
          className={activePage === 'booking' ? 'active' : ''}
          onClick={() => onNavigate('booking')}
        >
          <Plus size={18} />
          Nova Reserva
        </button>

        <button
          className={activePage === 'rooms' ? 'active' : ''}
          onClick={() => onNavigate('rooms')}
        >
          <DoorOpen size={18} />
          Salas
        </button>

        {userRole === 'ADMIN' && (
          <button
            className={activePage === 'users' ? 'active' : ''}
            onClick={() => onNavigate('users')}
          >
            <Users size={18} />
            Usuários
          </button>
        )}

        <button
          className={activePage === 'profile' ? 'active' : ''}
          onClick={() => onNavigate('profile')}
        >
          <UserRound size={18} />
          Perfil
        </button>
      </nav>

      <div className="sidebar-footer">
        <button onClick={onLogout}>
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  );
}