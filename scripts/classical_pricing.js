fetch('data/classical_prices.json')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById('guitar-table-body');
    data.guitars.filter(guitar => guitar.type.includes('Classical')).forEach(guitar => {
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
  })
  .catch(error => console.error('Error loading JSON:', error));
