document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const btn = document.getElementById('btnLogin');

  // Mostra loading
  btn.disabled = true;
  btn.innerHTML = `
    <svg aria-hidden="true" class="w-4 h-4 animate-spin text-white" viewBox="0 0 100 101" fill="none">
      <path d="M100 50.5908..." fill="currentColor"/>
      <path d="M93.9676 39.0409..." fill="currentFill"/>
    </svg>
    Entrando...
  `;

  // Aguarde o fetch ou lógica de login
  try {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (data.sucesso) {
      localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario));
      window.location.href = 'dashboard.html';
    } else {
      alert('Erro: ' + data.erro);
    }

  } catch (err) {
    console.error(err);
    alert('Erro na requisição.');
  } finally {
    // Se quiser restaurar o botão:
    btn.disabled = false;
    btn.innerHTML = 'Entrar';
  }
});