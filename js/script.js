/*-------------------------------------------
スクロールに応じて要素をアニメーション
-------------------------------------------*/
// 監視対象が範囲内に現れたら実行する動作
const animateScroll = (entries, obs) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // スクロールエフェクトのアニメーションを適用
            entry.target.animate(
                {
                    translate: [0, '100%'],    // Y軸方向に移動するアニメーション
                },
                {
                    duration: 2000,            // アニメーションの時間
                    pseudoElement: '::before', // 疑似要素へのアニメーション
                    easing: 'ease',            // イージング関数
                    fill: 'forwards',          // アニメーション終了後の状態を維持
                }
            );

            // 一度実行されたら監視をやめる
            obs.unobserve(entry.target);
        }
    });
};

// 監視ロボットの設定
const scrollObserver = new IntersectionObserver(animateScroll);

// .scroll::beforeを監視するよう指示
const scrollElements = document.querySelectorAll('.scroll');

scrollElements.forEach((scrollElement) => {
    scrollObserver.observe(scrollElement);
});