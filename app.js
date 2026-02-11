// ============================================================
//  SOLAR MANAGER — MAIN APPLICATION (app.js)
// ============================================================

const DATA = {
  users: [
    {
      id: 1, name: "DEMO", email: "demo@solar.com", password: "password123",
      location: "New Delhi, India", panels: 12, memberSince: "January 2025"
    }
  ],
  currentReadings: { currentGeneration: 0.0, consumption: 1.67, netPower: -1.67, efficiency: 0.0 },
  todaySummary: { totalGeneration: 51.43, totalConsumption: 53.50, netEnergy: -2.07 },
  hourlyPowerData: [
    { h: "00", g: 0.0, c: 0.8 }, { h: "01", g: 0.0, c: 0.6 }, { h: "02", g: 0.0, c: 0.5 }, { h: "03", g: 0.0, c: 0.5 },
    { h: "04", g: 0.0, c: 0.6 }, { h: "05", g: 0.2, c: 0.8 }, { h: "06", g: 0.8, c: 1.1 }, { h: "07", g: 1.9, c: 1.4 },
    { h: "08", g: 3.2, c: 1.7 }, { h: "09", g: 4.5, c: 2.0 }, { h: "10", g: 5.8, c: 2.2 }, { h: "11", g: 6.7, c: 2.4 },
    { h: "12", g: 7.1, c: 2.5 }, { h: "13", g: 6.9, c: 2.6 }, { h: "14", g: 6.2, c: 2.4 }, { h: "15", g: 5.1, c: 2.2 },
    { h: "16", g: 3.8, c: 2.0 }, { h: "17", g: 2.4, c: 1.8 }, { h: "18", g: 1.0, c: 1.9 }, { h: "19", g: 0.2, c: 2.1 },
    { h: "20", g: 0.0, c: 2.3 }, { h: "21", g: 0.0, c: 2.0 }, { h: "22", g: 0.0, c: 1.5 }, { h: "23", g: 0.0, c: 1.0 }
  ],
  weeklyEnergyData: [
    { day: "Mon", gen: 48.2, con: 45.1 }, { day: "Tue", gen: 52.7, con: 48.6 }, { day: "Wed", gen: 38.4, con: 42.3 },
    { day: "Thu", gen: 61.9, con: 50.8 }, { day: "Fri", gen: 55.3, con: 47.2 }, { day: "Sat", gen: 43.1, con: 38.9 },
    { day: "Sun", gen: 51.4, con: 53.5 }
  ],
  monthlyEnergyData: [
    { month: "Jan", gen: 820, con: 780 }, { month: "Feb", gen: 910, con: 850 }, { month: "Mar", gen: 1150, con: 920 },
    { month: "Apr", gen: 1380, con: 980 }, { month: "May", gen: 1520, con: 1050 }, { month: "Jun", gen: 1340, con: 1100 },
    { month: "Jul", gen: 1180, con: 1080 }, { month: "Aug", gen: 1290, con: 1020 }, { month: "Sep", gen: 1420, con: 950 },
    { month: "Oct", gen: 1260, con: 900 }, { month: "Nov", gen: 950, con: 840 }, { month: "Dec", gen: 780, con: 810 }
  ],
  energySourceData: [
    { label: "Solar Generation", value: 62, color: "#f97316" },
    { label: "Grid Import", value: 28, color: "#6366f1" },
    { label: "Battery Storage", value: 10, color: "#22c55e" }
  ],
  consumptionBreakdown: [
    { label: "HVAC / Cooling", value: 34, color: "#f97316" },
    { label: "Lighting", value: 18, color: "#facc15" },
    { label: "Appliances", value: 27, color: "#6366f1" },
    { label: "EV Charging", value: 13, color: "#22c55e" },
    { label: "Other", value: 8, color: "#94a3b8" }
  ],
  maintenanceTasks: [
    { id: 1, title: "Panel Cleaning", description: "Clean all solar panels with soft brush and water", priority: "HIGH", dueDate: "2026-02-12", completed: false },
    { id: 2, title: "Inverter Check", description: "Check inverter connections and display", priority: "MEDIUM", dueDate: "2026-02-17", completed: false },
    { id: 3, title: "Wire Inspection", description: "Inspect all wiring for damage or wear", priority: "MEDIUM", dueDate: "2026-02-24", completed: false },
    { id: 4, title: "Performance Analysis", description: "Review system performance and efficiency metrics", priority: "LOW", dueDate: "2026-03-12", completed: true }
  ],
  reminders: [
    { id: 1, title: "Panel Cleaning Due", message: "Your solar panels need cleaning tomorrow.", type: "maintenance", date: "2026-02-12", time: "09:00", enabled: true, icon: "🧹" },
    { id: 2, title: "Low Efficiency Alert", message: "System efficiency dropped below 40% today.", type: "alert", date: "2026-02-11", time: "14:30", enabled: true, icon: "⚠️" },
    { id: 3, title: "Inverter Maintenance", message: "Scheduled inverter check in 6 days.", type: "maintenance", date: "2026-02-17", time: "10:00", enabled: true, icon: "🔧" },
    { id: 4, title: "Monthly Report Ready", message: "Your January 2026 energy report is available.", type: "info", date: "2026-02-01", time: "08:00", enabled: false, icon: "📊" },
    { id: 5, title: "Grid Export Milestone", message: "You exported 500 kWh to the grid this month!", type: "success", date: "2026-02-08", time: "18:00", enabled: true, icon: "🎉" }
  ]
};

