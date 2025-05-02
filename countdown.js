// Función para mostrar los días
function showDays() {
    const daysElement = document.getElementById('days');
    if (daysElement) {
        daysElement.textContent = '31';
    }
}

// Ejecutar cuando se carga la página
document.addEventListener('DOMContentLoaded', showDays); 