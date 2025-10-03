$(function() {
    // === ハンバーガーメニューの機能 ===
    $('.hamburger').on('click', function() {
        $(this).toggleClass('is-active'); // ハンバーガーアイコンのスタイル変更
        $('nav').toggleClass('nav-open'); // ナビゲーションメニューの表示/非表示
        $('body').toggleClass('no-scroll'); // 背景のスクロールを禁止
    });

    // === スムーズスクロールと固定ヘッダーの調整 ===
    // ページ内のアンカーリンク全てに適用
    $('a[href^="#"]').click(function(e) {
        e.preventDefault(); // デフォルトのアンカーリンクジャンプを停止

        var speed = 600; // スクロール速度 (ms)
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href); // スクロール目標要素
        var additionalOffset = 25;

        // スクロール実行関数
        function executeScroll() {
            // ヘッダーの高さを取得 (paddingも含む正確な高さ)
            // モバイルでは .header-title の height:60px; padding:15px; で合計90pxになるはず
            var headerHeight = $('.header-title').outerHeight(); 
            
            // 目標要素のトップ位置からヘッダー高さを引く
            var position = target.offset().top - headerHeight + additionalOffset;
            
            // スクロール位置が負にならないように0と比較
            position = Math.max(0, position);

            // スクロールアニメーションを実行
            $("html, body").animate({
                scrollTop: position
            }, speed, "swing");
        }

        // ハンバーガーメニューが開いている場合は、まずメニューを閉じる
        if ($('.hamburger').hasClass('is-active')) {
            $('.hamburger').removeClass('is-active');
            $('nav').removeClass('nav-open');
            $('body').removeClass('no-scroll');
            // ナビゲーションが完全に閉じるアニメーション（0.3秒）が終わるのを待ってからスクロール
            setTimeout(executeScroll, 300); // CSSの transition-duration: 0.3s と合わせる
        } else {
            // メニューが開いていない場合はすぐにスクロール
            executeScroll();
        }
    });

    // === Section fade-in on scroll ===
    var $sections = $('section'); 

    function checkScrollAnimation() {
        var windowHeight = $(window).height(); 
        var scrollPos = $(window).scrollTop(); 

        $sections.each(function() {
            var $this = $(this);
            
            if ($this.hasClass('is-visible')) {
                return;
            }

            var sectionTop = $this.offset().top; 
            
            var triggerOffset = windowHeight * 0.2; 
            if (sectionTop < (scrollPos + windowHeight - triggerOffset)) {
                $this.addClass('is-visible');
            }
        });
    }

    // スクロール時とページロード時にアニメーションをチェック
    $(window).on('scroll', checkScrollAnimation);
    $(window).on('load', checkScrollAnimation); 
    // ページロード時にすでに表示範囲内の要素をアニメーションさせるため、手動で一度実行
    checkScrollAnimation();


    // === Voice tabs functionality ===
    $('.tab-button').on('click', function() {
        var target = $(this).data('target');

        $('.tab-button').removeClass('active');
        $(this).addClass('active');

        $('.voice-category').removeClass('active');
        $('#' + target).addClass('active');
    });

    // ページロード時にアクティブなタブを初期表示
    // activeクラスを持つタブがあればクリックして内容を表示
    if ($('.tab-button.active').length) {
        $('.tab-button.active').click();
    } else {
        // activeクラスがない場合、最初のタブをアクティブにする
        $('.tab-button:first').click();
    }
});