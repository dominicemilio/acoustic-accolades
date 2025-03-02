document.addEventListener("DOMContentLoaded", () => {
  // Create the dark mode button
  const darkModeBtn = document.createElement("button");
  darkModeBtn.id = "dark-mode-toggle";
  darkModeBtn.textContent = "🌙 Dark Mode";

  // Append the button to the header (or a specific container)
  const header = document.querySelector("header");
  header.appendChild(darkModeBtn);

  // Apply dark mode if previously selected
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeBtn.textContent = "☀️ Light Mode";
  }

  // Toggle Dark Mode
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save preference to localStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
      darkModeBtn.textContent = "☀️ Light Mode";
    } else {
      localStorage.setItem("darkMode", "disabled");
      darkModeBtn.textContent = "🌙 Dark Mode";
    }
  });
});
