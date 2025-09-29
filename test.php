<?php
require "db.php"; // usamos la conexión que ya hicimos

echo "<h2>Prueba de conexión a la base de datos</h2>";

// 1. Probar conexión
if ($conn->connect_error) {
    die("❌ Error de conexión: " . $conn->connect_error);
} else {
    echo "✅ Conectado correctamente a la base de datos.<br>";
}

// 2. Probar lectura de la tabla usuarios
$sql = "SELECT * FROM usuarios LIMIT 5";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    echo "<h3>Usuarios encontrados:</h3>";
    while ($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"] . " | DNI: " . $row["dni"] . " | Email: " . $row["email"] . "<br>";
    }
} else {
    echo "ℹ️ No hay registros en la tabla 'usuarios'.<br>";
}
?>
