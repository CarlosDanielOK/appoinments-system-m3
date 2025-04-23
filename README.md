# 📅 Sistema de Gestión de Turnos

Aplicación web completa para agendar, visualizar y cancelar turnos. Cuenta con un frontend en **React** y un backend en **Express + TypeScript + PostgreSQL**. Fue desarrollado como parte del **Módulo 3** del bootcampt de Desarrollo Web Full Stack.

---

## 🖥️ Funcionalidades

- Agenda de turnos con fechas y horarios dentro del rango laboral (8:00 a 18:00).
- No se permiten turnos en fines de semana.
- Vista de todos los turnos reservados.
- Cancelación de turnos hasta 1 día antes.

---

## 🔑 Tecnologías

### Frontend
- React
- Formik
- React Router
- SweetAlert2
- CSS Modules

### Backend
- Node.js + Express
- TypeScript
- TypeORM
- PostgreSQL
- dotenv

---

## 🚀 Instalación local

### Frontend

```bash
cd vite-project
npm install
npm run dev
```

### Backend
```bash
cd back
cd .env.example .env # Editá tus variables de entorno
npm install
npm start
