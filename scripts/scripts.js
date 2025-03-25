const guitarData = {
  guitars: [
    ...acousticGuitars["acoustic-guitars"],
    ...classicalGuitars.guitars
  ]
};

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

function populateModelDropdown(filteredGuitars) {
  const modelSelect = document.getElementById('guitar-model');
  modelSelect.innerHTML = '<option value="">-- Select a model --</option>';

  filteredGuitars.forEach(guitar => {
    const option = document.createElement('option');
    option.value = `${guitar.brand}-${guitar.model}`;
    option.textContent = `${guitar.brand} ${guitar.model} (${guitar.type})`;
    modelSelect.appendChild(option);
  });
}

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

  document.getElementById('guitar-details').style.display = 'none';
}

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

document.addEventListener('DOMContentLoaded', function () {
  populateTable(guitarData.guitars);
  populateModelDropdown(guitarData.guitars);
});