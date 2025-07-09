import { auth } from "../config/firebase.js";

export function requireAuth(redirectUrl = "login.html") {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = redirectUrl;
    }
  });
}
