import { useEffect, useState } from 'react';

import { Sidebar, type ActivePage } from './components/Sidebar/Sidebar';
import { Topbar } from './components/Topbar/Topbar';
import { BookingModal } from './components/BookingModal/BookingModal';

import { DashboardPage } from './pages/DashboardPage';
import { CalendarPage } from './pages/CalendarPage';
import { BookingPage } from './pages/BookingPage';
import { RoomsPage } from './pages/RoomsPage';
import { UsersPage } from './pages/UsersPage';
import { ProfilePage } from './pages/ProfilePage';

import { api } from './services/api';
import { bookingService } from './services/booking.service';
import { roomService } from './services/room.service';
import { userService } from './services/user.service';
import { dashboardService } from './services/dashboard.service';

import type { Booking } from './types/Booking';
import type { Room } from './types/Room';
import type { User } from './types/User';
import type { DashboardStats } from './types/Dashboard';

import './styles.css';
import { LoginPage } from './pages/Login/LoginPage';

function App() {
  const [events, setEvents] = useState<any[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [dashboardStats, setDashboardStats] =
    useState<DashboardStats | null>(null);

  const [activePage, setActivePage] =
    useState<ActivePage>('dashboard');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [title, setTitle] = useState('');
  const [roomId, setRoomId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [roomName, setRoomName] = useState('');
  const [roomBlock, setRoomBlock] = useState('');
  const [roomCapacity, setRoomCapacity] = useState('');
  const [roomResources, setRoomResources] = useState('');

  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [editRoomName, setEditRoomName] = useState('');
  const [editRoomBlock, setEditRoomBlock] = useState('');
  const [editRoomCapacity, setEditRoomCapacity] = useState('');
  const [editRoomResources, setEditRoomResources] = useState('');
  const [editRoomActive, setEditRoomActive] = useState(true);

  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] =
    useState<'ADMIN' | 'SERVIDOR'>('SERVIDOR');

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserRole, setEditUserRole] =
    useState<'ADMIN' | 'SERVIDOR'>('SERVIDOR');
  const [editUserActive, setEditUserActive] = useState(true);
  const [temporaryPassword, setTemporaryPassword] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [editingBooking, setEditingBooking] = useState(false);

  const [editBookingTitle, setEditBookingTitle] = useState('');
  const [editBookingPurpose, setEditBookingPurpose] = useState('');
  const [editBookingRoomId, setEditBookingRoomId] = useState('');
  const [editBookingStartTime, setEditBookingStartTime] = useState('');
  const [editBookingEndTime, setEditBookingEndTime] = useState('');

  const [filterRoomId, setFilterRoomId] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSearch, setFilterSearch] = useState('');

  const filteredEvents = events.filter((event) => {
    const roomMatches =
      !filterRoomId || event.extendedProps.roomId === filterRoomId;

    const statusMatches =
      !filterStatus || event.extendedProps.status === filterStatus;

    const search = filterSearch.toLowerCase();

    const searchMatches =
      !search ||
      event.title.toLowerCase().includes(search) ||
      event.extendedProps.purpose?.toLowerCase().includes(search) ||
      event.extendedProps.user?.toLowerCase().includes(search) ||
      event.extendedProps.room?.toLowerCase().includes(search);

    return roomMatches && statusMatches && searchMatches;
  });

  function formatDateTimeLocal(date: Date) {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);

    return localDate.toISOString().slice(0, 16);
  }

  function canNavigate() {
    if (user?.mustChangePassword) {
      alert('Você deve alterar sua senha antes de acessar o sistema.');
      setActivePage('profile');
      return false;
    }

    return true;
  }

  async function loadDashboardStats() {
    const response = await dashboardService.getStats();
    setDashboardStats(response.data);
  }

  async function loadBookings() {
    const response = await bookingService.findAll();

    const formatted = response.data.map((booking: Booking) => ({
      id: booking.id,
      title: `${booking.room.name} - ${booking.title}`,
      start: booking.startTime,
      end: booking.endTime,
      extendedProps: {
        originalTitle: booking.title,
        roomId: booking.room.id,
        room: booking.room.name,
        purpose: booking.purpose,
        user: booking.user?.name,
        status: booking.status,
      },
      backgroundColor:
        booking.status === 'CANCELLED'
          ? '#ef4444'
          : booking.status === 'PENDING'
            ? '#f59e0b'
            : '#2563eb',
      borderColor:
        booking.status === 'CANCELLED'
          ? '#ef4444'
          : booking.status === 'PENDING'
            ? '#f59e0b'
            : '#2563eb',
    }));

    setEvents(formatted);
  }

  async function loadRooms() {
    const response = await roomService.findAll();
    setRooms(response.data);
  }

  async function loadUsers() {
    const response = await userService.findAll();
    setUsers(response.data);
  }

  async function loadInitialData(currentUser?: User) {
    await loadBookings();
    await loadRooms();
    await loadDashboardStats();

    if (currentUser?.role === 'ADMIN') {
      await loadUsers();
    }
  }

  async function handleLogin() {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const loggedUser = response.data.user;

      if (loggedUser.active === false) {
        alert('Usuário desativado. Contate o administrador.');
        return;
      }

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(loggedUser));

      setUser(loggedUser);

      if (loggedUser.mustChangePassword) {
        setActivePage('profile');
        alert('Você deve alterar sua senha antes de continuar.');
      } else {
        setActivePage('dashboard');
      }

      await loadInitialData(loggedUser);
    } catch {
      alert('E-mail ou senha inválidos.');
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);
    setEvents([]);
    setRooms([]);
    setUsers([]);
    setDashboardStats(null);
    setSelectedEvent(null);
    setEditingBooking(false);
    setEditingUser(null);
    setEditingRoom(null);
    setActivePage('dashboard');
  }

  function clearFilters() {
    setFilterRoomId('');
    setFilterStatus('');
    setFilterSearch('');
  }

  function handleDateSelect(info: any) {
    if (!canNavigate()) return;

    setStartTime(info.startStr.slice(0, 16));
    setEndTime(info.endStr.slice(0, 16));
    setActivePage('booking');
  }

  function handleEventClick(info: any) {
    setSelectedEvent(info.event);

    setEditBookingTitle(
      info.event.extendedProps.originalTitle ||
        info.event.title.split(' - ')[1] ||
        '',
    );

    setEditBookingPurpose(info.event.extendedProps.purpose || '');

    const eventRoomId =
      info.event.extendedProps.roomId ||
      rooms.find((room) => room.name === info.event.extendedProps.room)?.id ||
      '';

    setEditBookingRoomId(eventRoomId);

    if (info.event.start) {
      setEditBookingStartTime(formatDateTimeLocal(info.event.start));
    }

    if (info.event.end) {
      setEditBookingEndTime(formatDateTimeLocal(info.event.end));
    }

    setEditingBooking(false);
  }

  async function handleCreateBooking() {
    if (!user) return;

    if (user.mustChangePassword) {
      alert('Você deve alterar sua senha antes de criar reservas.');
      setActivePage('profile');
      return;
    }

    if (!title || !roomId || !startTime || !endTime) {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      await bookingService.create({
        title,
        roomId,
        startTime,
        endTime,
        userId: user.id,
      });

      alert('Agendamento criado com sucesso.');

      setTitle('');
      setRoomId('');
      setStartTime('');
      setEndTime('');

      await loadBookings();
      await loadDashboardStats();
      setActivePage('calendar');
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Erro ao criar agendamento');
    }
  }

  async function handleUpdateBooking() {
    if (!selectedEvent) return;

    if (
      !editBookingTitle ||
      !editBookingRoomId ||
      !editBookingStartTime ||
      !editBookingEndTime
    ) {
      alert('Preencha todos os campos da reserva.');
      return;
    }

    try {
      await bookingService.update(selectedEvent.id, {
        title: editBookingTitle,
        purpose: editBookingPurpose,
        roomId: editBookingRoomId,
        startTime: editBookingStartTime,
        endTime: editBookingEndTime,
      });

      alert('Reserva atualizada com sucesso.');

      setEditingBooking(false);
      setSelectedEvent(null);

      await loadBookings();
      await loadDashboardStats();
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Erro ao atualizar reserva.');
    }
  }

  async function handleCreateRoom() {
    if (user?.role !== 'ADMIN') {
      alert('Apenas ADMIN pode cadastrar salas.');
      return;
    }

    if (user.mustChangePassword) {
      alert('Você deve alterar sua senha antes de cadastrar salas.');
      setActivePage('profile');
      return;
    }

    if (!roomName) {
      alert('Informe o nome da sala.');
      return;
    }

    try {
      await roomService.create({
        name: roomName,
        block: roomBlock,
        capacity: roomCapacity ? Number(roomCapacity) : undefined,
        resources: roomResources,
        active: true,
      });

      alert('Sala cadastrada com sucesso.');

      setRoomName('');
      setRoomBlock('');
      setRoomCapacity('');
      setRoomResources('');

      await loadRooms();
      await loadDashboardStats();
      setActivePage('rooms');
    } catch {
      alert('Erro ao cadastrar sala.');
    }
  }

  function startEditRoom(room: Room) {
    setEditingRoom(room);
    setEditRoomName(room.name);
    setEditRoomBlock(room.block || '');
    setEditRoomCapacity(room.capacity ? String(room.capacity) : '');
    setEditRoomResources(room.resources || '');
    setEditRoomActive(room.active !== false);
  }

  function cancelEditRoom() {
    setEditingRoom(null);
    setEditRoomName('');
    setEditRoomBlock('');
    setEditRoomCapacity('');
    setEditRoomResources('');
    setEditRoomActive(true);
  }

  async function handleUpdateRoom() {
    if (!editingRoom) return;

    if (!editRoomName) {
      alert('Informe o nome da sala.');
      return;
    }

    try {
      await roomService.update(editingRoom.id, {
        name: editRoomName,
        block: editRoomBlock,
        capacity: editRoomCapacity ? Number(editRoomCapacity) : undefined,
        resources: editRoomResources,
        active: editRoomActive,
      });

      alert('Sala atualizada com sucesso.');

      cancelEditRoom();
      await loadRooms();
      await loadDashboardStats();
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Erro ao atualizar sala.');
    }
  }

  async function toggleRoomActive(room: Room) {
    try {
      await roomService.update(room.id, {
        active: room.active === false,
      });

      await loadRooms();
      await loadDashboardStats();
    } catch {
      alert('Erro ao alterar status da sala.');
    }
  }

  async function handleCreateUser() {
    if (user?.role !== 'ADMIN') {
      alert('Apenas ADMIN pode cadastrar usuários.');
      return;
    }

    if (!newUserName || !newUserEmail || !newUserPassword || !newUserRole) {
      alert('Preencha todos os campos.');
      return;
    }

    if (newUserPassword.length < 6) {
      alert('A senha temporária deve ter ao menos 6 caracteres.');
      return;
    }

    try {
      await userService.create({
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
        role: newUserRole,
      });

      alert(
        'Usuário cadastrado com sucesso. Ele deverá trocar a senha no primeiro acesso.',
      );

      setNewUserName('');
      setNewUserEmail('');
      setNewUserPassword('');
      setNewUserRole('SERVIDOR');

      await loadUsers();
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Erro ao cadastrar usuário.');
    }
  }

  function startEditUser(item: User) {
    setEditingUser(item);
    setEditUserName(item.name);
    setEditUserEmail(item.email);
    setEditUserRole(item.role as 'ADMIN' | 'SERVIDOR');
    setEditUserActive(item.active !== false);
    setTemporaryPassword('');
  }

  function cancelEditUser() {
    setEditingUser(null);
    setEditUserName('');
    setEditUserEmail('');
    setEditUserRole('SERVIDOR');
    setEditUserActive(true);
    setTemporaryPassword('');
  }

  async function handleUpdateUser() {
    if (!editingUser) return;

    if (!editUserName || !editUserEmail) {
      alert('Nome e e-mail são obrigatórios.');
      return;
    }

    if (temporaryPassword && temporaryPassword.length < 6) {
      alert('A senha temporária deve ter ao menos 6 caracteres.');
      return;
    }

    try {
      await userService.update(editingUser.id, {
        name: editUserName,
        email: editUserEmail,
        role: editUserRole,
        active: editUserActive,
        temporaryPassword: temporaryPassword || undefined,
      });

      alert('Usuário atualizado com sucesso.');

      cancelEditUser();
      await loadUsers();
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Erro ao atualizar usuário.');
    }
  }

  async function toggleUserActive(item: User) {
    try {
      await userService.update(item.id, {
        active: item.active === false,
      });

      await loadUsers();
    } catch {
      alert('Erro ao alterar status do usuário.');
    }
  }

  async function handleChangePassword() {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      alert('Preencha todos os campos.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    if (newPassword.length < 6) {
      alert('A nova senha deve ter ao menos 6 caracteres.');
      return;
    }

    try {
      await userService.changePassword({
        currentPassword,
        newPassword,
      });

      alert('Senha alterada com sucesso.');

      const updatedUser = {
        ...user,
        mustChangePassword: false,
      } as User;

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');

      setActivePage('dashboard');
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Erro ao alterar senha.');
    }
  }

  async function handleCancelBooking() {
    if (!selectedEvent) return;

    if (user?.mustChangePassword) {
      alert('Você deve alterar sua senha antes de cancelar reservas.');
      setActivePage('profile');
      return;
    }

    try {
      await bookingService.cancel(selectedEvent.id);

      alert('Reserva cancelada.');

      setSelectedEvent(null);
      setEditingBooking(false);

      await loadBookings();
      await loadDashboardStats();
    } catch {
      alert('Erro ao cancelar reserva.');
    }
  }

  async function handleApproveBooking() {
    if (!selectedEvent) return;

    if (user?.mustChangePassword) {
      alert('Você deve alterar sua senha antes de aprovar reservas.');
      setActivePage('profile');
      return;
    }

    try {
      await bookingService.approve(selectedEvent.id);

      alert('Reserva aprovada.');

      setSelectedEvent(null);
      setEditingBooking(false);

      await loadBookings();
      await loadDashboardStats();
    } catch {
      alert('Erro ao aprovar reserva.');
    }
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      const parsedUser = JSON.parse(savedUser);

      setUser(parsedUser);

      if (parsedUser.mustChangePassword) {
        setActivePage('profile');
      } else {
        setActivePage('dashboard');
      }

      loadInitialData(parsedUser);
    }
  }, []);

  if (!user) {
  return (
    <LoginPage
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      onLogin={handleLogin}
    />
  );
}

  return (
    <div className="layout">
      <Sidebar
        activePage={activePage}
        userRole={user.role}
        onNavigate={(page) => {
          if (page !== 'profile' && !canNavigate()) return;
          setActivePage(page);
        }}
        onLogout={handleLogout}
      />

      <main className="content">
        <Topbar activePage={activePage} user={user} />

        {activePage === 'dashboard' && (
          <DashboardPage dashboardStats={dashboardStats} />
        )}

        {activePage === 'calendar' && (
          <CalendarPage
            rooms={rooms}
            filteredEvents={filteredEvents}
            filterSearch={filterSearch}
            filterRoomId={filterRoomId}
            filterStatus={filterStatus}
            setFilterSearch={setFilterSearch}
            setFilterRoomId={setFilterRoomId}
            setFilterStatus={setFilterStatus}
            clearFilters={clearFilters}
            handleDateSelect={handleDateSelect}
            handleEventClick={handleEventClick}
          />
        )}

        {activePage === 'booking' && (
          <BookingPage
            rooms={rooms}
            title={title}
            roomId={roomId}
            startTime={startTime}
            endTime={endTime}
            setTitle={setTitle}
            setRoomId={setRoomId}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            handleCreateBooking={handleCreateBooking}
          />
        )}

        {activePage === 'rooms' && (
          <RoomsPage
            userRole={user.role}
            rooms={rooms}
            roomName={roomName}
            roomBlock={roomBlock}
            roomCapacity={roomCapacity}
            roomResources={roomResources}
            editingRoom={editingRoom}
            editRoomName={editRoomName}
            editRoomBlock={editRoomBlock}
            editRoomCapacity={editRoomCapacity}
            editRoomResources={editRoomResources}
            editRoomActive={editRoomActive}
            setRoomName={setRoomName}
            setRoomBlock={setRoomBlock}
            setRoomCapacity={setRoomCapacity}
            setRoomResources={setRoomResources}
            setEditRoomName={setEditRoomName}
            setEditRoomBlock={setEditRoomBlock}
            setEditRoomCapacity={setEditRoomCapacity}
            setEditRoomResources={setEditRoomResources}
            setEditRoomActive={setEditRoomActive}
            handleCreateRoom={handleCreateRoom}
            handleUpdateRoom={handleUpdateRoom}
            cancelEditRoom={cancelEditRoom}
            startEditRoom={startEditRoom}
            toggleRoomActive={toggleRoomActive}
          />
        )}

        {activePage === 'users' && user.role === 'ADMIN' && (
          <UsersPage
            users={users}
            newUserName={newUserName}
            newUserEmail={newUserEmail}
            newUserPassword={newUserPassword}
            newUserRole={newUserRole}
            editingUser={editingUser}
            editUserName={editUserName}
            editUserEmail={editUserEmail}
            editUserRole={editUserRole}
            editUserActive={editUserActive}
            temporaryPassword={temporaryPassword}
            setNewUserName={setNewUserName}
            setNewUserEmail={setNewUserEmail}
            setNewUserPassword={setNewUserPassword}
            setNewUserRole={setNewUserRole}
            setEditUserName={setEditUserName}
            setEditUserEmail={setEditUserEmail}
            setEditUserRole={setEditUserRole}
            setEditUserActive={setEditUserActive}
            setTemporaryPassword={setTemporaryPassword}
            handleCreateUser={handleCreateUser}
            handleUpdateUser={handleUpdateUser}
            cancelEditUser={cancelEditUser}
            startEditUser={startEditUser}
            toggleUserActive={toggleUserActive}
          />
        )}

        {activePage === 'profile' && (
          <ProfilePage
            currentPassword={currentPassword}
            newPassword={newPassword}
            confirmNewPassword={confirmNewPassword}
            setCurrentPassword={setCurrentPassword}
            setNewPassword={setNewPassword}
            setConfirmNewPassword={setConfirmNewPassword}
            handleChangePassword={handleChangePassword}
          />
        )}

        <BookingModal
          selectedEvent={selectedEvent}
          editingBooking={editingBooking}
          userRole={user.role}
          rooms={rooms}
          editBookingTitle={editBookingTitle}
          editBookingPurpose={editBookingPurpose}
          editBookingRoomId={editBookingRoomId}
          editBookingStartTime={editBookingStartTime}
          editBookingEndTime={editBookingEndTime}
          onClose={() => setSelectedEvent(null)}
          onStartEdit={() => setEditingBooking(true)}
          onCancelEdit={() => setEditingBooking(false)}
          onApprove={handleApproveBooking}
          onCancel={handleCancelBooking}
          onUpdate={handleUpdateBooking}
          setEditBookingTitle={setEditBookingTitle}
          setEditBookingPurpose={setEditBookingPurpose}
          setEditBookingRoomId={setEditBookingRoomId}
          setEditBookingStartTime={setEditBookingStartTime}
          setEditBookingEndTime={setEditBookingEndTime}
        />
      </main>
    </div>
  );
}

export default App;