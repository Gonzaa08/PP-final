/* =========================================================
   SCRIPT PRINCIPAL
   Funciones ordenadas y comentadas para entender la lógica
   ========================================================= */


/* =========================================================
   1. SLIDER (CARRUSEL DE IMÁGENES)
   ========================================================= */
let index = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

if (slides.length > 0 && dots.length > 0) {
  function showSlide(n) {
    slides.forEach((slide, i) => {
      slide.style.display = (i === n) ? "block" : "none";
      dots[i].classList.toggle("active", i === n);
    });
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  // Muestra el primer slide y cambia automáticamente cada 4s
  showSlide(index);
  setInterval(nextSlide, 4000);

  // Permite cambiar manualmente con los puntos (dots)
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      showSlide(index);
    });
  });
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio) {
  console.log("✅ agregarAlCarrito()", nombre, precio);
  carrito.push({ nombre, precio: parseFloat(precio) || 0 });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function mostrarCarrito() {
  console.log("🔄 mostrarCarrito()", carrito);

  const lista = document.getElementById("listaCarrito");
  const total = document.getElementById("total");
  const contador = document.getElementById("contadorCarrito");

  if (!lista || !total) {
    console.warn("⚠ No se encontró #listaCarrito o #total en el DOM");
    return;
  }

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;

    const btn = document.createElement("button");
    btn.textContent = "✖";
    btn.classList.add("btn-eliminar");
    btn.onclick = () => eliminarDelCarrito(index);

    li.appendChild(btn);
    lista.appendChild(li);
    suma += item.precio;
  });

  total.textContent = suma.toFixed(2);

  // 🔴 ACTUALIZAR CONTADOR EN EL ICONO DEL CARRITO
  if (contador) {
    contador.textContent = carrito.length;
    contador.style.display = carrito.length > 0 ? "inline-block" : "none";
  }

  // 🔴 Mostrar/ocultar la sección del carrito según contenido
  const carritoSection = document.getElementById("carrito");
  if (carritoSection) {
    carrito.length > 0
      ? carritoSection.classList.remove("oculto")
      : carritoSection.classList.add("oculto");
  }
}

function eliminarDelCarrito(index) {
  console.log("🗑 eliminarDelCarrito()", index);
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function vaciarCarrito() {
  console.log("🧹 vaciarCarrito()");
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

// ✅ Ejecutar cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
  console.log("📂 DOM cargado, mostrando carrito");
  mostrarCarrito();

  const btnCarrito = document.getElementById("btnCarrito");
  const carritoSection = document.getElementById("carrito");

  if (btnCarrito && carritoSection) {
    btnCarrito.addEventListener("click", () => {
      carritoSection.classList.toggle("oculto");
    });
  }
});

/* =========================================================
   3. MODAL LOGIN / REGISTRO
   ========================================================= */
const modal = document.getElementById("modalRegistro");
const btn = document.getElementById("btnRegistro");
const cerrar = document.getElementById("cerrarModal");

// Funciones para abrir y cerrar modal
const abrirModal = () => {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // bloquear scroll
  // Limpiar mensajes anteriores
  const mensajeLogin = document.getElementById("mensajeLogin");
  const mensajeRegistro = document.getElementById("mensajeRegistro");
  if(mensajeLogin) mensajeLogin.textContent = "";
  if(mensajeRegistro) mensajeRegistro.textContent = "";
};

const cerrarModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // restaurar scroll
};

// Validamos que existan antes de agregar eventos
if (modal && btn && cerrar) {
  btn.addEventListener("click", abrirModal);
  cerrar.addEventListener("click", cerrarModal);

  // Cerrar al hacer click fuera del modal
  window.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
  });

  // Cerrar con tecla Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") cerrarModal();
  });
}

// ========================
// REGISTRO
// ========================
const formRegistro = document.getElementById("formRegistro");
if (formRegistro) {
    const mensajeRegistro = document.getElementById("mensajeRegistro");

    formRegistro.addEventListener("submit", e => {
        e.preventDefault();

        const dni = document.getElementById("regDNI").value;

        if (!/^\d+$/.test(dni)) {
            mensajeRegistro.textContent = "⚠️ El DNI solo puede contener números";
            mensajeRegistro.style.color = "red";
            return;
        }

        const email = document.getElementById("regEmail").value;
        const pass = document.getElementById("regPass").value;

        fetch("register.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `dni=${dni}&email=${email}&pass=${pass}`
        })
        .then(res => res.json())
        .then(data => {
            mensajeRegistro.textContent = data.message;
            mensajeRegistro.style.color = data.status === "success" ? "lightgreen" : "red";
        })
        .catch(err => {
            mensajeRegistro.textContent = "⚠️ Error de conexión con el servidor";
            mensajeRegistro.style.color = "red";
            console.error("Error en fetch:", err);
        });
    });
}


// ========================
// LOGIN
// ========================
const formLogin = document.getElementById("formLogin");
if (formLogin) {
    const mensajeLogin = document.getElementById("mensajeLogin");

    formLogin.addEventListener("submit", e => {
        e.preventDefault();

        const email = document.getElementById("logEmail").value;
        const pass = document.getElementById("logPass").value;

        fetch("login.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `email=${email}&pass=${pass}`
        })
        .then(res => res.json())
        .then(data => {
            mensajeLogin.textContent = data.message;
            mensajeLogin.style.color = data.status === "success" ? "lightgreen" : "red";

            if (data.status === "success") {
                // Ejemplo: redirigir al usuario
                setTimeout(() => window.location.href = "index.html", 1000);
            }
        })
        .catch(err => {
            mensajeLogin.textContent = "⚠️ Error de conexión con el servidor";
            mensajeLogin.style.color = "red";
            console.error("Error en fetch:", err);
        });
    });
}

/* =========================================================
   5. MOSTRAR PRODUCTOS SEGÚN CATEGORÍA
   ========================================================= */
const links = document.querySelectorAll('.dropdown-content a, .grid-categorias a');
const secciones = document.querySelectorAll('.productos');
const slider = document.querySelector('.slider');
const categoriasDestacadas = document.querySelector('.categorias-destacadas');

// Ocultamos todas las secciones al cargar
secciones.forEach(sec => sec.classList.add('oculto'));

if (links.length > 0) {
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const id = link.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;

      if (slider) slider.classList.add('oculto');
      if (categoriasDestacadas) categoriasDestacadas.classList.add('oculto');

      document.querySelectorAll('.beneficios').forEach(b => b.style.display = 'none');

      secciones.forEach(sec => sec.classList.add('oculto'));
      target.classList.remove('oculto');

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    });
  });
}


/* =========================================================
   6. VOLVER AL INICIO DESDE EL LOGO
   ========================================================= */
const logo = document.querySelector('.logo');

if (logo) {
  logo.addEventListener('click', e => {
    e.preventDefault();

    secciones.forEach(sec => sec.classList.add('oculto'));

    if (slider) slider.classList.remove('oculto');
    if (categoriasDestacadas) categoriasDestacadas.classList.remove('oculto');

    document.querySelectorAll('.beneficios').forEach(b => b.style.display = '');

    index = 0;
    if (slides.length > 0) showSlide(index);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  });
}
