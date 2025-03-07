// Combine the data from both guitar files into a single array
const guitarData = {
  guitars: [
    ...acousticGuitars["acoustic-guitars"],
    ...classicalGuitars.guitars
  ]
};

// Function to populate the table with guitar data
function populateTable(filteredGuitars) {
  const tableBody = document.getElementById('guitar-table-body');
  tableBody.innerHTML = '';

  filteredGuitars.forEach(guitar => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${guitar.brand}</td>
      <td>${guitar.model}</td>
      <td>${guitar.type}</td>
      <td>$${guitar.purchase_price}</td>
      <td>$${guitar.rental.full_day}</td>
      <td>$${guitar.rental.weekly}</td>
      <td>$${guitar.rental.monthly}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to populate the model dropdown based on the selected type
function populateModelDropdown(filteredGuitars) {
  const modelSelect = document.getElementById('guitar-model');
  // Clear all options except the first one
  modelSelect.innerHTML = '<option value="">-- Select a model --</option>';

  filteredGuitars.forEach(guitar => {
    const option = document.createElement('option');
    option.value = `${guitar.brand}-${guitar.model}`;
    option.textContent = `${guitar.brand} ${guitar.model} (${guitar.type})`;
    modelSelect.appendChild(option);
  });
}

// Function to filter guitars based on the selected type
function filterGuitars() {
  const guitarType = document.getElementById('guitar-type').value;
  let filteredGuitars = [];

  if (guitarType === 'all') {
    filteredGuitars = guitarData.guitars;
  } else if (guitarType === 'acoustic') {
    filteredGuitars = guitarData.guitars.filter(guitar => guitar.type.includes('Acoustic'));
  } else if (guitarType === 'classical') {
    filteredGuitars = guitarData.guitars.filter(guitar => guitar.type.includes('Classical'));
  }

  populateTable(filteredGuitars);
  populateModelDropdown(filteredGuitars);

  // Clear the guitar details
  document.getElementById('guitar-details').style.display = 'none';
}

// Function to show details for the selected guitar model
function showGuitarDetails() {
  const modelValue = document.getElementById('guitar-model').value;
  const detailsDiv = document.getElementById('guitar-details');

  if (!modelValue) {
    detailsDiv.style.display = 'none';
    return;
  }

  const [brand, model] = modelValue.split('-');
  const selectedGuitar = guitarData.guitars.find(
    guitar => guitar.brand === brand && guitar.model === model
  );

  if (selectedGuitar) {
    detailsDiv.innerHTML = `
      <h3>${selectedGuitar.brand} ${selectedGuitar.model}</h3>
      <p><strong>Type:</strong> ${selectedGuitar.type}</p>
      <p><strong>Purchase Price:</strong> $${selectedGuitar.purchase_price}</p>
      <p><strong>Rental Options:</strong></p>
      <ul>
        <li>Daily: $${selectedGuitar.rental.full_day}</li>
        <li>Weekly: $${selectedGuitar.rental.weekly}</li>
        <li>Monthly: $${selectedGuitar.rental.monthly}</li>
      </ul>
    `;
    detailsDiv.style.display = 'block';
  } else {
    detailsDiv.style.display = 'none';
  }
}

// Make sure to call this function at page load
document.addEventListener('DOMContentLoaded', function () {
  // Initialize the table with all guitars
  populateTable(guitarData.guitars);
  // Initialize the dropdown with all guitars
  populateModelDropdown(guitarData.guitars);
});