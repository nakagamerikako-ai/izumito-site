document.addEventListener('DOMContentLoaded', () => {
    // ナビゲーションのスクロール効果
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // スクロールアニメーションの監視
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.concept-card, .room-card, .charm-item, .flow-item').forEach(el => {
        el.classList.add('anim-on-scroll');
        observer.observe(el);
    });

    // お問い合わせフォーム送信（Netlify AJAX送信）
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerText;
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
                    alert("送信に失敗しました。時間をおいて再度お試しください。");
                }
            } catch (error) {
                alert("接続エラーが発生しました。");
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
            }
        });
    }
});

// モーダルを閉じる関数
function closeModal() {
    document.getElementById('successModal').classList.remove('active');
}