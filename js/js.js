document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.querySelector("#tablaUsuarios tbody");
    const form = document.getElementById("formRegistro");
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Renderizar usuarios en la tabla
    const render = () => {
        tabla.innerHTML = usuarios.map((u, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${u.Nombre}</td>
                <td>${u.Edad}</td>
                <td>${u.Ciudad}</td>
                <td>${u.Correo}</td>
                <td>${u.FechaNacimiento}</td>
                <td>
                    <button onclick="editar(${i})" class="btn btn-warning btn-sm">Editar</button>
                    <button onclick="eliminar(${i})" class="btn btn-danger btn-sm">Eliminar</button>
                    <button onclick="consultar(${i})" class="btn btn-info btn-sm">Consultar</button>
                </td>
            </tr>`).join("");
    };

    // Guardar o editar usuario
    document.getElementById("btnGuardarUsuario").onclick = () => {
        const data = {
            Nombre: document.getElementById("Nombre").value,
            Edad: document.getElementById("Edad").value,
            Ciudad: document.getElementById("Ciudad").value,
            Correo: document.getElementById("correo").value,
            FechaNacimiento: document.getElementById("FechaNacimiento").value,
        };

        if (form.dataset.index) {
            usuarios[form.dataset.index] = data; // Editar usuario
        } else {
            usuarios.push(data); // Nuevo usuario
        }

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        form.reset();
        delete form.dataset.index;
        render();
    };

    // Editar usuario
    window.editar = (i) => {
        const u = usuarios[i];
        document.getElementById("Nombre").value = u.Nombre;
        document.getElementById("Edad").value = u.Edad;
        document.getElementById("Ciudad").value = u.Ciudad;
        document.getElementById("correo").value = u.Correo;
        document.getElementById("FechaNacimiento").value = u.FechaNacimiento;
        form.dataset.index = i;
        new bootstrap.Modal(document.getElementById("dialogo1")).show();
    };

    // Eliminar usuario
    window.eliminar = (i) => {
        usuarios.splice(i, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        render();
    };

    // Consultar usuario
    window.consultar = (i) => {
        const u = usuarios[i];
        ["Nombre", "Edad", "Ciudad", "correo", "FechaNacimiento"].forEach(id => {
            const input = document.getElementById(id);
            input.value = u[id.charAt(0).toUpperCase() + id.slice(1)] || u[id]; // Rellenar datos
            input.disabled = true; // Deshabilitar campo
        });

        document.getElementById("btnGuardarUsuario").style.display = "none";
        new bootstrap.Modal(document.getElementById("dialogo1")).show();
    };

    // Restaurar formulario al cerrar el modal
    document.getElementById("dialogo1").addEventListener("hidden.bs.modal", () => {
        form.reset();
        ["Nombre", "Edad", "Ciudad", "correo", "FechaNacimiento"].forEach(id => {
            document.getElementById(id).disabled = false;
        });
        document.getElementById("btnGuardarUsuario").style.display = "block";
        delete form.dataset.index;
    });

    // Render inicial
    render();
});
