import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCbCA5WUoYCB7sHVLikZeNbQkhgb5gexCY",
  authDomain: "sincrotask-7818a.firebaseapp.com",
  projectId: "sincrotask-7818a",
  storageBucket: "sincrotask-7818a.firebasestorage.app",
  messagingSenderId: "1095648141500",
  appId: "1:1095648141500:web:b8ce52306f6eba58b2b0b9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 4. SELETORES DOS ELEMENTOS
const loginForm = document.getElementById('login-form'); // ID formulário
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('senha');
const feedbackMessage = document.getElementById('feedback-message');
const googleSignInBtn = document.getElementById('google-signin-btn');

// 5. LÓGICA DE LOGIN QUANDO O FORMULÁRIO É ENVIADO
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Previne o recarregamento da página

  // Limpa mensagens de erro antigas
  feedbackMessage.textContent = ''; 
  feedbackMessage.style.color = 'red';

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    // Tenta fazer o login do usuário com a função do Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("Login bem-sucedido!", user);

    // Mostra mensagem de sucesso
    feedbackMessage.style.color = 'green';
    feedbackMessage.textContent = 'Login bem-sucedido! Redirecionando...';

    // Aguarda um instante para o usuário ler a mensagem e depois redireciona
    setTimeout(() => {
      window.location.href = "dashbord.html";
    }, 1500); // 1.5 segundos de espera

  } catch (error) {
    console.error("Erro no login:", error.code, error.message);
    
    // Mostra uma mensagem de erro genérica e segura na tela
    feedbackMessage.textContent = 'E-mail ou senha incorretos. Tente novamente.';
  }
});
// LÓGICA DE LOGIN COM GOOGLE
  googleSignInBtn.addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  feedbackMessage.textContent = '';
  feedbackMessage.style.color = 'red';

  try {
    // Abre o Pop-up de login do Google
    const result = await signInWithPopup(auth, provider);
    
    const user = result.user;
    console.log("Login com Google bem-sucedido!", user);

    feedbackMessage.style.color = 'green';
    feedbackMessage.textContent = `Login com Google bem-sucedido! Redirecionando...`;

    // Redireciona após o sucesso
    setTimeout(() => {
      window.location.href = "dashbord.html"; 
    }, 1500);

  } catch (error) {
    console.error("Erro no login com Google:", error);
    // Erros comuns a tratar: o usuário fechou o popup, a conta já existe com outra credencial, etc.
    if (error.code === 'auth/popup-closed-by-user') {
        feedbackMessage.textContent = 'A janela de login foi fechada antes da conclusão.';
    } else {
        feedbackMessage.textContent = 'Ocorreu um erro ao tentar fazer login com o Google.';
    }
  }
});