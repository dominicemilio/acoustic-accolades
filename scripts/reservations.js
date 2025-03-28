let allGuitars = [];

function fetchGuitars() {
  fetch('data/guitars.json')
    .then(response => response.json())
    .then(data => {
      allGuitars = data.guitars;
      populateTable(allGuitars);
      populateGuitarDropdown(allGuitars);
    })
    .catch(error => console.error('Error loading guitar data:', error));
}

function populateTable(guitars) {
  const tableBody = document.getElementById('guitar-table-body');
  if (!tableBody) {
    console.error('Error: Element with ID "guitar-table-body" not found in the DOM.');
    return;
  }
  tableBody.innerHTML = '';
  guitars.forEach(guitar => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${guitar.brand}</td>
      <td>${guitar.model}</td>
      <td>${guitar.type}</td>
      <td>$${guitar.rental.full_day}</td>
      <td>$${guitar.rental.weekly}</td>
    `;
    tableBody.appendChild(row);
  });
}

function populateGuitarDropdown(guitars) {
  const selectedGuitarSelect = document.getElementById('selected-guitar');
  if (!selectedGuitarSelect) {
    console.error('Error: Element with ID "selected-guitar" not found in the DOM.');
    return;
  }
  selectedGuitarSelect.innerHTML = '<option value="">-- Select a guitar --</option>';
  guitars.forEach(guitar => {
    const option = document.createElement('option');
    option.value = `${guitar.brand}-${guitar.model}`;
    option.textContent = `${guitar.brand} ${guitar.model} (${guitar.type}) - $${guitar.rental.full_day}/day`;
    selectedGuitarSelect.appendChild(option);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  fetchGuitars();

  const today = new Date();
  const currentYear = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayString = `${currentYear}-${mm}-${dd}`;
  const rentalDateInput = document.getElementById('rental-date');
  if (rentalDateInput) {
    rentalDateInput.min = todayString;
  }

  const dropoffCheckbox = document.getElementById('dropoff');
  const dropoffLocationContainer = document.getElementById('dropoff-location-container');

  if (dropoffCheckbox) {
    dropoffCheckbox.addEventListener('change', function () {
      if (dropoffLocationContainer) {
        dropoffLocationContainer.style.display = this.checked ? 'block' : 'none';
        if (!this.checked && document.getElementById('dropoff-location')) {
          document.getElementById('dropoff-location').value = '';
        }
      }
    });
  }

  const guitarModelSelect = document.getElementById('selected-guitar');

  const rentalForm = document.getElementById('rental-form');

  if (rentalForm) {
    rentalForm.addEventListener('submit', function (event) {
      event.preventDefault();

      alert('Thank you for your reservation! We will contact you shortly to confirm your booking.');

      rentalForm.reset();
      if (dropoffLocationContainer) {
        dropoffLocationContainer.style.display = 'none';
      }
    });
  }
});
