import type { Room } from '../types/Room';

import './BookingPage.css';

type BookingPageProps = {
  rooms: Room[];
  title: string;
  roomId: string;
  startTime: string;
  endTime: string;
  setTitle: (value: string) => void;
  setRoomId: (value: string) => void;
  setStartTime: (value: string) => void;
  setEndTime: (value: string) => void;
  handleCreateBooking: () => void;
};

export function BookingPage({
  rooms,
  title,
  roomId,
  startTime,
  endTime,
  setTitle,
  setRoomId,
  setStartTime,
  setEndTime,
  handleCreateBooking,
}: BookingPageProps) {
  const activeRooms = rooms.filter((room) => room.active !== false);

  return (
    <div className="booking-page">
      <section className="booking-card">
        <div className="booking-card-header">
          <h2>Nova reserva</h2>
          <p>
            Informe a sala, o período e o motivo da reserva.
          </p>
        </div>

        <div className="booking-form-grid">
          <label>
            Título da reserva
            <input
              placeholder="Ex.: Reunião, aula, defesa de TCC"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Sala
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            >
              <option value="">Selecione uma sala</option>

              {rooms.map((room) => (
                <option
                  key={room.id}
                  value={room.id}
                  disabled={room.active === false}
                >
                  {room.name}
                  {room.active === false ? ' (inativa)' : ''}
                </option>
              ))}
            </select>
          </label>

          <label>
            Início
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>

          <label>
            Fim
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </label>
        </div>

        <div className="booking-actions">
          <button
            className="booking-primary-button"
            onClick={handleCreateBooking}
          >
            Criar reserva
          </button>
        </div>
      </section>

      <aside className="booking-info-card">
        <h3>Orientações</h3>

        <ul>
          <li>Escolha uma sala ativa e disponível.</li>
          <li>O horário final deve ser maior que o horário inicial.</li>
          <li>Reservas de servidores ficam pendentes até aprovação.</li>
          <li>Reservas criadas por administradores são aprovadas automaticamente.</li>
        </ul>

        <div className="booking-rooms-counter">
          <span>Salas ativas disponíveis</span>
          <strong>{activeRooms.length}</strong>
        </div>
      </aside>
    </div>
  );
}