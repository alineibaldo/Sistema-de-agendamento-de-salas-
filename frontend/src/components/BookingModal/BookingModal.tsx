import type { Room } from '../../types/Room';

import './BookingModal.css';

type BookingModalProps = {
  selectedEvent: any;
  editingBooking: boolean;
  userRole: string;
  rooms: Room[];

  editBookingTitle: string;
  editBookingPurpose: string;
  editBookingRoomId: string;
  editBookingStartTime: string;
  editBookingEndTime: string;

  onClose: () => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onApprove: () => void;
  onCancel: () => void;
  onUpdate: () => void;

  setEditBookingTitle: (value: string) => void;
  setEditBookingPurpose: (value: string) => void;
  setEditBookingRoomId: (value: string) => void;
  setEditBookingStartTime: (value: string) => void;
  setEditBookingEndTime: (value: string) => void;
};

export function BookingModal({
  selectedEvent,
  editingBooking,
  userRole,
  rooms,
  editBookingTitle,
  editBookingPurpose,
  editBookingRoomId,
  editBookingStartTime,
  editBookingEndTime,
  onClose,
  onStartEdit,
  onCancelEdit,
  onApprove,
  onCancel,
  onUpdate,
  setEditBookingTitle,
  setEditBookingPurpose,
  setEditBookingRoomId,
  setEditBookingStartTime,
  setEditBookingEndTime,
}: BookingModalProps) {
  if (!selectedEvent) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>
          {editingBooking ? 'Editar Reserva' : selectedEvent.title}
        </h2>

        {editingBooking ? (
          <>
            <input
              placeholder="Título"
              value={editBookingTitle}
              onChange={(e) => setEditBookingTitle(e.target.value)}
            />

            <input
              placeholder="Descrição"
              value={editBookingPurpose}
              onChange={(e) => setEditBookingPurpose(e.target.value)}
            />

            <select
              value={editBookingRoomId}
              onChange={(e) => setEditBookingRoomId(e.target.value)}
            >
              <option value="">Selecione a sala</option>

              {rooms
                .filter(
                  (room) =>
                    room.active !== false ||
                    room.id === editBookingRoomId,
                )
                .map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
            </select>

            <input
              type="datetime-local"
              value={editBookingStartTime}
              onChange={(e) => setEditBookingStartTime(e.target.value)}
            />

            <input
              type="datetime-local"
              value={editBookingEndTime}
              onChange={(e) => setEditBookingEndTime(e.target.value)}
            />

            <button className="approve-button" onClick={onUpdate}>
              Salvar Alterações
            </button>

            <button onClick={onCancelEdit}>Cancelar Edição</button>
          </>
        ) : (
          <>
            <p>
              <strong>Sala:</strong>{' '}
              {selectedEvent.extendedProps.room}
            </p>

          

            <p>
              <strong>Status:</strong>{' '}
            <span
            className={
            selectedEvent.extendedProps.status === 'APPROVED'
            ? 'status-badge approved'
            : selectedEvent.extendedProps.status === 'PENDING'
            ? 'status-badge pending'
            : 'status-badge cancelled'
  }
>
  {selectedEvent.extendedProps.status === 'APPROVED'
    ? 'Aprovada'
    : selectedEvent.extendedProps.status === 'PENDING'
    ? 'Pendente'
    : 'Cancelada'}
</span>
              <strong>Status:</strong>{' '}
              {selectedEvent.extendedProps.status}
            </p>

            <p>
              <strong>Descrição:</strong>{' '}
              {selectedEvent.extendedProps.purpose || 'Sem descrição'}
            </p>

            <p>
              <strong>Início:</strong>{' '}
              {selectedEvent.start?.toLocaleString()}
            </p>

            <p>
              <strong>Fim:</strong>{' '}
              {selectedEvent.end?.toLocaleString()}
            </p>

            <button onClick={onClose}>Fechar</button>

            {userRole === 'ADMIN' &&
              selectedEvent.extendedProps.status !== 'CANCELLED' && (
                <button onClick={onStartEdit}>Editar Reserva</button>
              )}

            {userRole === 'ADMIN' &&
              selectedEvent.extendedProps.status === 'PENDING' && (
                <button className="approve-button" onClick={onApprove}>
                  Aprovar Reserva
                </button>
              )}

            {userRole === 'ADMIN' &&
              selectedEvent.extendedProps.status !== 'CANCELLED' && (
                <button className="cancel-button" onClick={onCancel}>
                  Cancelar Reserva
                </button>
              )}
          </>
        )}
      </div>
    </div>
  );
}