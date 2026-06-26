/* 共通パーツ（ヘッダー／フッター）
   全ページの <div id="site-header"></div> / <div id="site-footer"></div> に展開します。
   ヘッダーやフッター、ナビ項目を変更したいときは、このファイル1か所を直すだけで全ページに反映されます。
   ※ script.js より前に読み込んでください（各ページで <script src="components.js" defer> を先に記述）。
*/
(function () {
  "use strict";

  var HEADER =
'<header class="site-header">\n' +
'  <a class="site-header__title" href="index.html">\n' +
'    <p>千葉工業大学 工学部 宇宙・半導体工学科</p>\n' +
'    <p>宇宙物理環境・計測研究室</p>\n' +
'  </a>\n' +
'  <button class="nav-toggle" type="button" aria-label="メニューを開閉" aria-expanded="false">\n' +
'    <span></span><span></span><span></span>\n' +
'  </button>\n' +
'  <nav class="nav">\n' +
'    <a href="index.html">ホーム</a>\n' +
'    <a href="about.html">研究室概要</a>\n' +
'    <a href="professor.html">教授紹介</a>\n' +
'    <span class="nav__item nav__dropdown" tabindex="0">学生の研究\n' +
'      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 8l5 5 5-5" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>\n' +
'      <span class="nav__menu">\n' +
'        <a href="students-master.html">修士課程</a>\n' +
'        <a href="students-undergrad.html">学部生</a>\n' +
'      </span>\n' +
'    </span>\n' +
'    <span class="nav__item">JP/EN</span>\n' +
'  </nav>\n' +
'</header>';

  var FOOTER =
'<footer class="site-footer">\n' +
'  <div class="footer__inner">\n' +
'    <div class="footer__title">\n' +
'      <p>千葉工業大学 工学部 宇宙・半導体工学科</p>\n' +
'      <p>宇宙物理環境・計測研究室</p>\n' +
'    </div>\n' +
'    <div class="footer__contact">\n' +
'      <div class="footer__block">\n' +
'        <p>〒275-0016 千葉県習志野市津田沼2-17-1</p>\n' +
'        <p>千葉工業大学津田沼キャンパス4号館</p>\n' +
'      </div>\n' +
'      <div class="footer__block">\n' +
'        <p>TEL : 012-3456-7890</p>\n' +
'        <p>E-mail : example@email.com</p>\n' +
'      </div>\n' +
'    </div>\n' +
'  </div>\n' +
'</footer>';

  function inject(id, html) {
    var ph = document.getElementById(id);
    if (ph) ph.outerHTML = html;
  }
  inject("site-header", HEADER);
  inject("site-footer", FOOTER);

  // 現在ページに応じて、ナビの該当項目をアクティブ表示にする
  var page = location.pathname.split("/").pop() || "index.html";
  var nav = document.querySelector(".site-header .nav");
  if (nav) {
    if (page === "students-master.html" || page === "students-undergrad.html") {
      var dd = nav.querySelector(".nav__dropdown");
      if (dd) dd.classList.add("is-active");
    } else {
      var link = nav.querySelector('a[href="' + page + '"]');
      if (link) link.classList.add("is-active");
    }
  }
})();
