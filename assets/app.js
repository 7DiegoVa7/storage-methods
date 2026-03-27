async function subirArchivo(protocolo) {
  const fileInput = document.getElementById('filePicker');
  const mensaje   = document.getElementById('mensaje');
  const boton     = document.getElementById('btnEnviar');

  if (fileInput.files.length === 0) {
    alert('Por favor, selecciona un archivo.');
    return;
  }

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  mensaje.className = '';
  mensaje.innerText = 'Enviando...';
  boton.disabled = true;

  try {
    const response = await fetch(`http://127.0.0.1:8000/upload/${protocolo}`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      mensaje.className = 'success';
      mensaje.innerText = `✦ Archivo enviado correctamente vía ${protocolo.toUpperCase()}`;
    } else {
      mensaje.className = 'error';
      mensaje.innerText = `✦ Error del servidor (${response.status})`;
    }
  } catch (error) {
    mensaje.className = 'error';
    mensaje.innerText = '✦ Sin conexión con la API';
    console.error('Error:', error);
  } finally {
    boton.disabled = false;
  }
}