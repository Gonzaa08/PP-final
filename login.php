<?php
require "db.php";

$email = $_POST["email"];
$pass  = $_POST["pass"];

$sql = "SELECT * FROM usuarios WHERE email=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Usuario no encontrado ❌"]);
} else {
    $user = $result->fetch_assoc();
    if (password_verify($pass, $user["password"])) {
        echo json_encode(["status" => "success", "message" => "Login exitoso ✅"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Contraseña incorrecta ❌"]);
    }
}
?>
