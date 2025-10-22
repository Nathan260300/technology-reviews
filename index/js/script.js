console.log("%c© 2025 - Nathan The Coder", "background: #282c34; color: #98c379; padding: .5em 1em; border-radius: 5px; font-weight: bold;");
console.log("%cDon't worry", "background: #282c34; color: #61afef; padding: .5em 1em; border-radius: 5px; font-weight: bold;");
console.log("%cEverything will be fine...","background: #282c34; color: #61dafb; padding: .5em 1em; border-radius: 5px; font-weight: bold;");
console.log("%chttps://technology-reviews.netlify.app", "background: #282c34; color: #e06c75; padding: .5em 1em; border-radius: 5px; font-weight: bold;");
console.log("%cMade with 🕑 and 💖 by Nathan J. – Last update : 22/10/2025","background: #282c34; color: #c678dd; padding: .5em 1em; border-radius: 5px; font-weight: bold;")

const trapLinks = document.querySelectorAll('.trap');
const overlay = document.getElementById('rickroll');
const video = document.getElementById('rr-video');

if (!overlay || !video) {
  console.warn('Overlay or video not found — check credentials.');
}

async function requestFullScreenSafe() {
  try {
    if (overlay.requestFullscreen) await overlay.requestFullscreen();
    else if (overlay.webkitRequestFullscreen) await overlay.webkitRequestFullscreen();
    else if (overlay.msRequestFullscreen) await overlay.msRequestFullscreen();
  } catch (err) {
    console.warn('Fullscreen refused/failed :', err);
  }
}

async function activateRickRoll() {
  overlay.classList.add('show');
  overlay.setAttribute('aria-hidden', 'false');

  try {
    video.muted = false;
    await video.play();
  } catch (err) {
    try {
      await video.play().catch(()=>{});
      video.muted = true; 
    } catch(e){}
  }

  await requestFullScreenSafe();

  window.addEventListener('keydown', blockKeys, true);
  window.addEventListener('contextmenu', blockEvent, true);
  window.addEventListener('selectstart', blockEvent, true);
  window.addEventListener('mousedown', blockEvent, true);
  window.addEventListener('mouseup', blockEvent, true);
}

function blockKeys(e) {
  if (!overlay.classList.contains('show')) return;
  if (e.key === 'Escape') {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
}

function blockEvent(e) {
  if (!overlay.classList.contains('show')) return;
  e.preventDefault();
  e.stopPropagation();
}

async function deactivateRickRoll() {
  overlay.classList.remove('show');
  overlay.setAttribute('aria-hidden', 'true');
  window.removeEventListener('keydown', blockKeys, true);
  window.removeEventListener('contextmenu', blockEvent, true);
  window.removeEventListener('selectstart', blockEvent, true);
  window.removeEventListener('mousedown', blockEvent, true);
  window.removeEventListener('mouseup', blockEvent, true);

  try {
    video.pause();
    video.currentTime = 0;
  } catch (err) {}

  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (document.webkitFullscreenElement) document.webkitExitFullscreen();
  } catch (err) {
    console.warn('Error when exiting fullscreen :', err);
  }
}

trapLinks.forEach(link => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();
    await activateRickRoll();
  });
});

video.loop = true; 
