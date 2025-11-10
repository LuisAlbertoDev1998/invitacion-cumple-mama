document.addEventListener("DOMContentLoaded",()=>{
const evento=new Date("Nov 16, 2025 18:00:00").getTime();
const d=document;
function actualizar(){
 const ahora=new Date().getTime();
 const dist=evento-ahora;
 const dias=Math.floor(dist/(1000*60*60*24));
 const horas=Math.floor((dist%(1000*60*60*24))/(1000*60*60));
 const minutos=Math.floor((dist%(1000*60*60))/(1000*60));
 const segundos=Math.floor((dist%(1000*60))/1000);
 d.getElementById("dias").innerText=dias;
 d.getElementById("horas").innerText=horas;
 d.getElementById("minutos").innerText=minutos;
 d.getElementById("segundos").innerText=segundos;
}
setInterval(actualizar,1000);
const form=d.getElementById("rsvpForm");
const lista=d.getElementById("listaRespuestas");
const gracias=d.getElementById("gracias");
const reset=d.getElementById("reset");
function mostrarRespuestas(){
 lista.innerHTML="";
 const datos=JSON.parse(localStorage.getItem("rsvps")||"[]");
 datos.forEach(e=>{const li=d.createElement("li");li.textContent=`${e.nombre} - ${e.asistencia} (${e.mensaje})`;lista.appendChild(li);});
}
form.addEventListener("submit",e=>{e.preventDefault();
 const nombre=d.getElementById("nombreInput").value;
 const asistencia=d.getElementById("asistencia").value;
 const mensaje=d.getElementById("mensajeInput").value;
 const datos=JSON.parse(localStorage.getItem("rsvps")||"[]");
 datos.push({nombre,asistencia,mensaje});
 localStorage.setItem("rsvps",JSON.stringify(datos));
 form.classList.add("hidden");gracias.classList.remove("hidden");mostrarRespuestas();
});
reset.addEventListener("click",()=>{gracias.classList.add("hidden");form.classList.remove("hidden");});
mostrarRespuestas();
const player=d.getElementById("player");
const autoplay=d.getElementById("autoplay");
autoplay.addEventListener("change",()=>{if(autoplay.checked){player.play();}});
});
window.addEventListener('click', () => {
  const player = document.getElementById('player');
  if (player.paused) player.play();
}, { once: true });
