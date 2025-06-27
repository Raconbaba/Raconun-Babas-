
document.addEventListener('DOMContentLoaded', () => {
    // Basit veri (yazılar)
    const posts = [
        { id: 1, title: "Her kusurun bir bedeli vardır.", author: "Süleyman Çakır", content: "Racon budur, rahat olmayalım." },
        { id: 2, title: "İki üç kuruş için adam satılmaz.", author: "Memati", content: "Sadakat en büyük değerdir." },
        { id: 3, title: "Dostlarım için her şeyi yaparım.", author: "Buba", content: "Gerçek kardeşlik burada başlar." }
    ];

    const postsContainer = document.getElementById('posts');
    const searchInput = document.getElementById('searchInput');
    const commentSection = document.getElementById('commentSection');
    const commentText = document.getElementById('commentText');
    const submitCommentBtn = document.getElementById('submitComment');
    const commentsList = document.getElementById('commentsList');

    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = document.getElementById('loginModal');
    const closeLogin = document.getElementById('closeLogin');
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const userDisplay = document.getElementById('userDisplay');

    let currentUser = null;
    let selectedPostId = null;
    const commentsData = {}; // { postId: [ {user, text} ] }

    // Basit kullanıcı verisi (frontend demo için)
    const users = [
        { username: "buba", password: "1234" },
        { username: "memati", password: "4321" }
    ];

    // Yazıları göster
    function showPosts(filter = "") {
        postsContainer.innerHTML = "";
        let filtered = posts.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()) || p.content.toLowerCase().includes(filter.toLowerCase()));
        filtered.forEach(post => {
            let article = document.createElement('article');
            article.className = 'post';
            article.dataset.id = post.id;
            article.innerHTML = `<h2>${post.title}</h2><h4>— ${post.author}</h4><p>${post.content}</p>`;
            article.addEventListener('click', () => {
                selectedPostId = post.id;
                showComments(post.id);
                commentSection.style.display = currentUser ? 'block' : 'none';
            });
            postsContainer.appendChild(article);
        });
    }

    // Yorumları göster
    function showComments(postId) {
        commentsList.innerHTML = "";
        if(!commentsData[postId]) commentsData[postId] = [];
        commentsData[postId].forEach(c => {
            let div = document.createElement('div');
            div.textContent = `${c.user}: ${c.text}`;
            commentsList.appendChild(div);
        });
    }

    // Yorum gönder
    submitCommentBtn.addEventListener('click', () => {
        if(!currentUser) {
            alert("Önce giriş yapmalısın.");
            return;
        }
        if(!selectedPostId) {
            alert("Bir yazı seçmelisin.");
            return;
        }
        let text = commentText.value.trim();
        if(text.length === 0) {
            alert("Yorum boş olamaz.");
            return;
        }
        commentsData[selectedPostId].push({user: currentUser, text});
        commentText.value = "";
        showComments(selectedPostId);
    });

    // Arama inputu
    searchInput.addEventListener('input', () => {
        showPosts(searchInput.value);
    });

    // Giriş modal aç/kapa
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
        loginMessage.textContent = "";
    });
    closeLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if(e.target == loginModal) loginModal.style.display = 'none';
    });

    // Giriş formu
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        let user = users.find(u => u.username === username && u.password === password);
        if(user) {
            currentUser = user.username;
            loginModal.style.display = 'none';
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            userDisplay.textContent = currentUser + " olarak giriş yapıldı";
            commentSection.style.display = 'none';
            showPosts(searchInput.value);
        } else {
            loginMessage.textContent = "Kullanıcı adı veya şifre yanlış.";
        }
    });

    // Çıkış yap
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        userDisplay.textContent = "";
        commentSection.style.display = 'none';
        showPosts(searchInput.value);
    });

    // İletişim formu
    const contactForm = document.getElementById('contactForm');
    const contactResult = document.getElementById('contactResult');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactResult.textContent = "Mesajınız alındı, teşekkürler!";
        contactForm.reset();
    });

    // İlk yükleme
    showPosts();

});
