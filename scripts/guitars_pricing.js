function loadGuitarPrices(jsonFilePath, guitarType) {
  fetch(jsonFilePath)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('guitar-table-body');
      if (!tableBody) {
        console.error('Error: Element with ID "guitar-table-body" not found in the DOM.');
        return;
      }
      data.guitars.filter(guitar => guitar.type.includes(guitarType)).forEach(guitar => {
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
    })
    .catch(error => console.error(`Error loading JSON from ${jsonFilePath}:`, error));
}

const currentPage = window.location.pathname.split('/').pop();

if (currentPage === 'acoustic.html') {
  loadGuitarPrices('data/guitars.json', 'Acoustic');
} else if (currentPage === 'classical.html') {
  loadGuitarPrices('data/guitars.json', 'Classical');
}
