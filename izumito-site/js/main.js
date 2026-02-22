document.addEventListener('DOMContentLoaded', () => {

    // === Navbar Scroll === (あなたのコードのまま)
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        const y = window.scrollY;
        navbar.classList.toggle('scrolled', y > 60);
        if(backToTop) backToTop.classList.toggle('visible', y > 500);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // === Mobile Menu === (あなたのコードのまま)
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // === Scroll Animations === (あなたのコードのまま)
    const animElements = document.querySelectorAll(
        '.concept-card, .charm-item, .facility-showcase-item, .facility-card, .room-card, .access-card, .flow-step, .rule-item, .contact-card, .plan-card'
    );
    animElements.forEach(el => el.classList.add('anim-on-scroll'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => entry.target.classList.add('animated'), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animElements.forEach((el, i) => {
        el.dataset.delay = (i % 5) * 80;
        observer.observe(el);
    });

    // === Contact Form === (送信処理だけNetlify用に変更)
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            if(btnText) btnText.style.display = 'none';
            if(btnLoading) btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;

            const formData = new FormData(form);
            try {
                // Netlify Forms への送信
                const res = await fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString(),
                });

                if (res.ok) {
                    document.getElementById('successModal').classList.add('active');
                    form.reset();
                } else {
                    alert("送信に失敗しました。");
                }
            } catch (err) {
                alert("送信に失敗しました。");
            }

            if(btnText) btnText.style.display = 'inline-flex';
            if(btnLoading) btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        });
    }

    // === Modal === (あなたのコードのまま)
    window.closeModal = function() {
        document.getElementById('successModal').classList.remove('active');
    };
});