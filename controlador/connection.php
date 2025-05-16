<?php

// Datos de acceso a la Base de Datos
// $host = "localhost";
$host = "127.0.0.1";
$database = "gestortareas";
$port = 3307; // Puerto en el que el servidor MySQL está escuchando
$user = "root";
$password = "root";


/* Establecemos una conexión a una base de datos MySQL 
utilizando PDO (PHP Data Objects).*/

try {
    $conn = new PDO ("mysql:host=$host;port=$port;dbname=$database;", $user, $password );
        // echo "Conectados Kevin!!";

        //Demo de la coneión exitosa
        // foreach ($conn -> query("SELECT * FROM tareas") as $fila) {
        //     echo "<pre>";
        //     print_r ($fila);
        //     echo "</pre>";
        // }

} catch (PDOException $e) {
    echo $e->getMessage();
}
