async function subirArchivo(protocolo) {
    const fileInput = document.getElementById('filePicker');
    const mensaje = document.getElementById('mensaje');
    const boton = document.getElementById('btnEnviar');

    if (fileInput.files.length === 0) {
        alert("Por favor, selecciona un archivo.");
        return;
    }

    const archivo = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', archivo);

    mensaje.innerText = "Subiendo...";
    boton.disabled = true;

    try {
        // Usamos la URL local que pasaste: http://127.0.0.1:8000
        const response = await fetch(`http://127.0.0.1:8000/upload/${protocolo}`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            mensaje.innerHTML = `<b style="color: green;">✅ Éxito al subir vía ${protocolo.toUpperCase()}</b>`;
        } else {
            mensaje.innerHTML = `<b style="color: red;">❌ Error en el servidor (${response.status})</b>`;
        }
    } catch (error) {
        mensaje.innerHTML = `<b style="color: red;">❌ Error de conexión con la API</b>`;
        console.error("Error:", error);
    } finally {
        boton.disabled = false;
    }
}