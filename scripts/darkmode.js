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

  // Function to apply dark mode to the entire table
  function updateTable(tableSelector, darkModeEnabled) {
    // Target the specific table
    const table = document.querySelector(tableSelector);

    if (!table) return; // Exit if table not found

    // Apply styles to the table itself
    if (darkModeEnabled) {
      table.style.color = 'white';
      table.style.borderColor = '#555';
    } else {
      table.style.color = '';
      table.style.borderColor = '';
    }

    // Style the headers
    const headers = table.querySelectorAll('thead th');
    headers.forEach((header, index) => {
      if (darkModeEnabled) {
        header.style.backgroundColor = index % 2 === 0 ? '#333' : '#444';
        header.style.color = 'white';
        header.style.borderColor = '#555';
      } else {
        header.style.backgroundColor = '';
        header.style.color = '';
        header.style.borderColor = '';
      }
    });

    // Style the rows with zebra striping
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row, rowIndex) => {
      const rowColor = darkModeEnabled ? (rowIndex % 2 === 0 ? '#333' : '#444') : '';
      row.style.backgroundColor = rowColor;

      // Style each cell in the row
      const cells = row.querySelectorAll('td');
      cells.forEach(cell => {
        if (darkModeEnabled) {
          cell.style.backgroundColor = rowColor;
          cell.style.color = 'white';
          cell.style.borderColor = '#555';
        } else {
          cell.style.backgroundColor = '';
          cell.style.color = '';
          cell.style.borderColor = '';
        }
      });
    });
  }

  // Function to apply dark mode to all tables that can be called after data is loaded
  function applyDarkModeToTables() {
    if (document.body.classList.contains("dark-mode")) {
      updateTable('.pricing-container-acoustic table', true);
      updateTable('.pricing-container-classical table', true);
    }
  }

  // Apply dark mode if previously selected
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeBtn.textContent = "☀️ Light Mode";
    updateLogoVisibility(true);
    updateElementStyles(true);
    updateTable('.pricing-container-acoustic table', true);
    updateTable('.pricing-container-classical table', true);
  } else {
    updateLogoVisibility(false);
    updateElementStyles(false);
    updateTable('.pricing-container-acoustic table', false);
    updateTable('.pricing-container-classical table', false);
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
      updateTable('.pricing-container-acoustic table', true);
      updateTable('.pricing-container-classical table', true);
    } else {
      localStorage.setItem("darkMode", "disabled");
      darkModeBtn.textContent = "🌙 Dark Mode";
      updateLogoVisibility(false);
      updateElementStyles(false);
      updateTable('.pricing-container-acoustic table', false);
      updateTable('.pricing-container-classical table', false);
    }
  });

  // Add event listener to ensure table styling is applied after data is loaded
  window.addEventListener('load', applyDarkModeToTables);

  // Expose this function globally if needed:
  window.applyDarkModeToTables = applyDarkModeToTables;
});