document.addEventListener('DOMContentLoaded', () => {

    // 1. ナビゲーションのスクロール効果
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        navbar.classList.toggle('scrolled', y > 50);
        if(backToTop) backToTop.classList.toggle('visible', y > 500);
    });

    // 2. スマホメニューの開閉
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 3. スクロールアニメーションの監視
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.concept-card, .room-card, .charm-item, .facility-showcase-item').forEach(el => {
        el.classList.add('anim-on-scroll');
        observer.observe(el);
    });

    // 4. お問い合わせフォーム送信（Netlify専用）
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.innerText = "送信中...";

            // フォームデータをNetlifyが受け取れる形式に変換
            const formData = new FormData(form);
            const params = new URLSearchParams(formData).toString();

            try {
                const response = await fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: params,
                });

                if (response.ok) {
                    // 送信成功！モーダルを表示
                    document.getElementById('successModal').classList.add('active');
                    form.reset();
                } else {
                    throw new Error('送信エラー');
                }
            } catch (error) {
                alert("送信に失敗しました。時間をおいて再度お試しください。");
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