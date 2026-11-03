// ===== 阅读进度条 =====
(function () {
  var bar = document.getElementById('progress-bar');
  if (!bar) return;
  function update() {
    var h = document.documentElement;
    var top = h.scrollTop || document.body.scrollTop;
    var total = h.scrollHeight - h.clientHeight;
    var pct = total > 0 ? (top / total) * 100 : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// ===== 返回顶部按钮 =====
(function () {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    var top = document.documentElement.scrollTop || document.body.scrollTop;
    btn.classList.toggle('show', top > 400);
  }, { passive: true });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ===== 文章目录 TOC + 滚动高亮 =====
(function () {
  var toc = document.getElementById('toc');
  if (!toc) return;
  var content = document.querySelector('.post-content');
  if (!content) return;
  var headings = content.querySelectorAll('h2, h3');
  if (headings.length === 0) {
    toc.style.display = 'none';
    return;
  }

  var ul = document.createElement('ul');
  headings.forEach(function (h, i) {
    var id = h.id || ('heading-' + i);
    h.id = id;
    var li = document.createElement('li');
    if (h.tagName === 'H3') li.className = 'toc-h3';
    var a = document.createElement('a');
    a.href = '#' + id;
    a.textContent = h.textContent;
    li.appendChild(a);
    ul.appendChild(li);
  });
  toc.appendChild(ul);

  var links = toc.querySelectorAll('a');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  headings.forEach(function (h) { observer.observe(h); });
})();

// ===== 图片灯箱 =====
(function () {
  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  var img = document.createElement('img');
  overlay.appendChild(img);
  overlay.addEventListener('click', function () {
    overlay.classList.remove('open');
  });
  document.body.appendChild(overlay);

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.tagName === 'IMG' && t.closest('.post-content')) {
      img.src = t.src;
      img.alt = t.alt || '';
      overlay.classList.add('open');
    }
  });
})();

// ===== 代码块复制按钮 =====
(function () {
  document.querySelectorAll('pre').forEach(function (pre) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = '复制';
    btn.addEventListener('click', function () {
      var code = pre.querySelector('code') || pre;
      var text = code.textContent;
      var done = function () {
        btn.textContent = '已复制';
        setTimeout(function () { btn.textContent = '复制'; }, 1500);
      };
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        done();
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(fallback);
      } else {
        fallback();
      }
    });
    pre.appendChild(btn);
  });
})();

// ===== 暗色模式切换 =====
(function () {
  var html = document.documentElement;
  var KEY = 'theme';
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentMode() {
    var saved = localStorage.getItem(KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return systemDark.matches ? 'dark' : 'light';
  }
  function apply(mode) {
    html.classList.toggle('dark', mode === 'dark');
  }

  apply(currentMode());

  systemDark.addEventListener('change', function () {
    if (!localStorage.getItem(KEY)) apply(currentMode());
  });

  var btn = document.getElementById('theme-toggle');
  if (btn) {
    function updateLabel() {
      btn.textContent = html.classList.contains('dark') ? '☀' : '☾';
    }
    btn.addEventListener('click', function () {
      var next = html.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem(KEY, next);
      apply(next);
      updateLabel();
    });
    updateLabel();
  }
})();
