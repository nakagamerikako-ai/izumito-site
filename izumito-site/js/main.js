document.addEventListener('DOMContentLoaded', () => {

    // === Navbar Scroll ===
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // === Mobile Menu ===
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // === Scroll Animations ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.concept-card, .room-card').forEach(el => {
        el.classList.add('anim-on-scroll');
        observer.observe(el);
    });

    // === Contact Form Submission (Netlify AJAX) ===
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.innerText = "送信中...";

            const formData = new FormData(form);
            
            try {
                const response = await fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString(),
                });

                if (response.ok) {
                    document.getElementById('successModal').classList.add('active');
                    form.reset();
                } else {
                    throw new Error('送信に失敗しました');
                }
            } catch (error) {
                alert("エラーが発生しました。もう一度お試しください。");
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = "送信する";
            }
        });
    }

    // === Modal Close ===
    window.closeModal = function() {
        document.getElementById('successModal').classList.remove('active');
    };
});