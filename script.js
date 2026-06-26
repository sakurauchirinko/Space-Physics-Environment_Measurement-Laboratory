/* 宇宙物理環境・計測研究室 — 共通スクリプト
   - モバイル: ハンバーガーメニューの開閉
   - 教授紹介: タブ（紹介／活動実績）の切り替え
   - JP/EN: 固定UI（ナビ・見出し・ボタン・タブ・フッター等）の言語切り替え
*/
(function () {
  "use strict";

  /* ===== モバイル: ハンバーガーメニュー ===== */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (header && toggle) {
    var setOpen = function (open) {
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("is-open"));
    });
    header.querySelectorAll(".nav a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
  }

  /* ===== 教授紹介: タブ切り替え ===== */
  var tabs = document.querySelectorAll(".tab[data-tab]");
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-tab");
        tabs.forEach(function (t) {
          t.classList.toggle("is-active", t === tab);
          t.setAttribute("aria-selected", t === tab ? "true" : "false");
        });
        document.querySelectorAll(".tab-panel").forEach(function (panel) {
          panel.hidden = (panel.id !== "panel-" + target);
        });
      });
    });
  }

  /* ===== JP/EN: 言語切り替え（固定UIのみ） ===== */
  // 日本語 → 英語 の対訳（固定UI）。本文ダミーは対象外。
  var DICT = {
    // ナビ
    "ホーム": "Home",
    "研究室概要": "About",
    "教授紹介": "Professor",
    "学生の研究": "Student Research",
    "修士課程": "Master's",
    "学部生": "Undergraduate",
    // ヘッダー／フッターの研究室名
    "千葉工業大学 工学部 宇宙・半導体工学科": "Chiba Institute of Technology, Dept. of Space & Semiconductor Engineering",
    "宇宙物理環境・計測研究室": "Space Physics Environment & Measurement Laboratory",
    // セクション見出し（TOP）
    "お知らせ": "News",
    "教授挨拶": "Message",
    "関連ページ": "Related Links",
    // ヒーロー見出し（TOP）
    "宇宙環境計測を支える応用物理": "Applied Physics for Space Environment Measurement",
    "センサー工学": "Sensor Engineering",
    // タブ・目次（他ページ）
    "紹介": "Profile",
    "活動実績": "Activities",
    "研究内容": "Research",
    "目次": "Contents",
    // ページ見出し帯（学生の研究）
    "学生の研究　修士課程": "Student Research — Master's",
    "学生の研究　学部生": "Student Research — Undergraduate",
    // フッター住所
    "〒275-0016 千葉県習志野市津田沼2-17-1": "2-17-1 Tsudanuma, Narashino-shi, Chiba 275-0016, Japan",
    "千葉工業大学津田沼キャンパス4号館": "Building 4, Tsudanuma Campus, Chiba Institute of Technology"
  };
  var REV = {};
  Object.keys(DICT).forEach(function (k) { REV[DICT[k]] = k; });

  // 辞書（DICT/REV）方式：テキストノードを丸ごと置換。data-en 要素の中は除外。
  function translate(map) {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (node.parentElement && node.parentElement.closest("[data-en]")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }, false);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var raw = node.nodeValue;
      var key = raw.trim();
      if (key && Object.prototype.hasOwnProperty.call(map, key)) {
        node.nodeValue = raw.replace(key, map[key]);
      }
    });
  }

  // 属性方式：要素に data-en="英訳" を付けると、その要素の中身を丸ごと差し替え。
  // 日本語は元の中身を data-ja に自動退避するので、HTML 側は data-en を足すだけでよい。
  function swapDataEn(lang) {
    document.querySelectorAll("[data-en]").forEach(function (el) {
      if (!el.hasAttribute("data-ja")) el.setAttribute("data-ja", el.innerHTML);
      el.innerHTML = (lang === "en") ? el.getAttribute("data-en") : el.getAttribute("data-ja");
    });
  }

  var current = "ja";
  function setLang(lang) {
    if (lang === current) return;
    swapDataEn(lang);
    translate(lang === "en" ? DICT : REV);
    current = lang;
    document.documentElement.lang = lang;
    try { localStorage.setItem("siteLang", lang); } catch (e) {}
  }

  // 保存された言語を適用
  var saved = "ja";
  try { saved = localStorage.getItem("siteLang") || "ja"; } catch (e) {}
  if (saved === "en") setLang("en");

  // JP/EN ボタンに切り替えを割り当て
  document.querySelectorAll(".nav__item").forEach(function (el) {
    if (el.textContent.trim() === "JP/EN") {
      el.style.cursor = "pointer";
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      var flip = function () { setLang(current === "en" ? "ja" : "en"); };
      el.addEventListener("click", flip);
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
      });
    }
  });

  /* ===== ページ先頭へ戻るボタン（下スクロールで右下に出現） ===== */
  var toTop = document.createElement("button");
  toTop.className = "to-top";
  toTop.type = "button";
  toTop.setAttribute("aria-label", "ページの先頭へ戻る");
  toTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>' +
    '<path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>' +
    '<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>' +
    '<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>';
  document.body.appendChild(toTop);
  var onScroll = function () {
    toTop.classList.toggle("is-visible", window.pageYOffset > 300);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
