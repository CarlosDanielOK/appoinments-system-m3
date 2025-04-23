export const registerFormValidate = (input) => {
    const errors = {}

    if (!input.name.trim()) {
        errors.name = 'El nombre es requerido'
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.name)) {
        errors.name = "Name is invalid"
    }

    if (!input.email.trim()) {
        errors.email = 'Email es requerido'
    } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {
        errors.email = 'Email is invalid'
    }

    if (!input.birthdate) {
        errors.birthdate = 'La fecha de nacimiento es requerida'
    } else {
        const today = new Date();
        const birthdate = new Date(input.birthdate);
        const age = today.getFullYear() - birthdate.getFullYear();
        const monthDiff = today.getMonth() - birthdate.getMonth();
        const dayDiff = today.getDate() - birthdate.getDate();
        if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
            errors.birthdate = 'Debes tener al menos 18 años'
        }
    }

    if (!input.nDni.trim()) {
        errors.nDni = 'El número DNI es requerido'
    } else if (!/^\d+$/.test(input.nDni)) {
        errors.nDni = 'El número DNI debe contener sólo números'
    }

    if (!input.username.trim()) {
        errors.username = 'El nombre de usuario es requerido'
    } else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
        errors.username = 'El nombre de usuario debe contener solo letras y números'
    }

    if (!input.password.trim()) {
        errors.password = 'La contraseña es requerida'
    } else if (input.password.length < 8) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres'
    } else if (!/[A-Z]/.test(input.password)) {
        errors.password = 'La contraseña debe contener al menos una letra mayúscula'
    } else if (!/[0-9]/.test(input.password)) {
        errors.password = 'La contraseña debe contener al menos un número'
    } else if (!/[^A-Za-z0-9]/.test(input.password)) {
        errors.password = 'La contraseña debe contener al menos un carácter especial'
    }

    return errors
}