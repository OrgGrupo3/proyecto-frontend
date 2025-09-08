const glampingAPI = {
  obtener_p: async () => {
    await new Promise(r => setTimeout(r, 500));
    return [
      { id:1, nombre:"Caño Cristales, Meta",
        imagenes:["/IMAGENES/descargar (1).jpg","/IMAGENES/CañoCristales2.jpg","/IMAGENES/CañoCristales3.jpg"],
        capacidad:"2 - 4", locacion:"Macarena, Meta", precio:"150.000 COP" },
      { id:2, nombre:"Laguna del Cocuy",
        imagenes:["/IMAGENES/descargar.jpg","/IMAGENES/LagunadelCocuy2.jpg","/IMAGENES/LagunadelCocuy3.jpg"],
        capacidad:"1 - 3", locacion:"Güicán, Boyacá", precio:"90.000 COP" },
      { id:3, nombre:"Jardín Botánico, Bogotá",
        imagenes:["/IMAGENES/OIP.jpg","/IMAGENES/JardínBotánico2.jpg","/IMAGENES/JardínBotánico3.jpg"],
        capacidad:"Grupo de 6", locacion:"Salitre, Bogotá", precio:"20.000 COP por persona" },
      { id:4, nombre:"Finca San Cayetano",
        imagenes:["/IMAGENES/finca.jpg","/IMAGENES/FincaSanCayetano2.jpg","/IMAGENES/FincaSanCayetano3.jpg"],
        capacidad:"8 - 12", locacion:"Santa Elena, Antioquia", precio:"450.000 COP" },
      { id:5, nombre:"Reserva Natural, Quindío",
        imagenes:["/IMAGENES/OIP1.jpg","/IMAGENES/ReservaNatural2.jpg","/IMAGENES/ReservaNatural3.jpg"],
        capacidad:"2 - 4", locacion:"Salento, Quindío", precio:"120.000 COP" },
      { id:6, nombre:"Casa Rural, Cundinamarca",
        imagenes:["/IMAGENES/OIP2.jpg","/IMAGENES/Cundinamarca2.jpg","/IMAGENES/Cundinamarca3.jpg"],
        capacidad:"6 - 10", locacion:"Guatavita, Cundinamarca", precio:"300.000 COP" },
      { id:7, nombre:"Parque Simón Bolívar",
        imagenes:["/IMAGENES/OIP3.jpg","/IMAGENES/ParqueSimónBolívar2.jpg","/IMAGENES/ParqueSimónBolívar3.jpg"],
        capacidad:"Familia de 4", locacion:"Bogotá, Colombia", precio:"10.000 COP por día" },
      { id:8, nombre:"Casa Finca de campo moderna",
        imagenes:["/IMAGENES/finca2.jpg","/IMAGENES/CasaFincaCampo2.jpg","/IMAGENES/CasaFincaCampo3.jpg"],
        capacidad:"6-8", locacion:"Cundinamarca, Colombia", precio:"350.000 COP" },
      { id:9, nombre:"Casa Finca Indigo",
        imagenes:["/IMAGENES/OIPP.jpg","/IMAGENES/CasaFincaIndigo2.jpg","/IMAGENES/CasaFincaIndigo3.jpg"],
        capacidad:"6 - 8", locacion:"Armenia, Quindío", precio:"1.500.000 COP" }
    ];
  }
};

async function poriedadesGlampingHub(){
  const properties = await glampingAPI.obtener_p();
  const container = document.getElementById('propiedades_glamping');
  if(!container) return;
  container.innerHTML = '';

  properties.forEach(p => {
    const card = document.createElement('div');
    card.className = 'glamping-card';

    // Indicadores e items
    const indicators = p.imagenes.map((_,i)=>
      `<button type="button" data-bs-target="#carousel-${p.id}" data-bs-slide-to="${i}" ${i===0?'class="active" aria-current="true"':''}></button>`
    ).join('');

    const items = p.imagenes.map((src,i)=>
      `<div class="carousel-item ${i===0?'active':''}">
         <img src="${src}" class="d-block w-100 glamping-img" alt="${p.nombre}">
       </div>`
    ).join('');

    card.innerHTML = `
      <div id="carousel-${p.id}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">${indicators}</div>
        <div class="carousel-inner">${items}</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${p.id}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-${p.id}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
      </div>`;

    // Abrir modal solo si NO se hace clic en flechas/indicadores
    card.addEventListener('click', (e)=>{
      if (e.target.closest('.carousel-control-prev, .carousel-control-next, .carousel-indicators button')) return;
      mostrarModal(p);
    });

    container.appendChild(card);
  });
}

function mostrarModal(p){
  const modal = document.createElement('div');
  modal.className = 'gh-modal';

  const slides = p.imagenes.map((src,i)=>
    `<div class="carousel-item ${i===0?'active':''}">
       <img src="${src}" class="d-block w-100" alt="${p.nombre}">
     </div>`
  ).join('');

  modal.innerHTML = `
    <div class="gh-modal-content">
      <span class="gh-close">&times;</span>
      <h2>${p.nombre}</h2>

      <div id="modal-carousel-${p.id}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">${slides}</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#modal-carousel-${p.id}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#modal-carousel-${p.id}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
      </div>

      <p><strong>Capacidad:</strong> ${p.capacidad}</p>
      <p><strong>Ubicación:</strong> ${p.locacion}</p>
      <p><strong>Precio:</strong> ${p.precio}</p>
      <button class="btn-arrendar">Arrendar</button>
    </div>`;

  document.body.appendChild(modal);

  modal.querySelector('.gh-close').onclick = ()=> modal.remove();
  modal.addEventListener('click', e=>{ if(e.target === modal) modal.remove(); });
  modal.querySelector('.btn-arrendar').onclick = ()=>{
    alert(`✅ Has solicitado arrendar: ${p.nombre}\n📍 Ubicación: ${p.locacion}\n💰 Precio: ${p.precio}`);
  };
}

document.addEventListener('DOMContentLoaded', poriedadesGlampingHub);
