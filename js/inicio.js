document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem('registeredUser'));
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (savedUser && savedUser.email === email && savedUser.password === password) {
        alert('Inicio de sesión exitoso');
        // Guarda el usuario activo
        localStorage.setItem('activeUser', JSON.stringify(savedUser));
        window.location.href = 'index.html';
    } else {
        alert('Datos incorrectos');
    }
});
