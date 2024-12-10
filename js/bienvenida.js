document.addEventListener("DOMContentLoaded", () => {
    const bienvenida = document.getElementById("Bienvenida");

    // Recupera el usuario activo desde localStorage
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));

    // Verifica si existe un usuario activo y actualiza el mensaje
    if (activeUser && activeUser.username) {
        bienvenida.textContent = `Bienvenido, ${activeUser.username}!`;
    } else {
        bienvenida.textContent = "Bienvenido!";
    }
});