let state = {
  currentPage: 'login', previousPage: null, currentUser: null,
  tasks: DATA.maintenanceTasks.map(t => ({ ...t })),
  reminders: DATA.reminders.map(r => ({ ...r })),
  panelMode: 'auto', azimuth: 180, tilt: 30,
  liveInterval: null, nextTaskId: 100, nextReminderId: 100
};

// ---- ROUTING ----
function showPage(pageId) {

  // Hide ALL pages
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  // Show selected page
  const target = document.getElementById(`page-${pageId}`);
  if (target) {
    target.classList.add("active");
  }

  // Bottom nav visibility
  const nav = document.getElementById("bottom-nav");

  if (pageId === "login" || pageId === "signup") {
    nav.classList.add("hidden");
  } else {
    nav.classList.remove("hidden");
  }

  // Update nav active state
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  const activeBtn = document.getElementById(`nav-${pageId}`);
  if (activeBtn) {
    activeBtn.classList.add("active");
  }

  // update state
  state.previousPage = state.currentPage;
  state.currentPage = pageId;

  // initialize page-specific logic
  if (pageId === 'dashboard') initDashboard();
  else if (pageId === 'panels') initPanels();
  else if (pageId === 'maintenance') initMaintenance();
  else if (pageId === 'graphs') initGraphs();
  else if (pageId === 'profile') initProfile();
  else if (pageId === 'reminders') initReminders();

}


// ---- AUTH ----
function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-password').value;
  if (!email || !pass) { showToast('Please fill in all fields', 'error'); return; }
  const stored = getStoredUsers();
  const all = [...DATA.users, ...stored];
  const user = all.find(u => u.email === email && u.password === pass);
  if (!user) { showToast('Invalid email or password', 'error'); return; }
  state.currentUser = user;
  const btn = document.getElementById('login-btn');
  btn.textContent = 'Logging in...'; btn.disabled = true;
  showToast('Welcome back, ' + user.name + '!', 'success');
  setTimeout(() => { btn.textContent = 'LOGIN'; btn.disabled = false; showPage('dashboard'); }, 900);
}
function handleSignup() {
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const loc = document.getElementById('signup-location').value.trim();
  const pass = document.getElementById('signup-password').value;
  const conf = document.getElementById('signup-confirm').value;
  if (!name || !email || !pass || !conf) { showToast('Please fill in all fields', 'error'); return; }
  if (pass !== conf) { showToast('Passwords do not match', 'error'); return; }
  if (pass.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }
  const stored = getStoredUsers();
  if ([...DATA.users, ...stored].find(u => u.email === email)) { showToast('Email already registered', 'error'); return; }
  const nu = { id: Date.now(), name: name.toUpperCase(), email, password: pass, location: loc || 'India', panels: 0, memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) };
  stored.push(nu); localStorage.setItem('sm_users', JSON.stringify(stored));
  state.currentUser = nu;
  showToast('Account created!', 'success');
  setTimeout(() => showPage('dashboard'), 800);
}
function handleLogout() {
  state.currentUser = null;
  if (state.liveInterval) clearInterval(state.liveInterval);
  state.liveInterval = null;
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  showToast('Logged out');
  setTimeout(() => showPage('login'), 400);
}
function getStoredUsers() { try { return JSON.parse(localStorage.getItem('sm_users') || '[]'); } catch { return []; } }

