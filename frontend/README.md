# Agenda IFRS

Sistema web para gerenciamento de reservas de salas desenvolvido como Projeto de Extensão do curso de Análise e Desenvolvimento de Sistemas da PUCRS.

> **Importante:** Este é um sistema independente, desenvolvido para apoiar o gerenciamento de reservas de salas do IFRS Campus Porto Alegre Zona Norte. Não se trata de um sistema oficial da instituição.

---

## Objetivo

O Agenda IFRS foi desenvolvido para centralizar o processo de solicitação e gerenciamento de reservas de salas, reduzindo conflitos de horário e facilitando o controle das reservas por administradores.

O sistema permite que servidores solicitem reservas e que administradores realizem o gerenciamento de usuários, salas e aprovações de agendamentos.

---

## Funcionalidades

### Autenticação

- Login
- Controle de perfis (Administrador e Servidor)
- Primeiro acesso com troca obrigatória de senha
- Alteração de senha

### Dashboard

- Total de salas
- Total de reservas
- Reservas pendentes
- Reservas aprovadas
- Reservas canceladas
- Próximas reservas

### Calendário

- Visualização semanal
- Visualização diária
- Visualização mensal
- Filtros por sala
- Filtros por status
- Pesquisa de reservas

### Reservas

- Criar reserva
- Editar reserva
- Aprovar reserva
- Cancelar reserva
- Validação de conflitos de horário

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

## Tecnologias utilizadas

### Frontend

- React
- TypeScript
- Vite
- FullCalendar
- Lucide React

### Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

---

## Estrutura do projeto

```
agenda-ifrs/
│
├── backend/
│
├── frontend/
│
└── README.md
```

---

## Como executar o projeto

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Banco de dados

O projeto utiliza PostgreSQL.

Após configurar a variável `DATABASE_URL`, execute:

```bash
npx prisma migrate dev
npx prisma generate
```

---

## Perfis de acesso

### Administrador

- Gerenciar usuários
- Gerenciar salas
- Aprovar reservas
- Cancelar reservas
- Editar reservas

### Servidor

- Solicitar reservas
- Consultar calendário
- Alterar senha

---

## Desenvolvido por

**Aline Ibaldo Gonçalves**

Projeto de Extensão

Curso de Análise e Desenvolvimento de Sistemas

Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS)

2026
```
