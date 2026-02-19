// Simple in-browser ML utilities: Linear Regression (OLS) and Simple Exponential Smoothing
(function () {
    function olsForecast(y, steps) {
        // y: array of numbers, index as time 0..n-1
        const n = y.length;
        if (n === 0) return { fitted: [], forecast: [] };
        const xs = Array.from({ length: n }, (_, i) => i);
        const xMean = xs.reduce((a, b) => a + b, 0) / n;
        const yMean = y.reduce((a, b) => a + b, 0) / n;
        let num = 0, den = 0;
        for (let i = 0; i < n; i++) { num += (xs[i] - xMean) * (y[i] - yMean); den += (xs[i] - xMean) * (xs[i] - xMean); }
        const slope = den === 0 ? 0 : num / den; const intercept = yMean - slope * xMean;
        const fitted = xs.map(x => intercept + slope * x);
        const forecast = []; for (let s = 1; s <= steps; s++) { const x = n - 1 + s; forecast.push(intercept + slope * x); }
        return { fitted, forecast, slope, intercept };
    }

    function expSmooth(y, alpha = 0.3, steps = 0) {
        if (!y || y.length === 0) return { fitted: [], forecast: [] };
        const fitted = [];
        // standard SES: s_t = alpha * y_t + (1-alpha) * s_{t-1}
        let s = y[0]; fitted.push(s);
        for (let i = 1; i < y.length; i++) { s = alpha * y[i] + (1 - alpha) * s; fitted.push(s); }
        // last smoothed value used as flat forecast
        const forecast = Array.from({ length: steps }, () => s);
        return { fitted, forecast, alpha };
    }

    // Find best alpha (0.01..0.99) by grid-search minimizing RMSE on provided holdout
    function findBestAlpha(train, test) {
        if (!train || train.length < 2 || !test || test.length < 1) return 0.25;
        let best = { alpha: 0.25, rmse: Number.POSITIVE_INFINITY };
        for (let a = 1; a <= 99; a++) {
            const alpha = a / 100;
            const res = expSmooth(train, alpha, test.length);
            const pred = res.forecast.slice(0, test.length);
            const r = rmse(test, pred);
            if (r !== null && r < best.rmse) { best = { alpha, rmse: r }; }
        }
        return best.alpha;
    }

    function mae(a, b) { if (!a || !b) return null; const n = Math.min(a.length, b.length); if (n === 0) return 0; let s = 0; for (let i = 0; i < n; i++) s += Math.abs(a[i] - b[i]); return s / n; }
    function rmse(a, b) { if (!a || !b) return null; const n = Math.min(a.length, b.length); if (n === 0) return 0; let s = 0; for (let i = 0; i < n; i++) { const d = a[i] - b[i]; s += d * d; } return Math.sqrt(s / n); }

    function drawForecast(canvasId, labels, actual, lrPred, esPred, futureLabels) {
        const c = document.getElementById(canvasId); if (!c) return;
        const ctx = c.getContext('2d'); const W = c.offsetWidth || 760; const H = 300; c.width = W; c.height = H; ctx.clearRect(0, 0, W, H);
        const pad = { t: 24, r: 18, b: 40, l: 44 }; const cW = W - pad.l - pad.r; const cH = H - pad.t - pad.b;
        const totalPts = labels.length + (futureLabels ? futureLabels.length : 0);
        const xp = i => pad.l + (i / Math.max(1, totalPts - 1)) * cW;
        const allY = actual.concat(futureLabels ? futureLabels.map(() => 0) : []);
        const maxVal = Math.max(...actual.concat(lrPred, esPred).map(v => v || 0)) * 1.12 || 1;
        const yp = v => pad.t + cH - (v / maxVal) * cH;

        // visibility flags used by render and legend toggles
        let visible = { actual: true, lr: true, es: true };

        // low-level render function which can draw highlight at index
        function render(highlightIndex = -1) {
            ctx.clearRect(0, 0, W, H);
            // grid
            ctx.setLineDash([3, 3]); ctx.strokeStyle = '#e6e8ec'; ctx.lineWidth = 1;
            for (let i = 0; i <= 4; i++) {
                const y = pad.t + (i / 4) * cH;
                ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke();
                ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(Math.round((1 - i / 4) * maxVal), pad.l - 6, y + 4);
            }
            ctx.setLineDash([]);

            // helper draw line
            const drawLine = (arr, color, width = 2, dash = false) => {
                ctx.beginPath(); ctx.lineWidth = width; ctx.strokeStyle = color; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; if (dash) ctx.setLineDash([6, 4]);
                for (let i = 0; i < arr.length; i++) { const x = xp(i); const y = yp(arr[i] || 0); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
                ctx.stroke(); ctx.setLineDash([]);
            };

            if (visible.actual) drawLine(actual, '#0f172a', 2.5, false);
            if (visible.lr) drawLine(lrPred, '#f97316', 2.5, false);
            if (visible.es) drawLine(esPred, '#6366f1', 2.5, true);

            // highlights
            if (highlightIndex >= 0 && highlightIndex < totalPts) {
                const drawMarker = (val, color) => {
                    const x = xp(highlightIndex); const y = yp(val || 0);
                    ctx.beginPath(); ctx.arc(x, y, 4.5, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
                    ctx.lineWidth = 1; ctx.strokeStyle = '#fff'; ctx.stroke();
                };
                // actual may be shorter than highlightIndex
                if (highlightIndex < actual.length) drawMarker(actual[highlightIndex], '#0f172a');
                if (highlightIndex < lrPred.length) drawMarker(lrPred[highlightIndex], '#f97316');
                if (highlightIndex < esPred.length) drawMarker(esPred[highlightIndex], '#6366f1');
            }

            // x labels
            ctx.fillStyle = '#374151'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
            const step = Math.max(1, Math.floor(totalPts / 8));
            for (let i = 0; i < totalPts; i += step) { const lab = i < labels.length ? labels[i] : futureLabels ? futureLabels[i - labels.length] : ''; ctx.fillText(lab, xp(i), H - 8); }

            // legend
            const legendX = W - pad.r - 10; let ly = pad.t + 6;
            [['Actual', '#0f172a'], ['LinearReg', '#f97316'], ['ExpSmooth', '#6366f1']].forEach(([t, col]) => {
                ctx.fillStyle = col; ctx.fillRect(legendX - 72, ly - 8, 12, 8);
                ctx.fillStyle = '#111'; ctx.font = '11px sans-serif'; ctx.textAlign = 'left'; ctx.fillText(' ' + t, legendX - 54, ly); ly += 18;
            });
        }

        // initial render
        render(-1);
        // store last render state so hover handlers and legend can reuse
        const state = { canvasId, labels, actual, lrPred, esPred, futureLabels, xp, yp, totalPts, render, visible };
        window._ml_lastRender = state;

        // build interactive HTML legend if present
        try {
            const legendEl = document.getElementById('ml-legend');
            if (legendEl) {
                legendEl.innerHTML = '';
                const items = [['Actual', '#0f172a', 'actual'], ['LinearReg', '#f97316', 'lr'], ['ExpSmooth', '#6366f1', 'es']];
                items.forEach(([label, color, key]) => {
                    const it = document.createElement('div'); it.className = 'ml-legend-item'; it.setAttribute('data-key', key);
                    const dot = document.createElement('span'); dot.className = 'ml-legend-dot'; dot.style.background = color;
                    const lab = document.createElement('span'); lab.textContent = label; lab.style.marginLeft = '6px';
                    it.appendChild(dot); it.appendChild(lab);
                    it.onclick = function (ev) {
                        visible[key] = !visible[key];
                        it.classList.toggle('hidden', !visible[key]);
                        // re-render with updated visibility
                        state.render(-1);
                    };
                    legendEl.appendChild(it);
                });
            }
        } catch (e) { /* ignore */ }

        // attach hover handlers for tooltip
        try {
            const tip = document.getElementById('ml-tooltip');
            c.onmousemove = function (ev) {
                const rect = c.getBoundingClientRect(); const x = ev.clientX - rect.left;
                const rel = Math.max(0, Math.min(1, (x - pad.l) / (cW))); const idx = Math.round(rel * (window._ml_lastRender.totalPts - 1));
                window._ml_lastRender.render(idx);
                if (tip) {
                    const label = (idx < labels.length) ? labels[idx] : (futureLabels ? futureLabels[idx - labels.length] : '');
                    const aVal = idx < actual.length ? actual[idx] : null;
                    const lrVal = idx < lrPred.length ? lrPred[idx] : null;
                    const esVal = idx < esPred.length ? esPred[idx] : null;
                    tip.style.display = 'block'; tip.style.left = Math.max(8, Math.min(rect.width - 8, x)) + 'px'; tip.style.top = (ev.clientY - rect.top) + 'px';
                    const fmt = v => (v === null || v === undefined) ? '—' : (Number.isFinite(v) ? (Math.round(v * 100) / 100).toFixed(2) : String(v));
                    tip.innerHTML = `<div style="font-weight:700;margin-bottom:6px">${label}</div>` +
                        (aVal !== null ? `<div>Actual: <strong>${fmt(aVal)}</strong></div>` : '') +
                        (lrVal !== null ? `<div style="color:#f97316">LR: <strong>${fmt(lrVal)}</strong></div>` : '') +
                        (esVal !== null ? `<div style="color:#6366f1">ES: <strong>${fmt(esVal)}</strong></div>` : '');
                }
            };
            c.onmouseout = function () { if (c && window._ml_lastRender) window._ml_lastRender.render(-1); if (tip) tip.style.display = 'none'; };
        } catch (e) { /* ignore hover attach errors */ }
    }

    // expose
    window.ML = { olsForecast, expSmooth, findBestAlpha, mae, rmse, drawForecast };
})();
