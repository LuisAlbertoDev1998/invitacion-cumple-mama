// ===== Contador =====
const eventDate = new Date('2025-11-16T15:30:00'); // hora local del evento
function updateCountdown(){
  const now = new Date();
  let diff = eventDate - now;
  if(diff < 0) diff = 0;
  const dias = Math.floor(diff / (1000*60*60*24));
  const horas = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const minutos = Math.floor((diff % (1000*60*60)) / (1000*60));
  const segundos = Math.floor((diff % (1000*60)) / 1000);
  document.getElementById('dias').innerText = dias;
  document.getElementById('horas').innerText = String(horas).padStart(2,'0');
  document.getElementById('minutos').innerText = String(minutos).padStart(2,'0');
  document.getElementById('segundos').innerText = String(segundos).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

// ===== audio play/pause discreet =====
const player = document.getElementById('player');
const playBtn = document.getElementById('playBtn');
const audioFloat = document.getElementById('audioFloat');

function setPlayUI(isPlaying){
  playBtn.textContent = isPlaying ? '❚❚' : '▶';
}
playBtn.addEventListener('click',(e)=>{
  e.stopPropagation();
  if(player.paused){ player.play().catch(()=>{}); setPlayUI(true); }
  else{ player.pause(); setPlayUI(false); }
});

// allow single user gesture to autoplay: click anywhere once to enable
let gestureAdded = false;
function enableOnFirstGesture(){
  if(gestureAdded) return;
  gestureAdded = true;
  window.addEventListener('click', function once(){
    player.play().then(()=> setPlayUI(true)).catch(()=>{} );
    window.removeEventListener('click', once);
  });
}
enableOnFirstGesture();

// ===== corazones flotantes suaves =====
const heartsContainer = document.getElementById('hearts');
function createHeart(){
  const heart = document.createElement('div');
  heart.textContent = '💖';
  heart.style.position = 'absolute';
  heart.style.left = Math.random()*100 + 'vw';
  heart.style.bottom = '-40px';
  heart.style.fontSize = (12 + Math.random()*20) + 'px';
  heart.style.opacity = 0.85;
  heart.style.transition = 'transform 6s linear, opacity 6s linear';
  heartsContainer.appendChild(heart);
  // trigger animation
  requestAnimationFrame(()=> {
    heart.style.transform = `translateY(-110vh) translateX(${(Math.random()-0.5)*20}vw)`;
    heart.style.opacity = 0;
  });
  setTimeout(()=> heart.remove(), 6500);
}
// create hearts occasionally for soft effect
setInterval(()=> {
  if(Math.random() < 0.6) createHeart();
}, 800);

// small accessibility: pause hearts on mobile to save CPU
if(window.innerWidth < 600){
  clearInterval();
}
