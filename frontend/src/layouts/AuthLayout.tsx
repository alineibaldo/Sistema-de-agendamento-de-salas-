import type { ReactNode } from 'react';

import './AuthLayout.css';

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <section className="auth-panel">
        <div className="auth-brand">
          <div className="if-badge">IFRS</div>

          <h1>Agenda IFRS</h1>
          <h2>Campus Zona Norte</h2>

          <div className="auth-divider" />

          <p className="auth-description">
            Sistema de agendamento de salas
          </p>

          <ul className="auth-features">
            <li>Reserva de salas</li>
            <li>Aprovação de reservas</li>
            <li>Gestão de usuários</li>
          </ul>
        </div>
      </section>

      <section className="auth-content">
        {children}
      </section>
    </div>
  );
}