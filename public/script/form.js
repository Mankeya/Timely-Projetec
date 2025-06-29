import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

const formCadastro = document.getElementById('form-cadastro');

formCadastro.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Pega os valores dos 3 campos do seu formulário
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  console.log("Tentando cadastrar:", nome, email); // Log para depuração

  try {
    // --- PASSO 1: CRIAR O USUÁRIO COM E-MAIL E SENHA ---
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;
    console.log("Usuário criado com e-mail e senha:", user.uid);

    // --- PASSO 2: ATUALIZAR O PERFIL COM O NOME ---
    await updateProfile(user, {
      displayName: nome
    });
    console.log("Perfil do usuário atualizado com o nome:", nome);
    
    // Feedback de sucesso para o usuário
    alert(`Bem-vindo(a), ${nome}! Sua conta foi criada com sucesso.`);
    
    // Redireciona para pagina de login
    window.location.href = "login.html";

  } catch (error) {
    // Tratamento de erros mais detalhado
    console.error("Erro no processo de cadastro:", error);
    let mensagemErro = "Ocorreu um erro ao criar sua conta. Tente novamente.";
    
    if (error.code === 'auth/email-already-in-use') {
      mensagemErro = "Este e-mail já está sendo utilizado por outra conta.";
    } else if (error.code === 'auth/weak-password') {
      mensagemErro = "A senha é muito fraca. Por favor, utilize pelo menos 6 caracteres.";
    } else if (error.code === 'auth/invalid-email') {
        mensagemErro = "O e-mail informado não é válido.";
    }

    alert(mensagemErro);
  }
});