import { auth } from "../config/firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";;

const formCadastro = document.getElementById('form-cadastro');

formCadastro.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    await updateProfile(userCredential.user, { displayName: nome });
    alert(`Bem-vindo(a), ${nome}! Sua conta foi criada com sucesso.`);
    window.location.href = "login.html";
  } catch (error) {
    let mensagemErro = "Ocorreu um erro ao criar sua conta. Tente novamente.";
    if (error.code === 'auth/email-already-in-use') mensagemErro = "Este e-mail já está sendo utilizado por outra conta.";
    else if (error.code === 'auth/weak-password') mensagemErro = "A senha é muito fraca. Use pelo menos 6 caracteres.";
    else if (error.code === 'auth/invalid-email') mensagemErro = "O e-mail informado não é válido.";
    alert(mensagemErro);
  }
});
