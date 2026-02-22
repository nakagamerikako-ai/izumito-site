document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.concept-card, .room-card, .facility-showcase-item').forEach(el => {
        el.classList.add('anim-on-scroll');
        observer.observe(el);
    });

    // Form Submission
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.innerText = "送信中...";

            const formData = new FormData(form);
            try {
                const res = await fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString(),
                });
                if (res.ok) {
                    document.getElementById('successModal').classList.add('active');
                    form.reset();
                } else {
                    alert("送信に失敗しました。時間をおいて再度お試しください。");
                }
            } catch (err) {
                alert("エラーが発生しました。");
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = "送信する";
            }
        });
    }
});

function closeModal() {
    document.getElementById('successModal').classList.remove('active');
}