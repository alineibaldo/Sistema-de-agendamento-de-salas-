import type { DashboardStats } from '../types/Dashboard';

import './DashboardPage.css';

type DashboardPageProps = {
  dashboardStats: DashboardStats | null;
};

function formatStatus(status: string) {
  if (status === 'APPROVED') return 'Aprovada';
  if (status === 'PENDING') return 'Pendente';
  if (status === 'CANCELLED') return 'Cancelada';

  return status;
}

export function DashboardPage({
  dashboardStats,
}: DashboardPageProps) {
  if (!dashboardStats) {
    return (
      <div className="dashboard-loading">
        Carregando dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-stats-grid">
        <div className="dashboard-card">
          <div className="dashboard-icon">🏫</div>
          <strong>{dashboardStats.totalRooms}</strong>
          <span>Salas cadastradas</span>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon">📅</div>
          <strong>{dashboardStats.totalBookings}</strong>
          <span>Total de reservas</span>
        </div>

        <div className="dashboard-card warning">
          <div className="dashboard-icon">⏳</div>
          <strong>{dashboardStats.pendingBookings}</strong>
          <span>Reservas pendentes</span>
        </div>

        <div className="dashboard-card success">
          <div className="dashboard-icon">✅</div>
          <strong>{dashboardStats.approvedBookings}</strong>
          <span>Reservas aprovadas</span>
        </div>

        <div className="dashboard-card danger">
          <div className="dashboard-icon">✕</div>
          <strong>{dashboardStats.cancelledBookings}</strong>
          <span>Reservas canceladas</span>
        </div>
      </div>

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Próximas reservas</h2>
            <p>Agendamentos futuros registrados no sistema.</p>
          </div>
        </div>

        {dashboardStats.nextBookings.length === 0 ? (
          <div className="dashboard-empty">
            Nenhuma reserva futura encontrada.
          </div>
        ) : (
          <div className="dashboard-booking-list">
            {dashboardStats.nextBookings.map((booking) => (
              <div
                key={booking.id}
                className="dashboard-booking-item"
              >
                <div>
                  <strong>{booking.room.name}</strong>
                  <span>{booking.title}</span>
                </div>

                <div className="dashboard-booking-meta">
                  <small>
                    {new Date(
                      booking.startTime,
                    ).toLocaleString()}
                  </small>

                  <span
                    className={`status-badge status-${booking.status.toLowerCase()}`}
                  >
                    {formatStatus(booking.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}