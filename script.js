
/* ═══════════════════════════════════════
   ELDORIA — Main JavaScript
   ═══════════════════════════════════════ */






    // click Play welcome sound via local

    (function () {
      const audio = new Audio('pagehover.mp3');

      audio.play().catch(() => {
        // Autoplay blocked — play on first user gesture
        const unlock = () => {
          audio.play();
          document.removeEventListener('click', unlock);
          document.removeEventListener('keydown', unlock);
          document.removeEventListener('touchstart', unlock);
        };
        document.addEventListener('click', unlock);
        document.addEventListener('keydown', unlock);
        document.addEventListener('touchstart', unlock);
      });
    })();







(function () {
  'use strict';

  /* ── WELCOME OVERLAY ── */
  function initWelcome() {
    const overlay = document.getElementById('welcome-overlay');
    if (!overlay) return;

    // Play welcome sound via Web Audio
    function playWelcomeSound() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();

        // Deep bell-like tone
        function bell(freq, time, dur) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = freq * 2;
          osc.type = 'sine';
          osc.frequency.value = freq;
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(0.12, time + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
          osc.start(time);
          osc.stop(time + dur);
        }

        // Medieval-ish chord sequence
        const t = ctx.currentTime;
        bell(220, t + 0.1, 2.5);
        bell(330, t + 0.4, 2.2);
        bell(440, t + 0.7, 1.8);
        bell(165, t + 0.0, 3.0);

        // Wind/ambience
        const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.03;
        const noise = ctx.createBufferSource();
        const nFilter = ctx.createBiquadFilter();
        const nGain = ctx.createGain();
        nFilter.type = 'bandpass';
        nFilter.frequency.value = 300;
        nFilter.Q.value = 0.5;
        nGain.gain.setValueAtTime(0, t);
        nGain.gain.linearRampToValueAtTime(0.06, t + 0.5);
        nGain.gain.linearRampToValueAtTime(0, t + 2.5);
        noise.buffer = buf;
        noise.connect(nFilter);
        nFilter.connect(nGain);
        nGain.connect(ctx.destination);
        noise.start(t);
      } catch (e) { /* audio not available */ }
    }

    // Auto-dismiss after 3.8 seconds, or on click/keypress
    function dismiss() {
      overlay.classList.add('fade-out');
      setTimeout(() => { overlay.style.display = 'none'; }, 1600);
    }

    playWelcomeSound();
    setTimeout(dismiss, 3800);
    overlay.addEventListener('click', dismiss);
    document.addEventListener('keydown', dismiss, { once: true });
  }



  /* ── BACKGROUND MUSIC ── */
  // Single <audio> element that streams eldoria.mp3 from the same folder.
  // Created once and reused so the track resumes from where it paused.
  let bgAudio = null;
  let bgMusicEnabled = false;

  function getBgAudio() {
    if (!bgAudio) {
      //*  ❮❮❮〇⭕ Mouse Cursore arrow ⮞ ⭕〇❯❯❯  *//     ⮜⚙️⮞ 

      bgAudio = new Audio('eldoria.mp3');

      //*  ❮❮❮〇 Mouse Cursore arrow ⮞ 〇❯❯❯  *//      ⮜⚙️⮞  
      bgAudio.loop   = true;
      bgAudio.volume = 0.1;
    }
    return bgAudio;
  }

  function startBgMusic() {
    if (bgMusicEnabled) return;
    try {
      getBgAudio().play().then(() => {
        bgMusicEnabled = true;
        updateAudioIndicator(true);
      }).catch(() => {
        // Autoplay blocked — will retry on next user gesture
        bgMusicEnabled = false;
        updateAudioIndicator(false);
      });
    } catch (e) {}
  }

  function stopBgMusic() {
    if (!bgMusicEnabled) return;
    try {
      getBgAudio().pause();
    } catch (e) {}
    bgMusicEnabled = false;
    updateAudioIndicator(false);
  }

  function toggleBgMusic() {
    if (bgMusicEnabled) stopBgMusic();
    else startBgMusic();
  }

  function updateAudioIndicator(on) {
    const ind = document.getElementById('audio-indicator');
    if (!ind) return;
    const label = ind.querySelector('.audio-label');
    if (on) {
      ind.classList.remove('muted');
      if (label) label.textContent = 'Music On';
    } else {
      ind.classList.add('muted');
      if (label) label.textContent = 'Music Off';
    }
  }


  /* ── SETTINGS PANEL ── */
  function initSettings() {
    const btn = document.getElementById('settings-btn');
    const panel = document.getElementById('settings-panel');
    if (!btn || !panel) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && e.target !== btn) {
        panel.classList.remove('open');
      }
    });

    // Mode buttons
    document.querySelectorAll('.mode-btn').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const mode = b.dataset.mode;
        document.body.className = document.body.className
          .replace(/\bmode-\S+/g, '').trim();
        if (mode !== 'dark') document.body.classList.add('mode-' + mode);
        localStorage.setItem('eldoria-mode', mode);
      });
    });

    // Music toggle
    const musicToggle = document.getElementById('music-toggle');
    if (musicToggle) {
      musicToggle.addEventListener('change', () => {
        if (musicToggle.checked) startBgMusic();
        else stopBgMusic();
        localStorage.setItem('eldoria-music', musicToggle.checked ? '1' : '0');
      });
    }

    // Particles toggle
    const particlesToggle = document.getElementById('particles-toggle');
    if (particlesToggle) {
      particlesToggle.addEventListener('change', () => {
        const canvas = document.getElementById('particles-canvas');
        if (canvas) canvas.style.display = particlesToggle.checked ? 'block' : 'none';
        localStorage.setItem('eldoria-particles', particlesToggle.checked ? '1' : '0');
      });
    }

    // Restore saved prefs
    const savedMode = localStorage.getItem('eldoria-mode') || 'dark';
    document.body.className = document.body.className.replace(/\bmode-\S+/g, '').trim();
    if (savedMode !== 'dark') document.body.classList.add('mode-' + savedMode);
    document.querySelectorAll('.mode-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === savedMode);
    });
  }

  /* ── SOCIAL DROPDOWN ── */
  function initSocial() {
    const toggle = document.querySelector('.social-toggle');
    const scroll = document.querySelector('.social-scroll');
    if (!toggle || !scroll) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = scroll.classList.toggle('open');
      toggle.classList.toggle('open', open);
    });

    document.addEventListener('click', () => {
      scroll.classList.remove('open');
      toggle.classList.remove('open');
    });
    scroll.addEventListener('click', e => e.stopPropagation());
  }

  /* ── SCROLL REVEAL ── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
  }

  /* ── PARTICLES (floating embers) ── */
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -(Math.random() * 0.6 + 0.3);
        this.life = 3;
        this.decay = Math.random() * 0.003 + 0.002;
        this.size = Math.random() * 2.5 + 0.5;
        this.hue = Math.random() > 0.7 ? 200 : 35;
        this.sat = this.hue === 200 ? 60 : 80;
      }
      update() {
        this.x += this.vx + Math.sin(Date.now() * 0.001 + this.y * 0.01) * 0.1;
        this.y += this.vy;
        this.life -= this.decay;
        if (this.life <= 0 || this.y < -10) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.life * 0.35;
        ctx.fillStyle = `hsl(${this.hue}, ${this.sat}%, 60%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 60; i++) {
      const p = new Particle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    }
    animate();

    // Check saved pref
    const saved = localStorage.getItem('eldoria-particles');
    if (saved === '0') canvas.style.display = 'none';
  }

  /* ── NAVBAR SCROLL EFFECT ── */
  function initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.style.background = window.scrollY > 60
        ? 'rgba(3,2,1,0.98)'
        : 'linear-gradient(to bottom, rgba(5,3,1,0.97), rgba(5,3,1,0.7))';
    }, { passive: true });
  }

  /* ── AUDIO INDICATOR ── */
  function initAudioIndicator() {
    const ind = document.getElementById('audio-indicator');
    if (!ind) return;
    ind.addEventListener('click', toggleBgMusic);
  }

  /* ── ACTIVE NAV LINK ── */
  function markActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-btn[data-page]').forEach(a => {
      a.classList.toggle('nav-active', a.dataset.page === page);
    });
  }

  /* ── KEY HOVER TITLES & SOUNDS ── */
  function playKeySound(audio) {
    try {
      const clone = audio.cloneNode();
      clone.volume = 0.6;
      clone.play().catch(() => {});
    } catch (e) {}
  }

  function initKeys() {
    const sndGotKey   = new Audio('got_key.mp3');
    const sndEmptyKey = new Audio('empty_key.mp3');
    sndGotKey.preload   = 'auto';
    sndEmptyKey.preload = 'auto';

    const names = [
      'Key of Dawn', 'Key of Ash', 'Key of Stone', 'Key of Tide',
      'Key of Wind', 'Key of Flame', 'Key of Shadow', 'Key of Blood',
      'Key of Stars', 'Key of Bone', 'Key of Ice', 'Key of Void'
    ];
    document.querySelectorAll('.key-item').forEach((k, i) => {
      k.title = names[i] || 'Unknown Key';
      const isUngained = k.style.opacity === '0.3' || k.style.filter === 'grayscale(1)';
      k.addEventListener('mouseenter', () => {
        playKeySound(isUngained ? sndEmptyKey : sndGotKey);
      });
    });
  }

  /* ── STORY PAGE: CLAN HOVER SOUND ── */
  function initClanCards() {
    document.querySelectorAll('.clan-card').forEach(c => {
      c.addEventListener('mouseenter', () => {
        try {
          const ctx2 = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx2.createOscillator();
          const g = ctx2.createGain();
          osc.type = 'sine';
          osc.frequency.value = c.classList.contains('bloodcrest') ? 180
            : c.classList.contains('nighthowl') ? 220 : 260;
          g.gain.setValueAtTime(0.04, ctx2.currentTime);
          g.gain.exponentialRampToValueAtTime(0.001, ctx2.currentTime + 0.4);
          osc.connect(g);
          g.connect(ctx2.destination);
          osc.start();
          osc.stop(ctx2.currentTime + 0.4);
        } catch (e) {}
      });
    });
  }

  /* ── PRESS PAGE: VIDEO ── */
  function initVideoPage() {
    const playBtn = document.querySelector('.play-icon');
    const videoContainer = document.querySelector('.video-frame');
    if (!playBtn || !videoContainer) return;

    playBtn.addEventListener('click', () => {
      // Replace placeholder with actual local video
      const video = document.createElement('video');
      video.src = 'eldoria-video.mp4';
      video.controls = true;
      video.autoplay = true;
      video.style.cssText = 'width:100%;height:100%;object-fit:cover;';
      video.onerror = () => {
        const msg = videoContainer.querySelector('.video-placeholder');
        if (msg) {
          msg.innerHTML = `
            <div style="color:var(--gold-dim);font-family:var(--font-heading);font-size:0.8rem;letter-spacing:0.2em;line-height:2;">
              <p>⚔</p>
              <p>Place your video file named</p>
              <p style="color:var(--gold);">eldoria-video.mp4</p>
              <p>in the same folder as this website</p>
            </div>`;
        }
      };
      const placeholder = videoContainer.querySelector('.video-placeholder');
      if (placeholder) placeholder.style.display = 'none';
      videoContainer.appendChild(video);
    });
  }

  /* ── INTERACTION SOUNDS ── */
  function playOnce(audio, volume) {
    try {
      const clone = audio.cloneNode();
      clone.volume = volume !== undefined ? volume : 0.55;
      clone.play().catch(() => {});
    } catch (e) {}
  }

  function initInteractionSounds() {
    // Audio objects created here — inside DOMContentLoaded — so the
    // browser already has a user-gesture context and won't block them.
    const sndFullLoreHover  = new Audio('pagehover2.mp3');
    const sndDevLogsHover  = new Audio('pagehover2.mp3');
    const sndPresssHover  = new Audio('pagehover.mp3');
    const sndBtnHover  = new Audio('buttonhover.mp3');
    const sndBtnClick  = new Audio('buttonclick.mp3');
    const sndPageHover = new Audio('pagehover.mp3');
    const sndPageFlip  = new Audio('pageflip.mp3');
    [sndBtnHover, sndBtnClick, sndPageHover, sndPageFlip].forEach(s => {
      s.preload = 'auto';
    });

    // ── BEGIN YOUR JOURNEY button (btn-primary in the hero) ──
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mouseenter', () => playOnce(sndBtnHover, 0.5));
      btn.addEventListener('click',      () => playOnce(sndBtnClick, 0.65));
    });

    // ── "How to Join" bottom-link-btn ──
    document.querySelectorAll('.bottom-link-btn').forEach(link => {
      if ((link.textContent || '').includes('How to Join')) {
        link.addEventListener('mouseenter', () => playOnce(sndPageHover, 0.5));
        link.addEventListener('click',      () => playOnce(sndPageFlip,  0.65));
      }
    });

    // ── "Full Lore" bottom-link-btn ──
    document.querySelectorAll('.bottom-link-btn').forEach(link => {
      if ((link.textContent || '').includes('Full Lore')) {
        link.addEventListener('mouseenter', () => playOnce(sndFullLoreHover, 0.5));
        link.addEventListener('click',      () => playOnce(sndFullLoreHover,  0.65));
      }
    });

    // ── "Dev Logs" bottom-link-btn ──
    document.querySelectorAll('.bottom-link-btn').forEach(link => {
      if ((link.textContent || '').includes('Dev Logs')) {
        link.addEventListener('mouseenter', () => playOnce(sndDevLogsHover, 0.5));
        link.addEventListener('click',      () => playOnce(sndDevLogsHover,  0.65));
      }
    });

    // ── "Press" bottom-link-btn ──
    document.querySelectorAll('.bottom-link-btn').forEach(link => {
      if ((link.textContent || '').includes('Press')) {
        link.addEventListener('mouseenter', () => playOnce(sndPresssHover, 0.5));
        link.addEventListener('click',      () => playOnce(sndPresssHover,  0.65));
      }
    });

  }

  /* ── INIT ALL ── */
  document.addEventListener('DOMContentLoaded', () => {
    initWelcome();
    initSettings();
    initSocial();
    initReveal();
    initParticles();
    initNavbar();
    initAudioIndicator();
    markActiveNav();
    initKeys();
    initClanCards();
    initVideoPage();
    initInteractionSounds();
  });

})();

