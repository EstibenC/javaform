document.getElementById('formr').addEventListener('submit', (event) => {
    event.preventDefault();

    const user = {
        username: document.getElementById('registeru').value,
        email: document.getElementById('register-email').value,
        password: document.getElementById('register-password').value,
    };

    localStorage.setItem('registeredUser', JSON.stringify(user));
    alert('Registro exitoso');
    window.location.href = 'inicio.html';
});