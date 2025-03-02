document.addEventListener("DOMContentLoaded", () => {
  // Create the dark mode button
  const darkModeBtn = document.createElement("button");
  darkModeBtn.id = "dark-mode-toggle";
  darkModeBtn.textContent = "🌙 Dark Mode";

  // Append the button to the header
  const header = document.querySelector("header");
  header.appendChild(darkModeBtn);

  // Function to update logo visibility
  function updateLogoVisibility(darkModeEnabled) {
    const lightLogos = document.querySelectorAll(".light-logo");
    const darkLogos = document.querySelectorAll(".dark-logo");

    lightLogos.forEach(logo => {
      logo.style.display = darkModeEnabled ? "none" : "block";
    });

    darkLogos.forEach(logo => {
      logo.style.display = darkModeEnabled ? "block" : "none";
    });
  }

  // Function to update element styles
  function updateElementStyles(darkModeEnabled) {
    const sections = document.querySelectorAll('main section');
    const articles = document.querySelectorAll('main article');
    const paragraphs = document.querySelectorAll('main p');
    const headings = document.querySelectorAll('main h2');

    sections.forEach(section => {
      section.style.backgroundColor = darkModeEnabled ? '#333' : '';
    });

    articles.forEach(article => {
      article.style.backgroundColor = darkModeEnabled ? '#444' : '';
    });

    paragraphs.forEach(paragraph => {
      paragraph.style.color = darkModeEnabled ? 'white' : '';
    });

    headings.forEach(heading => {
      heading.style.color = darkModeEnabled ? 'white' : '';
    });
  }

  // Function to apply zebra striping to table headers
  function updateTableHeaders(darkModeEnabled) {
    const tableHeaders = document.querySelectorAll('.pricing-container-acoustic table thead tr th');

    tableHeaders.forEach((header, index) => {
      if (darkModeEnabled) {
        header.style.backgroundColor = index % 2 === 0 ? '#333' : '#444';
        header.style.color = 'white';
      } else {
        header.style.backgroundColor = '';
        header.style.color = '';
      }
    });
  }

  // Function to apply zebra striping to table rows and cells
  function updateTableRows(darkModeEnabled) {
    const tableRows = document.querySelectorAll('.pricing-container-acoustic table tbody tr');

    tableRows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td');
      cells.forEach((cell, cellIndex) => {
        if (darkModeEnabled) {
          // Zebra striping for rows
          row.style.backgroundColor = rowIndex % 2 === 0 ? '#333' : '#444';
          // Zebra striping for cells (alternating within row)
          cell.style.backgroundColor = cellIndex % 2 === 0 ? '#444' : '#333';
          cell.style.color = 'white';
        } else {
          row.style.backgroundColor = '';
          cell.style.backgroundColor = '';
          cell.style.color = '';
        }
      });
    });
  }

  // Apply dark mode if previously selected
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeBtn.textContent = "☀️ Light Mode";
    updateLogoVisibility(true);
    updateElementStyles(true);
    updateTableHeaders(true);
    updateTableRows(true);
  } else {
    updateLogoVisibility(false);
    updateElementStyles(false);
    updateTableHeaders(false);
    updateTableRows(false);
  }

  // Toggle Dark Mode
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save preference to localStorage and update styles
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      darkModeBtn.textContent = "☀️ Light Mode";
      updateLogoVisibility(true);
      updateElementStyles(true);
      updateTableHeaders(true);
      updateTableRows(true);
    } else {
      localStorage.setItem("darkMode", "disabled");
      darkModeBtn.textContent = "🌙 Dark Mode";
      updateLogoVisibility(false);
      updateElementStyles(false);
      updateTableHeaders(false);
      updateTableRows(false);
    }
  });
});