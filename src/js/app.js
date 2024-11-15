// Definimos las actuaciones directamente en el código
const actuaciones = {
    "actuaciones": [
        {
            "dia": 10,
            "mes": 11,
            "anho": 2024,
            "nombre": "La Almudena",
            "horario": "11.00 am",
            "descripcion": "Celebración de la festividad de La Almudena."
        },
        {
            "dia": 14,
            "mes": 12,
            "anho": 2024,
            "nombre": "Panxoliñas",
            "horario": "11.00 am",
            "descripcion": "Actuación coral de Panxoliñas."
        },
        {
            "dia": 3,
            "mes": 3,
            "anho": 2025,
            "nombre": "Cumpleaños",
            "horario": "18.00 pm",
            "descripcion": "Fiesta de cumpleaños privada."
        }
    ]
};

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1; // Mes actual (1-12)

function displayCalendar() {
    const calendarElement = document.getElementById('calendar');
    const monthYearDisplay = document.getElementById('monthYearDisplay');
    calendarElement.innerHTML = '';

    // Mostrar el mes y año actual
    monthYearDisplay.innerText = `${getMonthName(currentMonth)} ${currentYear}`;

    // Mostrar días del mes actual
    const monthDays = new Date(currentYear, currentMonth, 0).getDate(); // Obtiene los días del mes
    const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay(); // Primer día del mes

    // Ajustar para que la semana comience en lunes
    const adjustedFirstDay = (firstDay === 0) ? 6 : firstDay - 1; // Ajustar: domingo (0) a sábado (6)

    // Crear espacios en blanco para los días que no pertenecen al mes
    for (let i = 0; i < adjustedFirstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty'; // Añadir clase para estilos
        calendarElement.appendChild(emptyDay);
    }

    // Mostrar los días del mes
    for (let day = 1; day <= monthDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.innerText = day;

        // Agregar eventos si existen para ese día
        actuaciones.actuaciones.forEach(event => {
            if (event.dia === day && event.mes === currentMonth && event.anho === currentYear) {
                const eventElement = document.createElement('div');
                eventElement.className = 'event';
                eventElement.innerText = `${event.nombre} - ${event.horario}`; // Nombre y horario del evento
                
                // Añadir un listener para mostrar detalles del evento cuando se haga clic
                eventElement.addEventListener('click', () => {
                    showEventInfo(event);
                });

                dayElement.appendChild(eventElement);
            }
        });

        calendarElement.appendChild(dayElement);
    }

    // Calcular cuántos días vacíos se necesitan para completar la última fila
    const totalDays = adjustedFirstDay + monthDays; // Días ocupados (vacíos + días del mes)
    const emptyDaysNeeded = (7 - (totalDays % 7)) % 7; // Días vacíos necesarios

    // Mostrar espacios en blanco para completar la última fila
    for (let i = 0; i < emptyDaysNeeded; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty'; // Añadir clase para estilos
        calendarElement.appendChild(emptyDay);
    }
}

// Función para mostrar la información del evento
function showEventInfo(event) {
    const eventInfoElement = document.getElementById('eventInfo');
    const rightElement = document.querySelector('.right');
    const leftElement = document.querySelector('.left');

    // Mostrar el contenedor con la clase 'active' y aplicar la clase a la izquierda
    rightElement.classList.add('active');
    leftElement.classList.remove('inactive'); // Remueve la clase de cerrado
    leftElement.classList.add('active'); // Añade la clase para expandir hacia la derecha

    // Mostrar la información del evento
    eventInfoElement.innerHTML = `
        <h2>${event.nombre}</h2>
        <p><strong>Fecha:</strong> ${event.dia}/${event.mes}/${event.anho}</p>
        <p><strong>Horario:</strong> ${event.horario}</p>
        <p><strong>Descripción:</strong> ${event.descripcion}</p>
        <button id="closeEventInfo">Cerrar</button> <!-- Botón para cerrar el cuadro -->
    `;

    // Añadir el listener al botón de cierre
    document.getElementById('closeEventInfo').addEventListener('click', closeEventInfo);
}

// Función para cerrar el cuadro de información
function closeEventInfo() {
    const rightElement = document.querySelector('.right');
    const leftElement = document.querySelector('.left');

    // Ocultar el cuadro de información
    rightElement.classList.remove('active');
    leftElement.classList.remove('active'); // Remover la clase de expansión
    leftElement.classList.add('inactive'); // Añadir la clase para reducir hacia la izquierda
}

function getMonthName(month) {
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return monthNames[month - 1];
}

// Manejo de los botones de navegación
document.getElementById('prevMonth').addEventListener('click', () => {
    if (currentMonth === 1) {
        currentMonth = 12;
        currentYear--;
    } else {
        currentMonth--;
    }
    displayCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    if (currentMonth === 12) {
        currentMonth = 1;
        currentYear++;
    } else {
        currentMonth++;
    }
    displayCalendar();
});

// Llamar a la función para mostrar el calendario inicialmente
displayCalendar();
