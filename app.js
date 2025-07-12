const quotes = [
  "Bize racon kesilmez, biz yazarız.",
  "Delikanlı adam sözünün arkasında durur.",
  "Yürek varsa konuş, yoksa sus!",
  "Masada dost, sokakta düşman olmayız.",
  "Bizde laf ağızdan çıkmadan hesap edilir."
];

function showRandomQuote() {
  const racon = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('racon-text').textContent = `"${racon}"`;
}

function openLogin() {
  document.getElementById('modal-title').textContent = "Giriş Yap";
  document.getElementById('modal').classList.remove('hidden');
}

function openRegister() {
  document.getElementById('modal-title').textContent = "Üye Ol";
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

function submitForm() {
  const username = document.getElementById('username').value.trim();
  if (!username) return alert("Kullanıcı adı boş olamaz.");

  // Simülasyon: giriş başarılı
  document.getElementById('auth-buttons').classList.add('hidden');
  document.getElementById('user-info').classList.remove('hidden');
  document.getElementById('username-display').textContent = `👤 ${username}`;
  closeModal();
  showNotification("Giriş başarılı!");
}

function logout() {
  document.getElementById('auth-buttons').classList.remove('hidden');
  document.getElementById('user-info').classList.add('hidden');
  showNotification("Çıkış yapıldı!");
}

function showNotification(msg) {
  const n = document.getElementById('notification');
  n.textContent = msg;
  n.classList.remove('hidden');
  setTimeout(() => n.classList.add('hidden'), 3000);
}
