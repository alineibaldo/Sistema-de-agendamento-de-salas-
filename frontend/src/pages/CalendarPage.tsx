import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import type { Room } from '../types/Room';

import './CalendarPage.css';

type CalendarPageProps = {
  rooms: Room[];
  filteredEvents: any[];
  filterSearch: string;
  filterRoomId: string;
  filterStatus: string;
  setFilterSearch: (value: string) => void;
  setFilterRoomId: (value: string) => void;
  setFilterStatus: (value: string) => void;
  clearFilters: () => void;
  handleDateSelect: (info: any) => void;
  handleEventClick: (info: any) => void;
};

export function CalendarPage({
  rooms,
  filteredEvents,
  filterSearch,
  filterRoomId,
  filterStatus,
  setFilterSearch,
  setFilterRoomId,
  setFilterStatus,
  clearFilters,
  handleDateSelect,
  handleEventClick,
}: CalendarPageProps) {
  return (
    <div className="calendar-page">
      <section className="calendar-filters-card">
        <div className="calendar-filters-header">
          <div>
            <h2>Filtros do calendário</h2>
            <p>Busque reservas por sala, status ou responsável.</p>
          </div>

          <button
            type="button"
            className="calendar-clear-button"
            onClick={clearFilters}
          >
            Limpar filtros
          </button>
        </div>

        <div className="calendar-filters-grid">
          <div className="calendar-field">
            <label>Pesquisar</label>
            <input
              placeholder="Título, sala ou responsável"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
            />
          </div>

          <div className="calendar-field">
            <label>Sala</label>
            <select
              value={filterRoomId}
              onChange={(e) => setFilterRoomId(e.target.value)}
            >
              <option value="">Todas as salas</option>

              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          <div className="calendar-field">
            <label>Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="PENDING">Pendentes</option>
              <option value="APPROVED">Aprovadas</option>
              <option value="CANCELLED">Canceladas</option>
            </select>
          </div>
        </div>

        <div className="calendar-legend">
          <span>
            <strong className="legend-dot approved" />
            Aprovada
          </span>

          <span>
            <strong className="legend-dot pending" />
            Pendente
          </span>

          <span>
            <strong className="legend-dot cancelled" />
            Cancelada
          </span>
        </div>
      </section>

      <section className="calendar-wrapper">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          initialView="timeGridWeek"
          locale="pt-br"
          allDaySlot={false}
          slotMinTime="07:00:00"
          slotMaxTime="22:00:00"
          selectable={true}
          select={handleDateSelect}
          events={filteredEvents}
          eventClick={handleEventClick}
          height="80vh"
          nowIndicator={true}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay,dayGridMonth',
          }}
          buttonText={{
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
          }}
        />
      </section>
    </div>
  );
}