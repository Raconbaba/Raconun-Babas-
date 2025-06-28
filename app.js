import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAnw_JgoA7ZrVCG94pRc-KExFu2v7SenYw",
  authDomain: "raconubabasi.firebaseapp.com",
  projectId: "raconubabasi",
  storageBucket: "raconubabasi.firebasestorage.app",
  messagingSenderId: "14034844570",
  appId: "1:14034844570:web:2c1dc1a596218e8d7e9823",
  measurementId: "G-L5WBB2BYYJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const btnLogout = document.getElementById("btnLogout");
const userDisplay = document.getElementById("userDisplay");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const authForm = document.getElementById("authForm");
const modalClose = document.getElementById("modalClose");
const usernameInput = document.getElementById("usernameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const submitBtn = authForm.querySelector(".submit-btn");

let currentMode = null; // "login" veya "register"

function showNotification(text) {
  notification.textContent = text;
  notification.classList.remove("hidden");
  setTimeout(() => notification.classList.add("hidden"), 2500);
}

function openModal(mode) {
  currentMode = mode;
  modalTitle.textContent = mode === "login" ? "Giriş Yap" : "Üye Ol";
  submitBtn.textContent = mode === "login" ? "Giriş Yap" : "Kayıt Ol";
  if (mode === "register") {
    usernameInput.classList.remove("hidden");
    usernameInput.required = true;
    passwordInput.placeholder = "Şifre (en az 6 karakter)";
  } else {
    usernameInput.classList.add("hidden");
    usernameInput.required = false;
    passwordInput.placeholder = "Şifre";
  }
  emailInput.value = "";
  passwordInput.value = "";
  usernameInput.value = "";
  modal.classList.remove("hidden");
  emailInput.focus();
}

function closeModal() {
  modal.classList.add("hidden");
}

btnLogin.addEventListener("click", () => openModal("login"));
btnRegister.addEventListener("click", () => openModal("register"));
modalClose.addEventListener("click", closeModal);

authForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (currentMode === "login") {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        closeModal();
        showNotification("Giriş Yapıldı ✔");
      })
      .catch((error) => alert("Hata: " + error.message));
  } else {
    const username = usernameInput.value.trim();
    if (username.length < 3) {
      alert("Kullanıcı adı en az 3 karakter olmalı");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, { displayName: username })
          .then(() => {
            closeModal();
            showNotification("Üye Olundu ✔");
          });
      })
      .catch((error) => alert("Hata: " + error.message));
  }
});

btnLogout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      userDisplay.textContent = "";
      btnLogin.style.display = "inline-block";
      btnRegister.style.display = "inline-block";
      btnLogout.style.display = "none";
      showNotification("Çıkış Yapıldı");
    })
    .catch((error) => alert("Hata: " + error.message));
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    const displayName = user.displayName || user.email;
    userDisplay.innerHTML = `<span id="username">${displayName}</span><br><small id="userEmail" style="display:none; font-size:0.75rem; color:#aaa;">${user.email}</small>`;

    btnLogin.style.display = "none";
    btnRegister.style.display = "none";
    btnLogout.style.display = "inline-block";

    const usernameSpan = document.getElementById("username");
    const emailSmall = document.getElementById("userEmail");
    usernameSpan.style.cursor = "pointer";

    usernameSpan.onclick = () => {
      if(emailSmall.style.display === "none"){
        emailSmall.style.display = "block";
      } else {
        emailSmall.style.display = "none";
      }
    };

  } else {
    userDisplay.textContent = "";
    btnLogin.style.display = "inline-block";
    btnRegister.style.display = "inline-block";
    btnLogout.style.display = "none";
  }
});
