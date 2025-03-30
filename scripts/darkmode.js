document.addEventListener("DOMContentLoaded", () => {
  const darkModeBtn = document.createElement("button");
  darkModeBtn.id = "dark-mode-toggle";
  darkModeBtn.textContent = "🌙 Dark Mode";

  const header = document.querySelector("header");
  header.appendChild(darkModeBtn);

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

  function updateTable(tableSelector, darkModeEnabled) {
    const table = document.querySelector(tableSelector);

    if (!table) return;

    if (darkModeEnabled) {
      table.style.color = 'white';
      table.style.borderColor = '#555';
    } else {
      table.style.color = '';
      table.style.borderColor = '';
    }

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

    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row, rowIndex) => {
      const rowColor = darkModeEnabled ? (rowIndex % 2 === 0 ? '#333' : '#444') : '';
      row.style.backgroundColor = rowColor;

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

  function applyDarkModeToTables() {
    if (document.body.classList.contains("dark-mode")) {
      updateTable('.pricing-container-acoustic table', true);
      updateTable('.pricing-container-classical table', true);
    }
  }

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

  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

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

  window.addEventListener('load', applyDarkModeToTables);

  window.applyDarkModeToTables = applyDarkModeToTables;
});