// ---- DASHBOARD ----
function initDashboard() {
  const user = state.currentUser || DATA.users[0];
  document.getElementById('dash-greeting').textContent = 'Hello, ' + user.name + '!';
  document.getElementById('metric-gen').textContent = DATA.currentReadings.currentGeneration.toFixed(2) + ' kW';
  document.getElementById('metric-cons').textContent = DATA.currentReadings.consumption.toFixed(2) + ' kW';
  document.getElementById('metric-net').textContent = DATA.currentReadings.netPower.toFixed(2) + ' kW';
  document.getElementById('metric-eff').textContent = DATA.currentReadings.efficiency.toFixed(1) + '%';
  document.getElementById('sum-gen').textContent = DATA.todaySummary.totalGeneration.toFixed(2) + ' kWh';
  document.getElementById('sum-cons').textContent = DATA.todaySummary.totalConsumption.toFixed(2) + ' kWh';
  document.getElementById('sum-net').textContent = DATA.todaySummary.netEnergy.toFixed(2) + ' kWh';
  updateLastTime();
  setTimeout(() => { const b = document.getElementById('health-bar'); if (b) b.style.width = '94%'; }, 400);
  drawMiniChart();
  if (state.liveInterval) clearInterval(state.liveInterval);
  state.liveInterval = setInterval(tickLive, 5000);
}
function updateLastTime() { const e = document.getElementById('last-update'); if (e) e.textContent = 'Updated ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
function tickLive() {
  document.querySelectorAll('.metric-value').forEach(el => {
    el.style.transform = 'scale(1.04)';
    setTimeout(() => el.style.transform = 'scale(1)', 180);
  });
  const r = DATA.currentReadings;
  r.consumption = Math.max(0.5, r.consumption + (Math.random() - 0.5) * 0.12);
  r.netPower = r.currentGeneration - r.consumption;
  const fade = el => { if (!el) return; el.style.transition = 'opacity 0.2s'; el.style.opacity = '0.3'; setTimeout(() => { el.style.opacity = '1'; }, 200); };
  const cE = document.getElementById('metric-cons');
  const nE = document.getElementById('metric-net');
  if (cE) { fade(cE); setTimeout(() => { cE.textContent = r.consumption.toFixed(2) + ' kW'; }, 200); }
  if (nE) { fade(nE); setTimeout(() => { nE.textContent = r.netPower.toFixed(2) + ' kW'; }, 200); }
  updateLastTime();
}
function drawMiniChart() {
  const canvas = document.getElementById('dash-mini-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 360;
  const H = 120, pad = { t: 8, r: 8, b: 22, l: 28 };
  canvas.width = W; canvas.height = H;
  ctx.clearRect(0, 0, W, H);
  const d = DATA.hourlyPowerData;
  const mx = Math.max(...d.map(x => Math.max(x.g, x.c)));
  const cW = W - pad.l - pad.r, cH = H - pad.t - pad.b;
  const xp = i => pad.l + (i / (d.length - 1)) * cW;
  const yp = v => pad.t + cH - (v / mx) * cH;
  function line(arr, col, fill) {
    ctx.beginPath(); arr.forEach((v, i) => i === 0 ? ctx.moveTo(xp(i), yp(v)) : ctx.lineTo(xp(i), yp(v)));
    ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.stroke();
    if (fill) {
      ctx.lineTo(xp(arr.length - 1), H - pad.b); ctx.lineTo(xp(0), H - pad.b); ctx.closePath();
      const g = ctx.createLinearGradient(0, pad.t, 0, H - pad.b); g.addColorStop(0, col + '40'); g.addColorStop(1, col + '00');
      ctx.fillStyle = g; ctx.fill();
    }
  }
  line(d.map(x => x.g), '#f97316', true);
  line(d.map(x => x.c), '#6366f1', false);
  ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
  [0, 6, 12, 18, 23].forEach(i => ctx.fillText(d[i].h + ':00', xp(i), H - 5));
}

// ---- PANELS ----
function initPanels() { updateAzimuth(state.azimuth); updateTilt(state.tilt); setMode(state.panelMode, false); drawCompass(); }
function setMode(mode, toast = true) {
  state.panelMode = mode;
  document.getElementById('mode-auto').classList.toggle('active', mode === 'auto');
  document.getElementById('mode-manual').classList.toggle('active', mode === 'manual');
  const dis = mode === 'auto';
  ['azimuth-slider', 'tilt-slider'].forEach(id => { const e = document.getElementById(id); if (e) { e.disabled = dis; e.style.opacity = dis ? '0.5' : '1'; } });
  ['azimuth-hint', 'tilt-hint'].forEach(id => { const e = document.getElementById(id); if (e) e.textContent = dis ? 'Switch to Manual mode to adjust' : ''; });
  if (toast) showToast(mode === 'auto' ? 'Auto sun tracking enabled' : 'Manual mode enabled', 'success');
}
function updateAzimuth(val) {
  state.azimuth = parseInt(val);
  const d = document.getElementById('azimuth-display'); if (d) d.textContent = val + '\u00b0';
  const s = document.getElementById('azimuth-slider'); if (s) s.value = val;
  drawCompass();
}
function updateTilt(val) {
  state.tilt = parseInt(val);
  const d = document.getElementById('tilt-display'); if (d) d.textContent = val + '\u00b0';
  const s = document.getElementById('tilt-slider'); if (s) s.value = val;
  drawCompass();
}
function drawCompass() {
  const c = document.getElementById('compass-canvas'); if (!c) return;
  const ctx = c.getContext('2d');
  // make compass responsive to its container width
  const W = c.offsetWidth || 200;
  const H = W; // square
  c.width = W; c.height = H;
  const cx = W / 2, cy = H / 2, r = Math.max(48, (W / 2) - 20), inn = Math.max(18, r * 0.35);
  ctx.clearRect(0, 0, W, H);
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = '#f0f2f7'; ctx.fill();
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2; ctx.stroke();
  for (let i = 0; i < 360; i += 30) {
    const rad = (i - 90) * Math.PI / 180, in2 = i % 90 === 0 ? r - 14 : r - 8;
    ctx.beginPath(); ctx.moveTo(cx + in2 * Math.cos(rad), cy + in2 * Math.sin(rad));
    ctx.lineTo(cx + r * Math.cos(rad), cy + r * Math.sin(rad));
    ctx.strokeStyle = i % 90 === 0 ? '#94a3b8' : '#cbd5e1'; ctx.lineWidth = i % 90 === 0 ? 2 : 1; ctx.stroke();
  }
  const az = (state.azimuth - 90) * Math.PI / 180;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + (r - 10) * Math.cos(az), cy + (r - 10) * Math.sin(az));
  ctx.strokeStyle = '#f97316'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.stroke();
  ctx.beginPath(); ctx.arc(cx + (r - 10) * Math.cos(az), cy + (r - 10) * Math.sin(az), 5, 0, Math.PI * 2); ctx.fillStyle = '#f97316'; ctx.fill();
  const tl = (r - 20) * (state.tilt / 90), pp = az + Math.PI / 2;
  ctx.beginPath(); ctx.moveTo(cx - tl * Math.cos(pp), cy - tl * Math.sin(pp)); ctx.lineTo(cx + tl * Math.cos(pp), cy + tl * Math.sin(pp));
  ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.stroke();
  ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fillStyle = '#1e293b'; ctx.fill();

  // draw cardinal labels
  ctx.fillStyle = '#374151'; ctx.font = Math.max(12, Math.round(W * 0.06)) + 'px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('N', cx, cy - r + 12);
  ctx.fillText('E', cx + r - 12, cy);
  ctx.fillText('S', cx, cy + r - 12);
  ctx.fillText('W', cx - r + 12, cy);
}
function applyPanelSettings() {
  const btn = document.getElementById('apply-btn'); btn.textContent = 'Applying...'; btn.disabled = true;
  setTimeout(() => { btn.textContent = 'Apply Settings'; btn.disabled = false; showToast('Panel settings applied!', 'success'); }, 1000);
}

// ---- MAINTENANCE ----
function initMaintenance() { renderTasks(); }
function renderTasks() {
  const up = state.tasks.filter(t => !t.completed);
  const dn = state.tasks.filter(t => t.completed);
  const uc = document.getElementById('upcoming-count'); const dc = document.getElementById('completed-count');
  if (uc) uc.textContent = up.length; if (dc) dc.textContent = dn.length;
  const uEl = document.getElementById('upcoming-tasks'); const dEl = document.getElementById('completed-tasks');
  if (uEl) uEl.innerHTML = up.map(taskCard).join('');
  if (dEl) dEl.innerHTML = dn.length ? dn.map(taskCard).join('') : '<p style="color:var(--text-muted);font-size:14px;padding:10px 0;">No completed tasks yet.</p>';
}
function taskCard(t) {
  const days = getDaysUntil(t.dueDate);
  const dl = t.completed ? '' : (days < 0 ? 'Overdue' : days === 0 ? 'Today' : 'In ' + days + ' day' + (days === 1 ? '' : 's'));
  const p = t.priority.toLowerCase();
  return `<div class="task-card">
    <div class="task-check ${t.completed ? 'checked' : ''}">${t.completed ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}</div>
    <div class="task-body">
      <div style="display:flex;align-items:center;gap:8px;">
        <div class="task-title ${t.completed ? 'done' : ''}">${escHtml(t.title)}</div>
        <div class="task-actions">
          <button class="task-action-btn" onclick="toggleTask(${t.id});event.stopPropagation();">${t.completed ? 'Undo' : 'Done'}</button>
          <button class="task-action-btn" onclick="editTask(${t.id});event.stopPropagation();">Edit</button>
          <button class="task-action-btn danger" onclick="deleteTask(${t.id});event.stopPropagation();">Delete</button>
        </div>
      </div>
      <div class="task-desc ${t.completed ? 'done' : ''}">${escHtml(t.description)}</div>
      <div class="task-meta">
        <span>&#128197; ${formatDate(t.dueDate)}</span>
        ${dl ? '<span>&#9201; ' + dl + '</span>' : ''}
        <span class="badge badge-${p}" style="margin-left:auto;">${t.priority}</span>
      </div>
    </div></div>`;
}

function deleteTask(id) {
  if (!confirm('Delete this task?')) return;
  state.tasks = state.tasks.filter(t => t.id !== id);
  renderTasks();
  showToast('Task deleted', 'info');
}

function editTask(id) {
  const t = state.tasks.find(x => x.id === id); if (!t) return;
  const newTitle = prompt('Edit task title', t.title);
  if (newTitle === null) return;
  t.title = newTitle.trim() || t.title;
  const newDesc = prompt('Edit description', t.description);
  if (newDesc !== null) t.description = newDesc.trim() || t.description;
  renderTasks();
  showToast('Task updated', 'success');
}
function toggleTask(id) {
  const t = state.tasks.find(x => x.id === id); if (!t) return;
  t.completed = !t.completed; renderTasks();
  showToast(t.completed ? 'Task completed!' : 'Task reopened', t.completed ? 'success' : 'info');
}
function openAddTaskModal() { openModal('modal-add-task'); }
function addTask() {
  const title = document.getElementById('task-title-input').value.trim();
  const desc = document.getElementById('task-desc-input').value.trim();
  const date = document.getElementById('task-date-input').value;
  const priority = document.getElementById('task-priority-input').value;
  if (!title) { showToast('Enter a task title', 'error'); return; }
  if (!date) { showToast('Select a due date', 'error'); return; }
  state.tasks.unshift({ id: state.nextTaskId++, title, description: desc || 'No description', priority, dueDate: date, completed: false });
  renderTasks(); closeModal('modal-add-task');
  ['task-title-input', 'task-desc-input'].forEach(id => { const e = document.getElementById(id); if (e) e.value = ''; });
  showToast('Task added!', 'success');
}

// ---- REMINDERS ----
function initReminders() { renderReminders(); }
function renderReminders() {
  const a = state.reminders.filter(r => r.enabled).length;
  const d = state.reminders.filter(r => !r.enabled).length;
  const u = state.reminders.filter(r => r.enabled && getDaysUntil(r.date) <= 1 && getDaysUntil(r.date) >= 0).length;
  const aE = document.getElementById('reminders-active'); const dE = document.getElementById('reminders-disabled'); const uE = document.getElementById('reminders-due');
  if (aE) aE.textContent = a; if (dE) dE.textContent = d; if (uE) uE.textContent = u;
  const list = document.getElementById('reminders-list');
  if (list) list.innerHTML = state.reminders.map(reminderCard).join('');
}
function reminderCard(r) {
  return `<div class="reminder-card">
    <div class="reminder-icon-wrap ${r.type}">${r.icon}</div>
    <div class="reminder-body">
      <div class="reminder-title">${escHtml(r.title)}</div>
      <div class="reminder-msg">${escHtml(r.message)}</div>
      <div class="reminder-meta">&#128197; ${formatDate(r.date)} &nbsp;&#9201; ${r.time}</div>
    </div>
    <label class="toggle"><input type="checkbox" ${r.enabled ? 'checked' : ''} onchange="toggleReminder(${r.id},this.checked)"/><div class="toggle-track"></div></label>
  </div>`;
}
function toggleReminder(id, val) {
  const r = state.reminders.find(x => x.id === id); if (r) { r.enabled = val; renderReminders(); showToast(val ? 'Reminder enabled' : 'Reminder disabled'); }
}
function openAddReminderModal() { openModal('modal-add-reminder'); }
function addReminder() {
  const title = document.getElementById('reminder-title-input').value.trim();
  const msg = document.getElementById('reminder-msg-input').value.trim();
  const date = document.getElementById('reminder-date-input').value;
  const time = document.getElementById('reminder-time-input').value;
  const type = document.getElementById('reminder-type-input').value;
  if (!title) { showToast('Enter a title', 'error'); return; }
  if (!date) { showToast('Select a date', 'error'); return; }
  const icons = { maintenance: '🔧', alert: '⚠️', info: '📊', success: '🎉' };
  state.reminders.unshift({ id: state.nextReminderId++, title, message: msg || 'No message', type, date, time: time || '09:00', enabled: true, icon: icons[type] || '🔔' });
  renderReminders(); closeModal('modal-add-reminder');
  ['reminder-title-input', 'reminder-msg-input'].forEach(id => { const e = document.getElementById(id); if (e) e.value = ''; });
  showToast('Reminder added!', 'success');
}

// ---- PROFILE ----
function initProfile() {
  const user = state.currentUser || DATA.users[0];
  const init = (user.name || 'D').charAt(0).toUpperCase();
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  set('profile-avatar', init); set('profile-name', user.name); set('profile-email', user.email);
  set('info-location', user.location || 'India'); set('info-panels', (user.panels || 12) + ' panels'); set('info-since', user.memberSince || 'January 2025');
}

function goBack() {
  const prev = state.previousPage || 'dashboard';
  showPage(prev);
}

function editProfile() {
  const user = state.currentUser || DATA.users[0];
  const newName = prompt('Full name', user.name) || user.name;
  const newEmail = prompt('Email address', user.email) || user.email;
  const newLocation = prompt('Location', user.location || 'India') || user.location;
  // update in-place for demo users
  user.name = newName.trim();
  user.email = newEmail.trim();
  user.location = newLocation.trim();
  // persist if it's a stored user
  try {
    const stored = getStoredUsers();
    const idx = stored.findIndex(u => u.email === user.email || u.id === user.id);
    if (idx >= 0) { stored[idx] = user; localStorage.setItem('sm_users', JSON.stringify(stored)); }
  } catch (e) { /* ignore storage errors */ }
  initProfile();
  showToast('Profile updated', 'success');
}
function showAboutModal() { openModal('modal-about'); }

// ---- GRAPHS ----
function initGraphs() {
  setTimeout(() => {
    drawPie('pie-source', DATA.energySourceData, 'legend-source');
    drawPie('pie-consumption', DATA.consumptionBreakdown, 'legend-consumption');
    drawBar('bar-weekly', DATA.weeklyEnergyData.map(d => d.day), DATA.weeklyEnergyData.map(d => d.gen), DATA.weeklyEnergyData.map(d => d.con));
    drawBar('bar-monthly', DATA.monthlyEnergyData.map(d => d.month), DATA.monthlyEnergyData.map(d => d.gen), DATA.monthlyEnergyData.map(d => d.con));
    drawLine('line-hourly', DATA.hourlyPowerData.map(d => d.h), DATA.hourlyPowerData.map(d => d.g), DATA.hourlyPowerData.map(d => d.c));
  }, 120);
}

function drawPie(id, dataset, legendId) {
  const c = document.getElementById(id); if (!c) return;
  const ctx = c.getContext('2d');
  // responsive pie size based on container width
  const W = c.offsetWidth || 150;
  const H = Math.max(140, Math.min(220, Math.round(W * 0.7)));
  c.width = W; c.height = H;
  const cx = W / 2, cy = H / 2, r = Math.min(W, H) * 0.28, inn = Math.max(16, Math.round(r * 0.45));
  const total = dataset.reduce((s, d) => s + d.value, 0);
  let prog = 0;
  const anim = () => {
    prog = Math.min(prog + 0.04, 1);
    ctx.clearRect(0, 0, W, H);
    let s = -Math.PI / 2;
    dataset.forEach(d => {
      const a = (d.value / total) * Math.PI * 2 * prog;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, s, s + a); ctx.closePath(); ctx.fillStyle = d.color; ctx.fill();
      s += a;
    });
    ctx.beginPath(); ctx.arc(cx, cy, inn, 0, Math.PI * 2); ctx.fillStyle = '#ffffff'; ctx.fill();
    ctx.fillStyle = '#1e293b'; ctx.font = 'bold 13px Syne,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(Math.round(prog * 100) + '%', cx, cy);
    if (prog < 1) requestAnimationFrame(anim);
  };
  anim();
  const le = document.getElementById(legendId);
  if (le) le.innerHTML = dataset.map(d =>
    `<div class="legend-item"><span class="legend-dot" style="background:${d.color}"></span><div style="display:flex;flex-direction:column"><span class="legend-label">${d.label}</span><span class="legend-val">${d.value}%</span></div></div>`
  ).join('');
}

