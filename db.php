<?php
$host = "localhost";
$user = "root";     // tu usuario de MySQL
$pass = "";         // tu contraseña de MySQL
$db   = "mi_base";  // tu base de datos

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
