<?php

// Llamar a la conexión una vez
require_once 'controlador/connection.php';


print_r($_POST);
$tarea = $_POST['tarea'];
$estado = $_POST['estado'];
$id_tarea = $_POST['id_tarea'];


// 1. Definir la sentencia preparada
$update = "UPDATE tareas set tarea = ?, estado = ? WHERE id_tarea = ?;";
// 2. Preparación
$update_pre = $conn->prepare($update);
// 3. Ejecución
$update_pre->execute([$tarea, $estado, $id_tarea]);

$update_pre = null;
$conn = null;

// Volver a casa -> index.php
header('location: tareas.php');