function drawBar(id, labels, genD, conD) {
  const c = document.getElementById(id); if (!c) return;
  const ctx = c.getContext('2d'); const W = c.offsetWidth || 360; c.width = W; const H = 180;
  c.height = H;
  ctx.clearRect(0, 0, W, H);
  const pad = { t: 18, r: 8, b: 26, l: 36 }; const cW = W - pad.l - pad.r; const cH = H - pad.t - pad.b;
  const mx = Math.max(...genD, ...conD) * 1.18; const n = labels.length;
  const gW = cW / n; const bW = Math.max(gW * 0.3, 4); const gap = gW * 0.05;
  let prog = 0;
  const draw = () => {
    prog = Math.min(prog + 0.055, 1); ctx.clearRect(0, 0, W, H);
    ctx.setLineDash([3, 3]); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + (i / 4) * cH; ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke();
      ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(Math.round((1 - i / 4) * mx), pad.l - 4, y + 3);
    }
    ctx.setLineDash([]);
    labels.forEach((lbl, i) => {
      const cx = pad.l + i * gW + gW / 2; const x1 = cx - bW - gap / 2; const x2 = cx + gap / 2;
      const gh = (genD[i] / mx) * cH * prog; const ch = (conD[i] / mx) * cH * prog;
      const gy = pad.t + cH - gh; const cy = pad.t + cH - ch;
      const g1 = ctx.createLinearGradient(x1, gy, x1, pad.t + cH); g1.addColorStop(0, '#f97316'); g1.addColorStop(1, '#fed7aa');
      ctx.fillStyle = g1;
      if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x1, gy, bW, gh, [3, 3, 0, 0]); ctx.fill(); }
      else { ctx.fillRect(x1, gy, bW, gh); }
      const g2 = ctx.createLinearGradient(x2, cy, x2, pad.t + cH); g2.addColorStop(0, '#6366f1'); g2.addColorStop(1, '#e0e7ff');
      ctx.fillStyle = g2;
      if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x2, cy, bW, ch, [3, 3, 0, 0]); ctx.fill(); }
      else { ctx.fillRect(x2, cy, bW, ch); }
      ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(lbl, cx, H - 8);
    });
    if (prog < 1) requestAnimationFrame(draw);
  }; draw();
}

