document.addEventListener('DOMContentLoaded', () => {
      // Toggle do modo escuro
      const toggleDarkButton = document.getElementById('toggle-dark');
      toggleDarkButton.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
      });

      // Elementos do formulário
      const form = document.getElementById('formUsuario');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('senha');
      const emailError = document.getElementById('email-error');
      const formFeedback = document.getElementById('form-feedback');
      
      // Validação de Email em tempo real
      emailInput.addEventListener('input', () => {
        if (emailInput.validity.typeMismatch || emailInput.value === "") {
          emailError.classList.remove('hidden');
        } else {
          emailError.classList.add('hidden');
        }
      });
      
      // Toggle de visibilidade da senha
      const togglePasswordButton = document.getElementById('toggle-password');
      const passwordIcon = togglePasswordButton.querySelector('i');
      togglePasswordButton.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        passwordIcon.classList.toggle('fa-eye');
        passwordIcon.classList.toggle('fa-eye-slash');
      });

      // Validação de força da senha
      const strengthIndicator = document.getElementById('password-strength-indicator');
      const strengthText = document.getElementById('password-strength-text');
      passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        let width = (score / 5) * 100;
        let color = 'bg-red-500';
        let text = 'Fraca';

        if (score >= 3) {
            color = 'bg-yellow-500';
            text = 'Média';
        }
        if (score >= 4) {
            color = 'bg-green-500';
            text = 'Forte';
        }
        if (password.length === 0) {
            width = 0;
            text = '';
        }

        strengthIndicator.style.width = `${width}%`;
        strengthIndicator.className = `password-strength-bar ${color} rounded-full`;
        strengthText.textContent = text;
      });

      // Envio do formulário
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = emailInput.value;
        const senha = passwordInput.value;

        // Limpa feedback anterior e mostra loading
        formFeedback.textContent = 'Enviando...';
        formFeedback.className = 'mt-4 text-center text-sm text-gray-500';

        try {
          // Simulação de chamada à API
          const res = await fetch('/api/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
          });

          if (!res.ok) {
            // Se a resposta da API não for 'ok', tenta pegar o erro do corpo
            const errorData = await res.json().catch(() => ({ erro: 'Erro de comunicação com o servidor.' }));
            throw new Error(errorData.erro || `HTTP error! status: ${res.status}`);
          }
          
          const data = await res.json();

          if (data.sucesso) {
            formFeedback.textContent = 'Usuário cadastrado com sucesso! Redirecionando...';
            formFeedback.className = 'mt-4 text-center text-sm text-green-500';
            // Opcional: redirecionar para a página de login ou dashboard
            setTimeout(() => window.location.href = 'login.html', 2000); 
          } else {
            // Erro vindo da lógica de negócio da API
            throw new Error(data.erro);
          }

        } catch (error) {
          // Captura erros de rede ou os erros lançados acima
          formFeedback.textContent = `Erro: ${error.message}`;
          formFeedback.className = 'mt-4 text-center text-sm text-red-500';
        }
      });
    });