# 📅 Agenda IFRS

Sistema web para gerenciamento de reservas de salas desenvolvido como Projeto de Extensão do curso de Análise e Desenvolvimento de Sistemas da PUCRS.

> **Importante:** este é um sistema **independente**, desenvolvido para apoiar o gerenciamento de reservas de salas do IFRS Campus Porto Alegre Zona Norte. Não é um sistema oficial da instituição.

---

## 📌 Objetivo

O Agenda IFRS foi desenvolvido para facilitar o gerenciamento de reservas de salas, permitindo que servidores realizem solicitações de agendamento e que administradores controlem usuários, salas e aprovações em um único sistema.

---

## ✨ Funcionalidades

### Autenticação

- Login com JWT
- Controle de perfis (Administrador e Servidor)
- Troca obrigatória de senha no primeiro acesso
- Alteração de senha

### Dashboard

- Total de salas
- Total de reservas
- Reservas pendentes
- Reservas aprovadas
- Reservas canceladas
- Próximas reservas

### Calendário

- Visualização diária, semanal e mensal
- Filtros por sala
- Filtros por status
- Pesquisa por título, sala e responsável

### Reservas

- Criar reserva
- Editar reserva
- Aprovar reserva
- Cancelar reserva
- Validação automática de conflitos de horário

### Salas

- Cadastro
- Edição
- Ativação e desativação

### Usuários

- Cadastro
- Edição
- Ativação e desativação
- Senha temporária

---

# 🖥️ Tecnologias

## Frontend

- React
- TypeScript
- Vite
- Axios
- FullCalendar
- Lucide React

## Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT
- Bcrypt

## Banco de Dados

- PostgreSQL
- Prisma Migrate
- Prisma Seed

---

# 📂 Estrutura

```
agenda-ifrs/
│
├── backend/
│
├── frontend/
│
├── README.md
│
└── .gitignore
```

---

# 🚀 Como executar

## Clonar o projeto

```bash
git clone https://github.com/alineibaldo/Sistema-de-agendamento-de-salas-.git

cd Sistema-de-agendamento-de-salas-
```

---

## Backend

```bash
cd backend

npm install

npx prisma migrate dev

npx prisma db seed

npm run start:dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Usuários de teste

Após executar o seed:

## Administrador

**E-mail**

```
admin@ifrs.edu.br
```

**Senha**

```
Admin@123
```

---

## Servidor

**E-mail**

```
servidor@ifrs.edu.br
```

**Senha**

```
Admin@123
```

---

# 📷 Telas

> Adicione aqui capturas de tela do sistema.

- Login
- Dashboard
- Calendário
- Nova Reserva
- Salas
- Usuários
- Perfil

---

# 🔮 Melhorias futuras

- Notificações por e-mail
- Relatórios
- Exportação de reservas
- Dashboard com gráficos
- Recuperação de senha
- Responsividade para dispositivos móveis

---

# 👩‍💻 Desenvolvedora

**Aline Ibaldo Gonçalves**

Projeto de Extensão

Curso de Análise e Desenvolvimento de Sistemas

Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS)

2026

---

# 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins acadêmicos.
