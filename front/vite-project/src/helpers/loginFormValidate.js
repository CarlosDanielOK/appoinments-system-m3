export const loginFormValidate = (input) => {
    const errors = {}

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