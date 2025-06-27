document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('avatarButton');
  const dropdown = document.getElementById('userDropdown');

  let isOpen = false;

  btn.addEventListener('click', () => {
    if (!isOpen) {
      dropdown.classList.remove('hidden');
      setTimeout(() => {
        dropdown.classList.add('opacity-100', 'scale-100');
        dropdown.classList.remove('opacity-0', 'scale-95');
      }, 10);
      isOpen = true;
    } else {
      dropdown.classList.remove('opacity-100', 'scale-100');
      dropdown.classList.add('opacity-0', 'scale-95');
      setTimeout(() => {
        dropdown.classList.add('hidden');
      }, 200);
      isOpen = false;
    }
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (
      isOpen &&
      !btn.contains(e.target) &&
      !dropdown.contains(e.target)
    ) {
      dropdown.classList.remove('opacity-100', 'scale-100');
      dropdown.classList.add('opacity-0', 'scale-95');
      setTimeout(() => {
        dropdown.classList.add('hidden');
      }, 200);
      isOpen = false;
    }
  });
});
