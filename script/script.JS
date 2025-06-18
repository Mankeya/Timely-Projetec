 lucide.createIcons();
  if (window.lucide) {
    lucide.createIcons();
  }


document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-dark");

  // Verifica se tem um tema salvo no localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
    toggleBtn.textContent = "🌞";
  } else {
    toggleBtn.textContent = "🌙";
  }

  // Botão de alternância
  toggleBtn.addEventListener("click", () => {
    const html = document.documentElement;
    html.classList.toggle("dark");

    const isDark = html.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggleBtn.textContent = isDark ? "🌞" : "🌙";
  });
});
