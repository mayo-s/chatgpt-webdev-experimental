// Sample participant data
const participants = [
    { name: "John Doe", location: "" },
    { name: "Jane Smith", location: "" },
    { name: "Alex Johnson", location: "" },
    // Add more participants as needed
  ];
  
  // Function to update the participant's location
  function updatePresence() {
    const locationSelect = document.getElementById("location");
    const location = locationSelect.value;
    const participantTable = document.getElementById("participants");
  
    // Update the participant data and table
    participants.forEach(participant => {
      participant.location = location;
    });
  
    // Clear the existing table rows
    participantTable.getElementsByTagName("tbody")[0].innerHTML = "";
  
    // Re-populate the table rows with updated participant data
    participants.forEach(participant => {
      const row = participantTable.insertRow();
      const nameCell = row.insertCell(0);
      const locationCell = row.insertCell(1);
  
      nameCell.textContent = participant.name;
      locationCell.textContent = participant.location;
    });
  }
  