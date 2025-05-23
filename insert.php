<?php
session_start();
// Llamar a la conexión una vez
require_once 'controlador/connection.php';

$tarea = $_POST['tarea'];
//Sirve para proteger tu aplicación contra vulnerabilidades como 
//Cross-Site Scripting (XSS) y asegurar que los datos se muestren 
// correctamente en HTML.
$tarea = htmlspecialchars($tarea, ENT_QUOTES, "UTF-8");
$tarea = trim ($tarea);

$estado = $_POST['estado'];
$estado = htmlspecialchars($estado, ENT_QUOTES, "UTF-8");
$estado = trim ($estado);



//GUARDAMOS LA INFORMACIÓN EN NUESTRA BASE DE DATOS.

// 1. Definir la sentencia preparada
$insert = "INSERT INTO tareas(tarea , estado, id_usuario) VALUES (?, ?, ?);";
// 2. Preparación
$insert_pre = $conn->prepare($insert);
// 3. Ejecución
$insert_pre->execute([$tarea, $estado, $_POST['id_usuario']]);

// Esto destruye el objeto de la sentencia preparada (PDOStatement).
$insert_pre = null;

// Esto cierra la conexión con la base de datos.
// Aunque PHP lo hace automáticamente al final del script, 
// es buena práctica cerrarla manualmente cuando ya no la necesitas.
$conn = null;

echo "Preferencias grabadas";
// Volver a casa -> index.php
header('location: index.php');