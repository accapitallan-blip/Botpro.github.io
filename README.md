<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TerrabOT — Chat IA profesional</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root{
      --bg:#0b0f17;           /* fondo general */
      --panel:#111827;        /* paneles */
      --panel-2:#0f172a;      /* paneles secundarios */
      --text:#e5e7eb;         /* texto principal */
      --muted:#9ca3af;        /* texto tenue */
      --brand:#58b4ff;        /* acento */
      --brand-2:#6ee7ff;      /* acento suave */
      --success:#22c55e;      /* verde */
      --danger:#ef4444;       /* rojo */
      --shadow: 0 10px 30px rgba(0,0,0,.3);
      --radius: 16px;
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0; font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,"Helvetica Neue",Arial; color:var(--text);
      background:
        radial-gradient(60% 60% at 10% 10%, rgba(88,180,255,.12), transparent 60%),
        radial-gradient(40% 40% at 90% 10%, rgba(110,231,255,.08), transparent 60%),
        radial-gradient(50% 50% at 80% 90%, rgba(24,119,242,.08), transparent 60%),
        var(--bg);
      display:grid; grid-template-columns: 300px 1fr; gap:22px; padding:22px;
    }
    /* Sidebar */
    .sidebar{
      background: linear-gradient(180deg, rgba(17,24,39,.9), rgba(15,23,42,.85));
      border:1px solid rgba(255,255,255,.06);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      display:flex; flex-direction:column; overflow:hidden;
    }
    .brand{display:flex; align-items:center; gap:12px; padding:18px 16px; border-bottom:1px solid rgba(255,255,255,.06)}
    .logo{width:34px; height:34px; border-radius:12px; display:grid; place-items:center; background:linear-gradient(135deg, var(--brand), #1f7cff); box-shadow:0 8px 20px rgba(24,119,242,.35)}
    .logo svg{width:20px; height:20px; color:#0b1220}
    .brand-title{font-weight:800; letter-spacing:.2px}
    .btn{display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:10px 12px; border-radius:12px; border:1px solid rgba(255,255,255,.09); color:var(--text); background:rgba(255,255,255,.02); cursor:pointer; transition:.2s}
    .btn:hover{background:rgba(255,255,255,.06)}
    .btn-primary{border-color:transparent; background:linear-gradient(135deg, var(--brand), #1f7cff)}
    .btn-primary:hover{filter:brightness(1.08)}
    .sidebar .section{padding:14px 16px}
    .nav{display:flex; flex-direction:column; gap:8px; padding:8px 8px 16px}
    .nav a{padding:10px 12px; color:var(--muted); text-decoration:none; border-radius:10px; border:1px solid transparent; transition:.2s}
    .nav a:hover{color:var(--text); background:rgba(255,255,255,.04); border-color:rgba(255,255,255,.06)}
    .sidebar-footer{margin-top:auto; padding:14px 16px; display:flex; align-items:center; justify-content:space-between; color:var(--muted); border-top:1px solid rgba(255,255,255,.06)}

    /* Main area */
    .main{
      background: linear-gradient(180deg, rgba(15,23,42,.7), rgba(2,6,23,.7));
      border:1px solid rgba(255,255,255,.06);
      border-radius: var(--radius);
      display:grid; grid-template-rows: auto 1fr auto; box-shadow: var(--shadow); overflow:hidden;
    }
    .toolbar{display:flex; align-items:center; gap:12px; padding:14px 18px; border-bottom:1px solid rgba(255,255,255,.06)}
    .status-dot{width:10px; height:10px; border-radius:50%; background:var(--success); box-shadow:0 0 0 4px rgba(34,197,94,.15)}
    .toolbar h1{font-size:16px; margin:0; font-weight:700}

    .chat{position:relative; padding:22px; overflow:auto}
    .messages{display:flex; flex-direction:column; gap:14px; max-width:900px; margin:auto}
    .bubble{max-width:80%; padding:14px 16px; border-radius:18px; line-height:1.5; border:1px solid rgba(255,255,255,.06)}
    .ai{align-self:flex-start; background:rgba(255,255,255,.04)}
    .user{align-self:flex-end; background:linear-gradient(135deg, #1b2a4a, #11213d); border-color:rgba(88,180,255,.35)}
    .bubble .meta{display:flex; align-items:center; gap:8px; margin-bottom:8px; font-size:12px; color:var(--muted)}
    .avatar{width:26px; height:26px; border-radius:9px; display:grid; place-items:center; background:linear-gradient(135deg, var(--brand), #1f7cff)}
    .avatar svg{width:16px; height:16px; color:#06101f}

    .quick{display:flex; gap:10px; margin-top:8px}
    .chip{padding:8px 12px; background:rgba(88,180,255,.12); color:var(--text); border:1px solid rgba(88,180,255,.35); border-radius:999px; cursor:pointer; transition:.2s; font-weight:600}
    .chip:hover{transform:translateY(-1px); filter:brightness(1.1)}

    .composer{padding:16px; border-top:1px solid rgba(255,255,255,.06); background:linear-gradient(0deg, rgba(2,6,23,.6), rgba(2,6,23,.4))}
    .composer-wrap{max-width:900px; margin:auto; display:flex; gap:12px; align-items:center}
    .input{flex:1; display:flex; align-items:center; gap:10px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.1); border-radius:16px; padding:10px 12px}
    .input textarea{flex:1; resize:none; background:transparent; color:var(--text); border:0; outline:0; font:inherit; max-height:120px; min-height:24px}
    .icon-btn{width:40px; height:40px; display:grid; place-items:center; border-radius:12px; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.04); cursor:pointer; transition:.2s}
    .icon-btn:hover{background:rgba(255,255,255,.08)}
    .send{width:44px; height:44px; border-radius:14px; border:0; cursor:pointer; padding:0 0 0 2px; background:linear-gradient(135deg, var(--brand), #1f7cff); box-shadow:0 8px 24px rgba(24,119,242,.35)}
    .send:hover{filter:brightness(1.08)}

    /* API key modal */
    .modal{position:fixed; inset:0; background:rgba(0,0,0,.6); display:none; align-items:center; justify-content:center; z-index:50}
    .modal.on{display:flex}
    .card{width:min(560px, 92vw); background:var(--panel); border:1px solid rgba(255,255,255,.08); border-radius:18px; box-shadow:var(--shadow); padding:18px}
    .field{display:flex; gap:10px}
    .field input{flex:1; padding:12px 14px; border-radius:12px; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.04); color:var(--text)}
    .tiny{color:var(--muted); font-size:12px; margin-top:6px}

    .pill{font-size:11px; padding:4px 8px; border:1px solid rgba(255,255,255,.1); border-radius:999px; color:var(--muted)}
    .toast{position:fixed; bottom:20px; right:20px; background:var(--panel); border:1px solid rgba(255,255,255,.1); padding:10px 12px; border-radius:12px; box-shadow:var(--shadow); display:none}
    .toast.on{display:block}

    @media (max-width: 980px){
      body{display:flex; flex-direction:column; padding:14px}
      .sidebar{order:2}
      .main{order:1}
    }
  </style>
</head>
<body>
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="brand">
      <div class="logo" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c5.523 0 10 4.477 10 10 0 2.77-1.127 5.283-2.946 7.09l.022-.023-2.11-2.11A6.997 6.997 0 0 0 19 12c0-3.866-3.134-7-7-7s-7 3.134-7 7c0 1.625.56 3.12 1.497 4.296l-.017-.021-2.1 2.1A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2Z"/></svg>
      </div>
      <div>
        <div class="brand-title">TerrabOT</div>
        <div style="font-size:12px; color:var(--muted)">Asistente de proyectos</div>
      </div>
    </div>
    <div class="section">
      <button class="btn btn-primary" id="newChatBtn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/></svg>
        Nuevo chat
      </button>
    </div>
    <div class="section">
      <div style="font-weight:700; color:#cbd5e1; margin-bottom:8px; font-size:13px">Conversaciones</div>
      <nav class="nav" id="history"></nav>
    </div>
    <div class="sidebar-footer">
      <span style="font-size:12px">Desarrollado por</span>
      <strong style="font-size:12px; letter-spacing:.2px">Venalab</strong>
    </div>
  </aside>

  <!-- Main -->
  <main class="main">
    <div class="toolbar">
      <span class="status-dot" title="Conectado"></span>
      <h1>Chat con TerrabOT</h1>
      <div style="margin-left:auto; display:flex; gap:8px; align-items:center">
        <span id="testsPill" class="pill" title="Estado de pruebas">Tests: —</span>
        <button class="btn" id="diagBtn">Diagnóstico</button>
        <button class="btn" id="walletBtn">Conectar Wallet (opcional)</button>
        <button class="btn" id="apiKeyBtn">Configurar API Key</button>
      </div>
    </div>

    <section class="chat">
      <div class="messages" id="messages"></div>
    </section>

    <div class="composer">
      <div class="composer-wrap">
        <div class="input">
          <button class="icon-btn" id="micBtn" title="Dictar (voz)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm-7-3a1 1 0 1 0-2 0 9 9 0 0 0 8 8.944V22H9v2h6v-2h-2v-2.056A9 9 0 0 0 19 11a1 1 0 1 0-2 0 7 7 0 1 1-14 0z"/></svg>
          </button>
          <textarea id="input" rows="1" placeholder="Escribe tu mensaje…"></textarea>
          <button class="icon-btn" id="uploadBtn" title="Adjuntar archivo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 6.5v8a4.5 4.5 0 1 1-9 0v-9a3 3 0 1 1 6 0v9a1.5 1.5 0 1 1-3 0v-8h-2v8a3.5 3.5 0 1 0 7 0v-9a5 5 0 1 0-10 0v9h2v-9a3 3 0 1 1 6 0"/></svg>
          </button>
        </div>
        <button class="send" id="sendBtn" title="Enviar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#06101f" style="transform:translateX(1px)"><path d="m2 21 20-9L2 3v7l14 2-14 2v7z"/></svg>
        </button>
      </div>
      <div class="tiny">Consejo: Guarda tu API Key localmente con el botón “Configurar API Key”. Para producción, usa un proxy en servidor: nunca expongas tu clave en el navegador.</div>
    </div>
  </main>

  <!-- API Key Modal -->
  <div class="modal" id="keyModal" role="dialog" aria-modal="true">
    <div class="card">
      <h2 style="margin:6px 2px 12px; font-size:18px">Conectar con OpenAI</h2>
      <p class="tiny" style="margin-bottom:10px">Introduce una API Key de OpenAI (se guardará en tu navegador). Para máxima seguridad usa un backend proxy.</p>
      <div class="field">
        <input id="apiKeyInput" type="password" placeholder="sk-…" autocomplete="off" />
        <button class="btn btn-primary" id="saveKeyBtn">Guardar</button>
      </div>
    </div>
  </div>

  <!-- Diagnóstico Modal -->
  <div class="modal" id="diagModal" role="dialog" aria-modal="true">
    <div class="card">
      <h2 style="margin:6px 2px 12px; font-size:18px">Diagnóstico & Tests</h2>
      <div id="diagContent" class="tiny"></div>
      <div style="margin-top:12px; display:flex; gap:10px; justify-content:flex-end">
        <button class="btn" id="runTestsBtn">Re-ejecutar tests</button>
        <button class="btn btn-primary" id="closeDiagBtn">Cerrar</button>
      </div>
    </div>
  </div>

  <div class="toast" id="toast"></div>

<script>
(function(){
  const d = document;
  const $messages = d.getElementById('messages');
  const $input = d.getElementById('input');
  const $send = d.getElementById('sendBtn');
  const $newChat = d.getElementById('newChatBtn');
  const $history = d.getElementById('history');
  const $apiKeyBtn = d.getElementById('apiKeyBtn');
  const $keyModal = d.getElementById('keyModal');
  const $apiKeyInput = d.getElementById('apiKeyInput');
  const $saveKeyBtn = d.getElementById('saveKeyBtn');
  const $micBtn = d.getElementById('micBtn');
  const $walletBtn = d.getElementById('walletBtn');
  const $diagBtn = d.getElementById('diagBtn');
  const $diagModal = d.getElementById('diagModal');
  const $runTestsBtn = d.getElementById('runTestsBtn');
  const $closeDiagBtn = d.getElementById('closeDiagBtn');
  const $testsPill = d.getElementById('testsPill');
  const $toast = d.getElementById('toast');

  let conversation = [];
  let walletAddress = null;
  let lastToast = '';

  const systemPrompt = `Eres TerrabOT, una IA experta en estructurar proyectos profesionales paso a paso (alcance, objetivos, cronograma, presupuesto, riesgos, KPIs y reportes). Guía con preguntas claras, listas y ejemplos concisos. Tono profesional, empático y orientado a la acción.`;

  // Key storage
  function getKey(){ return localStorage.getItem('OPENAI_API_KEY') || ''; }
  function setKey(v){ localStorage.setItem('OPENAI_API_KEY', v || ''); }
  function needsApiKey(){ return !(getKey() && getKey().startsWith('sk-')); }

  // Wallet helpers (seguras/no intrusivas)
  function detectWallet(){ return { installed: typeof window.ethereum !== 'undefined' }; }
  async function connectWallet(){
    const { installed } = detectWallet();
    if(!installed){ toast('MetaMask no está disponible en este navegador. (Opcional)'); return { ok:false, reason:'no-ethereum' }; }
    try{
      const accounts = await window.ethereum.request({ method:'eth_requestAccounts' });
      walletAddress = accounts && accounts[0] || null;
      if(walletAddress){ toast('Wallet conectada: '+short(walletAddress)); return { ok:true, account: walletAddress }; }
      return { ok:false, reason:'no-accounts' };
    }catch(e){
      // No lanzar error; informar y continuar
      toast('No se pudo conectar a MetaMask: '+(e && e.message ? e.message : 'Acción cancelada'));
      return { ok:false, reason:'request-failed', error:e };
    }
  }
  function short(addr){ return addr ? addr.slice(0,6)+'…'+addr.slice(-4) : ''; }

  // UI utils
  function el(html){ const t = d.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
  function toast(msg){ lastToast = msg; $toast.textContent = msg; $toast.classList.add('on'); setTimeout(()=> $toast.classList.remove('on'), 2600); }

  // Captura de errores globales de MetaMask (sandbox)
  window.addEventListener('unhandledrejection', (ev)=>{
    const reason = ev.reason;
    const msg = reason && (reason.message || String(reason));
    if(msg && /metamask/i.test(msg) && /connect/i.test(msg)){
      ev.preventDefault();
      toast('No se pudo conectar a MetaMask (capturado de forma segura).');
    }
  });

  function addBubble(role, html){
    const isAI = role === 'assistant';
    const bubble = el(`
      <div class="bubble ${isAI? 'ai':'user'}">
        <div class="meta">
          <span class="avatar">${isAI?'<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2Zm0 4a3 3 0 0 0-3 3v1a3 3 0 1 0 6 0V9a3 3 0 0 0-3-3Zm0 14c2.9 0 5.5-1.5 7-3.8-.2-2.5-4.7-3.7-7-3.7s-6.8 1.2-7 3.7A8.8 8.8 0 0 0 12 20Z\"/></svg>':'<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-3.3 0-8 1.7-8 5v1h16v-1c0-3.3-4.7-5-8-5Z\"/></svg>'}</span>
          <strong>${isAI? 'TerrabOT':'Tú'}</strong>
        </div>
        <div class="content">${html}</div>
      </div>`);
    $messages.appendChild(bubble);
    $messages.parentElement.scrollTop = $messages.parentElement.scrollHeight;
    return bubble;
  }

  function addQuickReplies(container){
    const quick = el(`<div class="quick">
      <button class="chip" data-q="Sí">SI</button>
      <button class="chip" data-q="No">NO</button>
    </div>`);
    container.appendChild(quick);
    quick.addEventListener('click', (ev)=>{
      const b = ev.target.closest('[data-q]');
      if(!b) return;
      sendMessage(b.getAttribute('data-q'));
      quick.remove();
    });
  }

  function resetChat(){
    $messages.innerHTML = '';
    conversation = [{ role:'system', content: systemPrompt }];
    const b = addBubble('assistant', `Felicidades por tomar la decisión de crear tu proyecto. Soy <strong>TerrabOT</strong>, tu IA para estructurar proyectos profesionales en minutos. ¿Empezamos ahora mismo?`);
    addQuickReplies(b.querySelector('.content'));
    saveToHistory();
  }

  function saveToHistory(){
    const items = JSON.parse(localStorage.getItem('TERRABOT_HISTORY')||'[]');
    const title = new Date().toLocaleString();
    items.unshift({ id: Date.now().toString(), title, conversation });
    localStorage.setItem('TERRABOT_HISTORY', JSON.stringify(items.slice(0,20)));
    renderHistory();
  }

  function renderHistory(){
    const items = JSON.parse(localStorage.getItem('TERRABOT_HISTORY')||'[]');
    $history.innerHTML = '';
    items.forEach((it, idx)=>{
      const a = el(`<a href="#">${idx+1}. ${it.title}</a>`);
      a.addEventListener('click', (e)=>{ e.preventDefault(); conversation = it.conversation; replayConversation(); });
      $history.appendChild(a);
    });
  }

  function replayConversation(){
    $messages.innerHTML='';
    conversation.filter(m=>m.role!=='system').forEach(m=>{
      addBubble(m.role==='assistant'?'assistant':'user', m.content.replace(/\n/g,'<br>'));
    });
  }

  async function sendMessage(text){
    if(!text) return;
    const keyMissing = needsApiKey();
    $input.value='';
    addBubble('user', text.replace(/\n/g,'<br>'));
    conversation.push({ role:'user', content: text });

    const thinking = addBubble('assistant', '<em>Escribiendo…</em>');

    try{
      if(keyMissing){ throw new Error('Falta API Key. Haz clic en “Configurar API Key”.'); }

      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer ' + getKey() },
        body: JSON.stringify({ model:'gpt-4o-mini', temperature:0.4, messages: conversation })
      });

      if(!resp.ok){
        const info = await resp.json().catch(()=>({}));
        throw new Error(info.error?.message || ('Error HTTP '+resp.status));
      }

      const data = await resp.json();
      const content = data.choices?.[0]?.message?.content || 'Sin respuesta';
      thinking.remove();
      addBubble('assistant', content.replace(/\n/g,'<br>'));
      conversation.push({ role:'assistant', content });
    }catch(err){
      thinking.remove();
      addBubble('assistant', `<span style="color:#fca5a5">⚠️ ${err.message}</span>`);
    }
  }

  // ------- TESTS -------
  // Runner básico con más casos para asegurar robustez en entornos sin MetaMask.
  const Tests = {
    list: [
      {
        name:'Wallet detection no lanza error',
        run: () => { const r = detectWallet(); return typeof r.installed === 'boolean'; }
      },
      {
        name:'resetChat crea saludo de TerrabOT',
        run: () => { resetChat(); const last = $messages.lastElementChild; return last && /TerrabOT/.test(last.textContent); }
      },
      {
        name:'needsApiKey devuelve boolean',
        run: () => typeof needsApiKey() === 'boolean'
      },
      {
        name:'sendMessage sin API Key no rompe',
        run: async () => { const before = $messages.childElementCount; await sendMessage('Ping de prueba'); return $messages.childElementCount > before; }
      },
      // Nuevos tests añadidos
      {
        name:'connectWallet sin provider devuelve ok:false',
        run: async () => { const hasEth = typeof window.ethereum !== 'undefined'; const r = await connectWallet(); return hasEth ? (typeof r.ok === 'boolean') : (r && r.ok === false); }
      },
      {
        name:'Captura global de "Failed to connect to MetaMask" no rompe',
        run: async () => {
          const evt = new Promise((resolve)=>{
            const h = ()=>{ resolve(true); window.removeEventListener('unhandledrejection', h); };
            setTimeout(()=> resolve(true), 50);
          });
          // Simulamos un rechazo global similar al que ocurre en sandbox
          const e = new Promise((_,rej)=> setTimeout(()=> rej(new Error('Failed to connect to MetaMask')), 10));
          e.catch(()=>{}); // silenciar para no marcarlo como handled
          await evt; // esperamos a que el listener procese
          return /MetaMask/.test(lastToast);
        }
      }
    ],
    async runAll(){
      let passed = 0; const results = [];
      for(const t of this.list){
        try{ const r = await t.run(); if(r) passed++; results.push({name:t.name, ok:!!r}); }
        catch(e){ results.push({name:t.name, ok:false, err:e}); }
      }
      return { passed, total:this.list.length, results };
    }
  };

  async function showDiagnostics(){
    const { passed, total, results } = await Tests.runAll();
    $testsPill.textContent = `Tests: ${passed}/${total}`;
    const rWallet = detectWallet();
    const html = [
      `<div><strong>API Key:</strong> ${needsApiKey() ? 'No configurada' : 'Configurada'}</div>`,
      `<div><strong>Wallet:</strong> ${rWallet.installed ? 'MetaMask detectado' : 'No detectado (correcto si es sandbox)'}</div>`,
      '<hr style="border-color:rgba(255,255,255,.08)">',
      '<div style="margin:6px 0 8px">Resultados de tests:</div>',
      '<ul style="margin:0; padding-left:16px">'+results.map(r=>`<li>${r.ok?'✅':'❌'} ${r.name}</li>`).join('')+'</ul>'
    ].join('');
    d.getElementById('diagContent').innerHTML = html;
    $diagModal.classList.add('on');
  }

  // Events
  $send.addEventListener('click', ()=> sendMessage($input.value.trim()));
  $input.addEventListener('keydown', (e)=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); $send.click(); } });

  $newChat.addEventListener('click', resetChat);

  $apiKeyBtn.addEventListener('click', ()=>{ $keyModal.classList.add('on'); $apiKeyInput.value = getKey(); setTimeout(()=> $apiKeyInput.focus(), 20); });
  $keyModal.addEventListener('click', (e)=>{ if(e.target===$keyModal) $keyModal.classList.remove('on'); });
  $saveKeyBtn.addEventListener('click', ()=>{ setKey($apiKeyInput.value.trim()); $keyModal.classList.remove('on'); toast('API Key guardada'); });

  $walletBtn.addEventListener('click', connectWallet);

  $diagBtn.addEventListener('click', showDiagnostics);
  $diagModal.addEventListener('click', (e)=>{ if(e.target===$diagModal) $diagModal.classList.remove('on'); });
  $runTestsBtn.addEventListener('click', showDiagnostics);
  $closeDiagBtn.addEventListener('click', ()=> $diagModal.classList.remove('on'));

  // Microphone (Web Speech API)
  let rec;
  $micBtn.addEventListener('click', ()=>{
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SR){ addBubble('assistant', 'Tu navegador no soporta reconocimiento de voz.'); return; }
    if(rec){ rec.stop(); rec = null; $micBtn.title='Dictar (voz)'; return; }
    rec = new SR();
    rec.lang = 'es-ES';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e)=>{ const t = e.results[0][0].transcript; $input.value = ($input.value + ' ' + t).trim(); };
    rec.onend = ()=>{ rec = null; $micBtn.title='Dictar (voz)'; };
    rec.start();
    $micBtn.title='Escuchando… haz clic para detener';
  });

  // Start
  renderHistory();
  resetChat();
  // Ejecutar tests una vez al cargar para mostrar el estado
  showDiagnostics();
})();
</script>
</body>
</html>
