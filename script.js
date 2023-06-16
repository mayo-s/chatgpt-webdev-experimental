// Constants
const participantForm = document.getElementById("participant-form");
const locationSelect = document.getElementById("location-select");
const participantsTable = document.getElementById("participants-table");
const participantsJsonFile = "participants.json";

// Load participants from JSON file
window.addEventListener("DOMContentLoaded", loadParticipants);

// Event listener for form submission
participantForm.addEventListener("submit", addParticipant);

// Function to load participants from JSON file
async function loadParticipants() {
  try {
    const response = await fetch(participantsJsonFile);
    const participants = await response.json();
    participants.forEach((participant) => {
      const participantRow = createParticipantRow(participant.name, participant.location, participant.date, participant.time);
      participantsTable.appendChild(participantRow);
    });
  } catch (error) {
    console.error("Failed to load participants:", error);
  }
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Function to add a participant
function addParticipant(event) {
  event.preventDefault();

  // Get input values
  const nameInput = document.getElementById("name-input");
  const location = locationSelect.value;
  const name = nameInput.value.trim();
  const date = dateInput.value;
  const time = timeInput.value;
  const currentDate = new Date();
  const currentTime = new Date();
  const dateInput = document.getElementById("date-input");
  const timeInput = document.getElementById("time-input");

  dateInput.value = formatDate(currentDate);
  timeInput.value = formatTime(currentTime);

  // Validate input
  if (name === "") {
    alert("Please enter a name.");
    return;
  }

  // Create participant row
  const participantRow = createParticipantRow(name, location, date, time);

  // Add participant row to table
  participantsTable.appendChild(participantRow);

  // Clear form inputs
  nameInput.value = "";
  dateInput.value = "";
  timeInput.value = "";

  // Save participants to JSON file
  saveParticipantsToFile();
}

// Function to create a participant row
function createParticipantRow(name, location, date, time) {
  const participantRow = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = name;
  participantRow.appendChild(nameCell);

  const locationCell = document.createElement("td");
  locationCell.textContent = location;
  participantRow.appendChild(locationCell);

  const dateCell = document.createElement("td");
  dateCell.textContent = date;
  participantRow.appendChild(dateCell);

  const timeCell = document.createElement("td");
  timeCell.textContent = time;
  participantRow.appendChild(timeCell);

  // Highlight name in green
  if (name.toLowerCase() === "mario") {
    nameCell.classList.add("highlight-green");
  }

  return participantRow;
}

// Function to save participants to JSON file
async function saveParticipantsToFile() {
  const participantRows = participantsTable.querySelectorAll("tr");
  const participants = [];

  participantRows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const name = cells[0].textContent;
    const location = cells[1].textContent;
    const date = cells[2].textContent;
    const time = cells[3].textContent;

    participants.push({ name, location, date, time });
  });

  try {
    const jsonData = JSON.stringify(participants);
    await fetch(participantsJsonFile, {
      method: "PUT",
      body: jsonData,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to update the JSON file:", error);
  }
}
