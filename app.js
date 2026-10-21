// 공통 스크립트 — data.js(COURSE, SESSIONS)를 읽어 화면을 채운다.

function showToast(msg){
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg || '복사되었습니다 ✓';
  t.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('show'), 1800);
}

// 프롬프트 복사
function copyPrompt(btn){
  const text = btn.closest('.prompt').querySelector('pre').textContent.trim();
  const onSuccess = () => {
    btn.textContent = '✓ 복사됨'; btn.classList.add('done');
    showToast('프롬프트가 복사되었습니다 ✓');
    setTimeout(() => { btn.textContent = '복사'; btn.classList.remove('done'); }, 1800);
  };
  const fallbackCopy = () => {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); onSuccess(); }
    catch (e) { alert('복사에 실패했습니다. 직접 선택해 복사해 주세요.'); }
    document.body.removeChild(ta);
  };
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(onSuccess).catch(fallbackCopy);
  } else { fallbackCopy(); }
}

// <div class="prompt" id="p1-01" data-label="..."><pre>..</pre></div> 에 머리줄(번호·제목·복사버튼)을 붙인다
function decoratePrompts(){
  document.querySelectorAll('.prompt').forEach(box => {
    if (box.querySelector('.prompt-head')) return;
    const no = (box.id || '').toUpperCase();
    const head = document.createElement('div');
    head.className = 'prompt-head';
    head.innerHTML =
      `<span class="pno">${box.classList.contains('example') ? '예시' : 'PROMPT'} ${no.replace(/^P/, '')}</span>` +
      `<span class="label"></span>` +
      `<button class="copy-btn" type="button" onclick="copyPrompt(this)">복사</button>`;
    head.querySelector('.label').textContent = box.dataset.label || '';
    box.prepend(head);

    const pre = box.querySelector('pre');
    if (pre && pre.textContent.split('\n').length > 22){
      box.classList.add('long');
      const more = document.createElement('button');
      more.className = 'expand'; more.type = 'button'; more.textContent = '전체 펼치기 ▾';
      more.onclick = () => {
        box.classList.toggle('open');
        more.textContent = box.classList.contains('open') ? '접기 ▴' : '전체 펼치기 ▾';
      };
      box.append(more);
    }
  });
}

function renderNav(currentId){
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const tabs = SESSIONS.map(s =>
    `<a class="nav-btn${s.id === currentId ? ' active' : ''}" href="${s.href}">PART ${s.id}</a>`).join('');
  const current = SESSIONS.find(s => s.id === currentId);
  const anchors = (current ? current.anchors : []).map(a =>
    `<a class="anchor" href="${a.href}">${a.label}</a>`).join('');
  const count = current ? current.prompts.length : 0;
  nav.innerHTML = `
    <div class="wrap">
      <div class="nav-row">
        <a class="nav-btn home-btn" href="index.html">← 처음으로</a>
        <span class="nav-divider"></span>
        ${tabs}
        <button class="po-toggle" type="button" id="po-toggle">프롬프트만 보기 · ${count}</button>
      </div>
      <div class="nav-row sub">${anchors}</div>
    </div>`;
  document.getElementById('po-toggle').onclick = (e) => {
    const on = document.body.classList.toggle('prompts-only');
    e.currentTarget.classList.toggle('on', on);
    e.currentTarget.textContent = on ? '전체 내용 보기' : `프롬프트만 보기 · ${count}`;
    window.scrollTo({ top: document.getElementById('site-nav').offsetTop, behavior: 'smooth' });
  };
}

function renderFooter(extra){
  const footer = document.getElementById('site-footer');
  if (footer) footer.innerHTML = `
    <div class="wrap">
      <strong>${COURSE.title}</strong> · ${COURSE.org}${COURSE.date ? ' ' + COURSE.date : ''}${extra ? ' · ' + extra : ''}<br>
      ${COURSE.orgs} · 강사 ${COURSE.instructor}
    </div>`;
}

function addToTop(){
  const b = document.createElement('button');
  b.className = 'to-top'; b.type = 'button'; b.setAttribute('aria-label', '맨 위로'); b.textContent = '↑';
  b.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.append(b);
  window.addEventListener('scroll', () => b.classList.toggle('show', window.scrollY > 600), { passive: true });
}

function flashHash(){
  if (!location.hash) return;
  const el = document.querySelector(location.hash);
  if (!el) return;
  // 웹폰트·머리줄이 붙은 뒤 레이아웃이 바뀌므로 한 번 더 정확히 스크롤
  setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
  if (el.classList.contains('prompt')){
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 2200);
  }
}

