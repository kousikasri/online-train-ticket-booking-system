// Mock data for trains
const trains = [
    { id: "T101", name: "Express A", route: "City A -> City B", departure: "08:00 AM", seats: 10 },
    { id: "T102", name: "Express B", route: "City C -> City D", departure: "10:00 AM", seats: 5 },
    { id: "T103", name: "Express C", route: "City E -> City F", departure: "01:00 PM", seats: 8 },
];

// User tickets
let myTickets = [];

// Populate train list
function populateTrainList() {
    const trainTable = document.getElementById("train-table");
    trainTable.innerHTML = "";
    trains.forEach(train => {
        const row = `
            <tr>
                <td>${train.name}</td>
                <td>${train.route}</td>
                <td>${train.departure}</td>
                <td>${train.seats}</td>
            </tr>
        `;
        trainTable.innerHTML += row;
    });
}

// Show train list
function showTrainList() {
    document.getElementById("main-menu").classList.add("hidden");
    document.getElementById("train-list").classList.remove("hidden");
    populateTrainList();
}

// Populate train dropdown in booking form
function populateTrainDropdown() {
    const trainDropdown = document.getElementById("train-id");
    trainDropdown.innerHTML = "";
    trains.forEach(train => {
        if (train.seats > 0) {
            const option = `<option value="${train.id}">${train.name} (${train.route})</option>`;
            trainDropdown.innerHTML += option;
        }
    });
}

// Show booking section
function showBookingSection() {
    document.getElementById("main-menu").classList.add("hidden");
    document.getElementById("booking-section").classList.remove("hidden");
    populateTrainDropdown();
}

// Handle ticket booking
document.getElementById("booking-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const trainId = document.getElementById("train-id").value;
    const train = trains.find(t => t.id === trainId);

    if (train && train.seats > 0) {
        train.seats--;
        const ticket = {
            id: `T${Math.random().toString(36).substr(2, 9)}`,
            trainName: train.name,
            route: train.route,
            departure: train.departure,
        };
        myTickets.push(ticket);
        alert("Ticket booked successfully!");
        showTrainList();
    } else {
        alert("Failed to book ticket. No seats available.");
    }
});

// Show my tickets
function showMyTickets() {
    document.getElementById("main-menu").classList.add("hidden");
    document.getElementById("my-tickets").classList.remove("hidden");
    const ticketList = document.getElementById("ticket-list");
    ticketList.innerHTML = "";
    myTickets.forEach(ticket => {
        const listItem = `<li>
            <strong>Train:</strong> ${ticket.trainName}<br>
            <strong>Route:</strong> ${ticket.route}<br>
            <strong>Departure:</strong> ${ticket.departure}
        </li>`;
        ticketList.innerHTML += listItem;
    });
}

// Return to main menu
function returnToMainMenu() {
    document.getElementById("train-list").classList.add("hidden");
    document.getElementById("booking-section").classList.add("hidden");
    document.getElementById("my-tickets").classList.add("hidden");
    document.getElementById("main-menu").classList.remove("hidden");
}
