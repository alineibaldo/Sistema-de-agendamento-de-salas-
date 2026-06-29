import type { Room } from '../types/Room';

import './RoomsPage.css';

type RoomsPageProps = {
  userRole: string;

  rooms: Room[];

  roomName: string;
  roomBlock: string;
  roomCapacity: string;
  roomResources: string;

  editingRoom: Room | null;
  editRoomName: string;
  editRoomBlock: string;
  editRoomCapacity: string;
  editRoomResources: string;
  editRoomActive: boolean;

  setRoomName: (value: string) => void;
  setRoomBlock: (value: string) => void;
  setRoomCapacity: (value: string) => void;
  setRoomResources: (value: string) => void;

  setEditRoomName: (value: string) => void;
  setEditRoomBlock: (value: string) => void;
  setEditRoomCapacity: (value: string) => void;
  setEditRoomResources: (value: string) => void;
  setEditRoomActive: (value: boolean) => void;

  handleCreateRoom: () => void;
  handleUpdateRoom: () => void;
  cancelEditRoom: () => void;
  startEditRoom: (room: Room) => void;
  toggleRoomActive: (room: Room) => void;
};

export function RoomsPage({
  userRole,
  rooms,
  roomName,
  roomBlock,
  roomCapacity,
  roomResources,
  editingRoom,
  editRoomName,
  editRoomBlock,
  editRoomCapacity,
  editRoomResources,
  editRoomActive,
  setRoomName,
  setRoomBlock,
  setRoomCapacity,
  setRoomResources,
  setEditRoomName,
  setEditRoomBlock,
  setEditRoomCapacity,
  setEditRoomResources,
  setEditRoomActive,
  handleCreateRoom,
  handleUpdateRoom,
  cancelEditRoom,
  startEditRoom,
  toggleRoomActive,
}: RoomsPageProps) {
  const activeRooms = rooms.filter((room) => room.active !== false).length;
  const inactiveRooms = rooms.length - activeRooms;

  return (
    <div className="rooms-page">
      <section className="rooms-summary">
        <div className="rooms-summary-card">
          <span>Total de salas</span>
          <strong>{rooms.length}</strong>
        </div>

        <div className="rooms-summary-card success">
          <span>Salas ativas</span>
          <strong>{activeRooms}</strong>
        </div>

        <div className="rooms-summary-card danger">
          <span>Salas inativas</span>
          <strong>{inactiveRooms}</strong>
        </div>
      </section>

      <div className="rooms-content">
        {userRole === 'ADMIN' && (
          <section className="rooms-form-card">
            <div className="rooms-card-header">
              <h2>{editingRoom ? 'Editar sala' : 'Cadastrar sala'}</h2>
              <p>
                {editingRoom
                  ? 'Atualize as informações da sala selecionada.'
                  : 'Adicione uma nova sala disponível para reservas.'}
              </p>
            </div>

            <div className="rooms-form-grid">
              <label>
                Nome da sala
                <input
                  placeholder="Ex.: Sala 201"
                  value={editingRoom ? editRoomName : roomName}
                  onChange={(e) =>
                    editingRoom
                      ? setEditRoomName(e.target.value)
                      : setRoomName(e.target.value)
                  }
                />
              </label>

              <label>
                Bloco
                <input
                  placeholder="Ex.: Bloco A"
                  value={editingRoom ? editRoomBlock : roomBlock}
                  onChange={(e) =>
                    editingRoom
                      ? setEditRoomBlock(e.target.value)
                      : setRoomBlock(e.target.value)
                  }
                />
              </label>

              <label>
                Capacidade
                <input
                  placeholder="Ex.: 40"
                  type="number"
                  value={editingRoom ? editRoomCapacity : roomCapacity}
                  onChange={(e) =>
                    editingRoom
                      ? setEditRoomCapacity(e.target.value)
                      : setRoomCapacity(e.target.value)
                  }
                />
              </label>

              <label>
                Recursos
                <input
                  placeholder="Ex.: Projetor, quadro, ar-condicionado"
                  value={editingRoom ? editRoomResources : roomResources}
                  onChange={(e) =>
                    editingRoom
                      ? setEditRoomResources(e.target.value)
                      : setRoomResources(e.target.value)
                  }
                />
              </label>

              {editingRoom && (
                <label>
                  Status
                  <select
                    value={editRoomActive ? 'active' : 'inactive'}
                    onChange={(e) =>
                      setEditRoomActive(e.target.value === 'active')
                    }
                  >
                    <option value="active">Ativa</option>
                    <option value="inactive">Inativa</option>
                  </select>
                </label>
              )}
            </div>

            <div className="rooms-actions">
              <button
                className="rooms-primary-button"
                onClick={editingRoom ? handleUpdateRoom : handleCreateRoom}
              >
                {editingRoom ? 'Salvar alterações' : 'Cadastrar sala'}
              </button>

              {editingRoom && (
                <button
                  className="rooms-secondary-button"
                  onClick={cancelEditRoom}
                >
                  Cancelar edição
                </button>
              )}
            </div>
          </section>
        )}

        <section className="rooms-list-card">
          <div className="rooms-card-header">
            <h2>Salas cadastradas</h2>
            <p>Consulte as salas disponíveis e seus recursos.</p>
          </div>

          {rooms.length === 0 ? (
            <div className="rooms-empty">
              Nenhuma sala cadastrada até o momento.
            </div>
          ) : (
            <div className="rooms-list">
              {rooms.map((room) => (
                <article key={room.id} className="rooms-item">
                  <div className="rooms-item-main">
                    <div className="rooms-icon">🏫</div>

                    <div>
                      <strong>{room.name}</strong>

                      <span>
                        {room.block || 'Sem bloco informado'}
                        {room.capacity
                          ? ` • ${room.capacity} lugares`
                          : ''}
                      </span>

                      <small>
                        {room.resources || 'Sem recursos informados'}
                      </small>
                    </div>
                  </div>

                  <div className="rooms-item-side">
                    <span
                      className={
                        room.active === false
                          ? 'room-status inactive'
                          : 'room-status active'
                      }
                    >
                      {room.active === false ? 'Inativa' : 'Ativa'}
                    </span>

                    {userRole === 'ADMIN' && (
                      <div className="rooms-item-actions">
                        <button onClick={() => startEditRoom(room)}>
                          Editar
                        </button>

                        <button
                          className={
                            room.active === false
                              ? 'activate-button'
                              : 'deactivate-button'
                          }
                          onClick={() => toggleRoomActive(room)}
                        >
                          {room.active === false ? 'Ativar' : 'Desativar'}
                        </button>
                      </div>
                    )}
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