function initSessionPage(currentId){
  const s = SESSIONS.find(x => x.id === currentId);
  const eyebrow = document.querySelector('.header .eyebrow');
  if (eyebrow && s) eyebrow.textContent = `PART ${s.id} · ${s.tool}`;
  decoratePrompts();
  renderPracticeFiles("practice-files-list", false);
  renderNav(currentId);
  renderFooter(`PART ${currentId}`);
  addToTop();
  flashHash();
  window.addEventListener('hashchange', flashHash);
}

// ───── 메인 페이지 ─────
function renderParts(){
  const grid = document.getElementById('part-grid');
  if (!grid) return;
  grid.innerHTML = SESSIONS.map(s => `
    <a class="part-card" href="${s.href}">
      <div class="part-top">
        <div class="part-no"><small>PART</small>0${s.id}</div>
        <span class="tool-tag">${s.tool}</span>
      </div>
      <h3>${s.title}</h3>
      <p class="desc">${s.desc}</p>
      <div class="part-foot">
        ${s.prompts.length
          ? `<span class="count">실습 프롬프트 <b>${s.prompts.length}</b>개</span>`
          : `<span class="count concept">개념 이해 · 사례</span>`}
        <span class="go">강의안 보기 →</span>
      </div>
    </a>`).join('');
}

function renderLibrary(){
  const list = document.getElementById('lib-list');
  const input = document.getElementById('lib-search');
  const filterBox = document.getElementById('lib-filters');
  if (!list) return;
  let part = 0;

  filterBox.innerHTML = `<button class="filter on" data-p="0">전체</button>` +
    SESSIONS.map(s => `<button class="filter" data-p="${s.id}">PART ${s.id}</button>`).join('');
  filterBox.querySelectorAll('.filter').forEach(b => b.onclick = () => {
    part = +b.dataset.p;
    filterBox.querySelectorAll('.filter').forEach(x => x.classList.toggle('on', x === b));
    draw();
  });
  input.addEventListener('input', draw);

  function draw(){
    const q = input.value.trim().toLowerCase();
    const html = SESSIONS.filter(s => !part || s.id === part).map(s => {
      const items = s.prompts.filter(p => !q || (p.label + ' ' + p.id + ' ' + s.tool).toLowerCase().includes(q));
      if (!items.length) return '';
      return `<div class="lib-group"><h4>PART ${s.id} · ${s.tool}</h4>` + items.map(p => `
        <a class="lib-item" href="${s.href}#${p.id}">
          <span class="pno">${p.id.toUpperCase().replace(/^P/, '')}</span>
          <span class="pl">${p.label}</span>
          ${p.example ? '<span class="ex">결과 예시</span>' : ''}
          <span class="arrow">→</span>
        </a>`).join('') + `</div>`;
    }).join('');
    list.innerHTML = html || `<div class="lib-empty">"${input.value}"에 해당하는 프롬프트가 없습니다.</div>`;
  }
  draw();
}

function initIndexPage(){
  const total = SESSIONS.reduce((n, s) => n + s.prompts.length, 0);
  const t = document.getElementById('total-prompts');
  if (t) t.textContent = total;
  renderParts();
  renderPracticeFiles("practice-files-index", true);
  renderLibrary();
  renderFooter();
  addToTop();
}

// 실습 파일 목록 (data.js의 PRACTICE_FILES) — 첫 화면과 PART 4에서 함께 사용
function renderPracticeFiles(containerId, withLink){
  const box = document.getElementById(containerId);
  if (!box || typeof PRACTICE_FILES === 'undefined') return;
  box.innerHTML = PRACTICE_FILES.sets.map(set => `
    <div class="file-set">
      <div class="file-set-head">
        <span class="set-no">${set.no}</span>
        <b>${set.title}</b>
        ${withLink ? `<a class="set-link" href="${PRACTICE_FILES.anchor}">PART ${PRACTICE_FILES.part}에서 사용 →</a>` : ''}
      </div>
      ${set.files.map(f => `
        <a class="file-row" href="${f.href}" download="${f.name}">
          <span class="file-ico">PDF</span>
          <span class="file-name">${f.name}<small>${f.type}</small></span>
          <span class="file-dl">다운로드 ↓</span>
        </a>`).join('')}
    </div>`).join('');
}
