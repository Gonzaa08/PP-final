function loadHTML(id, file) {
  console.log("📥 Cargando:", file, "en", "#" + id);
  return fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("No se pudo cargar " + file);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
      console.log("✅ Insertado:", file);
    })
    .catch(err => console.error("❌ Error cargando", file, err));
}

Promise.all([
  loadHTML("header", "partials/header.html"),
  loadHTML("slider", "partials/slider.html"),
  loadHTML("categorias", "partials/categorias.html"),
  loadHTML("beneficios", "partials/beneficios.html"),
  loadHTML("carrito-container", "partials/carrito.html"),
  loadHTML("modal", "partials/modal.html"),
  loadHTML("productos", "partials/productos.html"),
  loadHTML("footer", "partials/footer.html")
])
.then(() => {
  console.log("✅ Todos los partials cargados");
  // Disparamos un evento global para avisar que el DOM ya está listo
  document.dispatchEvent(new Event("partialsLoaded"));
})
.catch(err => console.error("❌ Error global cargando partials:", err));