function drawLine(id, labels, genD, conD) {
  const c = document.getElementById(id); if (!c) return;
  const ctx = c.getContext('2d'); const W = c.offsetWidth || 360; c.width = W; const H = 180;
  c.height = H;
  ctx.clearRect(0, 0, W, H);
  const pad = { t: 12, r: 8, b: 26, l: 34 }; const cW = W - pad.l - pad.r; const cH = H - pad.t - pad.b;
  const mx = Math.max(...genD, ...conD) * 1.18; const n = labels.length;
  const xp = i => pad.l + (i / (n - 1)) * cW; const yp = v => pad.t + cH - (v / mx) * cH;
  let prog = 0;
  const draw = () => {
    prog = Math.min(prog + 0.04, 1); ctx.clearRect(0, 0, W, H);
    ctx.setLineDash([3, 3]); ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.t + (i / 4) * cH; ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke();
      ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(((1 - i / 4) * mx).toFixed(1), pad.l - 4, y + 3);
    }
    ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
    [0, 4, 8, 12, 16, 20, 23].forEach(i => ctx.fillText(labels[i], xp(i), H - 8));
    const pts = Math.max(2, Math.round(prog * n));
    const drawCurve = (arr, col, fill) => {
      ctx.beginPath(); for (let i = 0; i < pts; i++)i === 0 ? ctx.moveTo(xp(i), yp(arr[i])) : ctx.lineTo(xp(i), yp(arr[i]));
      ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
      if (fill) {
        ctx.lineTo(xp(pts - 1), H - pad.b); ctx.lineTo(xp(0), H - pad.b); ctx.closePath();
        const g = ctx.createLinearGradient(0, pad.t, 0, H - pad.b); g.addColorStop(0, col + '55'); g.addColorStop(1, col + '00');
        ctx.fillStyle = g; ctx.fill();
      }
    };
    drawCurve(genD, '#f97316', true); drawCurve(conD, '#6366f1', false);
    if (prog < 1) requestAnimationFrame(draw);
  }; draw();
}

