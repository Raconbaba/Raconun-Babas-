/* ==== RASTGELE RACON ==== */
const quotes = [
  "Bize racon kesilmez, biz yazarız.",
  "Raconuna sahip çıkmayan, sokağını kaybeder.",
  "Yürek varsa konuş, yoksa sus!",
  "Masada dost, sokakta düşman olmayız.",
  "Bizde laf ağızdan çıkmadan hesap edilir.",
  "Delikanlı adam sözünün arkasında durur.",
  "Dirayet bizde, hıyanet gördüğümüzde meydan bizde.",
  "Sokağın kanunu bellidir, bozarsan bedeli ağırdır."
];

function randomQuote () {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote-text").textContent = `"${q}"`;
}

/* ==== NAV SCROLL YARDIMCISI ==== */
function scrollToSection(id){document.getElementById(id).scrollIntoView({behavior:"smooth"})}

/* ==== GİZLİ BÖLGE ==== */
document.getElementById("secret-btn").addEventListener("click", e=>{
  e.preventDefault();
  const pass = prompt("Şifreyi gir Usta:");
  if(pass==="racon"){
    document.getElementById("secret").classList.remove("hidden");
    scrollToSection("secret");
  }else if(pass!==null){
    alert("Yanlış şifre!");
  }
});

