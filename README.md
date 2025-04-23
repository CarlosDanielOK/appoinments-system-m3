# 📅 Sistema de Gestión de Turnos

Aplicación web completa para agendar, visualizar y cancelar turnos. Cuenta con un frontend en **React** y un backend en **Express + TypeScript + PostgreSQL**.

---

## 🧠 Descripción

Este sistema permite a los usuarios registrarse, iniciar sesión y gestionar sus turnos de manera intuitiva. Fue desarrollado como parte del **Módulo 3** del curso de desarrollo web.

---

## ✨ Funcionalidades

### 🔐 Autenticación de Usuarios
- Registro con nombre, correo, DNI, fecha de nacimiento, nombre de usuario y contraseña.
- Login con usuario y contraseña.
- Acceso restringido a funciones según estado de sesión.

### 📆 Gestión de Turnos
- Agenda de turnos con fechas y horarios dentro del rango laboral (8:00 a 18:00).
- No se permiten turnos en fines de semana.
- Vista de todos los turnos reservados.
- Cancelación de turnos hasta 1 día antes.

### 📣 Notificaciones (próximamente)
- Confirmaciones por email al registrar, agendar o cancelar turnos.

---

## 🧰 Tecnologías Utilizadas

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

## 🗂️ Estructura del Proyecto

### 📁 Frontend (`vite-project`)