// ---- MODAL ----
function openModal(id) { const e = document.getElementById(id); if (e) { e.classList.add('open'); e.onclick = ev => { if (ev.target === e) closeModal(id); }; } }
function closeModal(id) { const e = document.getElementById(id); if (e) e.classList.remove('open'); }

// ---- TOAST ----
function showToast(msg, type = 'info') {
  const con = document.getElementById('toast-container'); if (!con) return;
  const t = document.createElement('div'); t.className = 'toast ' + type; t.textContent = msg;
  con.appendChild(t); setTimeout(() => t.remove(), 3100);
}

// ---- UTILS ----
function getDaysUntil(ds) { const t = new Date(); t.setHours(0, 0, 0, 0); return Math.round((new Date(ds) - t) / (86400000)); }
function formatDate(ds) { return new Date(ds).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
function escHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

// ---- INIT ----
window.addEventListener('DOMContentLoaded', () => {
  if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
      const ra = Array.isArray(r) ? r : [r, r, r, r];
      this.moveTo(x + ra[0], y); this.lineTo(x + w - ra[1], y); this.quadraticCurveTo(x + w, y, x + w, y + ra[1]);
      this.lineTo(x + w, y + h - ra[2]); this.quadraticCurveTo(x + w, y + h, x + w - ra[2], y + h);
      this.lineTo(x + ra[3], y + h); this.quadraticCurveTo(x, y + h, x, y + h - ra[3]);
      this.lineTo(x, y + ra[0]); this.quadraticCurveTo(x, y, x + ra[0], y); this.closePath();
    };
  }
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type=date]').forEach(e => { if (!e.value) e.value = today; });
  console.log('%c☀ Solar Manager ready', 'color:#f97316;font-size:16px;font-weight:bold');

  // bottom-nav hide on scroll (collapse when scrolling down, show on scroll up)
  (function () {
    let last = window.scrollY || 0; const nav = document.getElementById('bottom-nav'); if (!nav) return;
    let ticking = false;
    window.addEventListener('scroll', function () {
      const cur = window.scrollY || 0;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (cur > last + 8) nav.classList.add('collapsed');
          else if (cur < last - 8) nav.classList.remove('collapsed');
          last = cur;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  })();
});
