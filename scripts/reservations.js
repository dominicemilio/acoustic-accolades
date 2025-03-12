const acousticGuitars = [
  {
    "brand": "Gibson",
    "model": "Dove",
    "type": "Acoustic 6-string",
    "purchase_price": 3499,
    "rental": {
      "full_day": 50,
      "weekly": 300,
      "monthly": 1000
    }
  },
  {
    "brand": "Gibson",
    "model": "SJ-200",
    "type": "Acoustic 12-string",
    "purchase_price": 5299,
    "rental": {
      "full_day": 70,
      "weekly": 420,
      "monthly": 1400
    }
  },
  {
    "brand": "Martin",
    "model": "D50",
    "type": "Acoustic 6-string",
    "purchase_price": 3999,
    "rental": {
      "full_day": 55,
      "weekly": 330,
      "monthly": 1100
    }
  },
  {
    "brand": "Martin",
    "model": "J16e",
    "type": "Acoustic 12-string",
    "purchase_price": 4599,
    "rental": {
      "full_day": 65,
      "weekly": 390,
      "monthly": 1300
    }
  },
  {
    "brand": "Taylor",
    "model": "815e",
    "type": "Acoustic 6-string",
    "purchase_price": 3299,
    "rental": {
      "full_day": 45,
      "weekly": 270,
      "monthly": 900
    }
  },
  {
    "brand": "Taylor",
    "model": "855e",
    "type": "Acoustic 12-string",
    "purchase_price": 4699,
    "rental": {
      "full_day": 60,
      "weekly": 360,
      "monthly": 1200
    }
  }
];

const classicalGuitars = [
  {
    "brand": "Cordoba",
    "model": "Esteso",
    "type": "Classical 6-string",
    "purchase_price": 2999,
    "rental": {
      "full_day": 40,
      "weekly": 240,
      "monthly": 800
    }
  },
  {
    "brand": "Cordoba",
    "model": "Friederich",
    "type": "Classical 6-string",
    "purchase_price": 3899,
    "rental": {
      "full_day": 55,
      "weekly": 330,
      "monthly": 1100
    }
  },
  {
    "brand": "Ramirez",
    "model": "Centenario",
    "type": "Classical 6-string",
    "purchase_price": 5199,
    "rental": {
      "full_day": 70,
      "weekly": 420,
      "monthly": 1400
    }
  },
  {
    "brand": "Ramirez",
    "model": "Legado",
    "type": "Classical 6-string",
    "purchase_price": 29999,
    "rental": {
      "full_day": 410,
      "weekly": 2460,
      "monthly": 8200
    }
  },
  {
    "brand": "Takamine",
    "model": "GC5-NAT",
    "type": "Classical 6-string",
    "purchase_price": 1199,
    "rental": {
      "full_day": 30,
      "weekly": 180,
      "monthly": 600
    }
  },
  {
    "brand": "Takamine",
    "model": "GC6E-NAT",
    "type": "Classical 6-string",
    "purchase_price": 1699,
    "rental": {
      "full_day": 35,
      "weekly": 210,
      "monthly": 700
    }
  }
];

const guitarData = {
  guitars: [
    ...acousticGuitars,
    ...classicalGuitars
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