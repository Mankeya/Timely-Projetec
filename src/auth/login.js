import { auth } from "../config/firebase.js";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('senha');
const feedbackMessage = document.getElementById('feedback-message');
const googleSignInBtn = document.getElementById('google-signin-btn');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  feedbackMessage.textContent = '';
  feedbackMessage.style.color = 'red';

  try {
    const userCredential = await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    feedbackMessage.style.color = 'green';
    feedbackMessage.textContent = 'Login bem-sucedido! Redirecionando...';
    setTimeout(() => window.location.href = "dashboard.html", 1500);
  } catch (error) {
    feedbackMessage.textContent = 'E-mail ou senha incorretos. Tente novamente.';
  }
});

googleSignInBtn.addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  feedbackMessage.textContent = '';
  feedbackMessage.style.color = 'red';

  try {
    await signInWithPopup(auth, provider);
    feedbackMessage.style.color = 'green';
    feedbackMessage.textContent = 'Login com Google bem-sucedido! Redirecionando...';
    setTimeout(() => window.location.href = "dashboard.html", 1500);
  } catch (error) {
    feedbackMessage.textContent = error.code === 'auth/popup-closed-by-user' 
      ? 'A janela de login foi fechada antes da conclusão.' 
      : 'Ocorreu um erro ao tentar fazer login com o Google.';
  }
});
