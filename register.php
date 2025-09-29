<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json'); // ✅ Para que JS sepa que es JSON

require 'db.php';

$dni   = $_POST['dni'];
$email = $_POST['email'];
$pass  = $_POST['pass'];

// 🔥 Validar que el DNI contenga solo números
if (!ctype_digit($dni)) {
    http_response_code(200); // ✅ Fuerza que JS lo trate como respuesta válida
    echo json_encode([
        "status" => "error",
        "message" => "⚠️ El DNI solo puede contener números"
    ]);
    exit;
}

// Validar si ya existe email o dni
$sql = "SELECT * FROM usuarios WHERE email=? OR dni=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $dni);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "status" => "error",
        "message" => "❌ El usuario ya existe, por favor inicie sesión"
    ]);
    exit;
}

// Insertar nuevo usuario
$hash = password_hash($pass, PASSWORD_DEFAULT);
$sql = "INSERT INTO usuarios (dni, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $dni, $email, $hash);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "✅ Usuario registrado con éxito"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "❌ Error al registrar usuario: " . $conn->error
    ]);
}
