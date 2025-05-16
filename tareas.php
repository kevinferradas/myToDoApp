<?php

// Llamar a la conexión una vez
require_once 'controlador/connection.php';


/* Realizamos una consulta segura a una base de datos usando 
PDO (PHP Data Objects) para obtener todas las tareas 
asociadas a un usuario específico en una tabla llamada tareas */

/* 1. Definir la sentencia (query)

Se define una consulta SQL con un marcador de posición ?, 
lo que indica que se usará una variable (en este caso, el id_usuario) 
más adelante. Esto ayuda a prevenir inyecciones SQL.
*/
$select = "SELECT * FROM tareas WHERE id_usuario = ?;";

/* 2. Preparación
Se prepara la sentencia SQL usando el objeto de conexión $conn. 
Esto convierte la cadena $select en una sentencia lista para 
recibir valores externos de forma segura.

*/
$select_pre = $conn->prepare($select);

/* 3. Ejecución
Se ejecuta la consulta, reemplazando el ? en la sentencia por el valor
 de $_SESSION['id_usuario'] (es decir, el ID del usuario
  actualmente conectado). Se usa un array porque execute() 
  puede recibir múltiples parámetros si hay varios ?.
*/
$select_pre->execute(array($_SESSION['id_usuario']));

/* 4. Obtención de los valores
Se obtienen todas las filas que resultaron de la consulta en un
 arreglo. Cada fila representa una tarea asociada al usuario.
*/
$array_filas = $select_pre->fetchAll();



?>

<!DOCTYPE html>
<html lang="es">
<head>
    <?php include_once 'modulos/meta.php';?>
    <title>My TO-DO APP</title>
    
</head>
<body>
    <?php include_once 'modulos/header.php';?>
    <main>
        <section>
            <!-- FORMULARIO PARA INGRESAR TAREA Y SU ESTADO -->
            <form action="#" name="formActividad" class="formActividad">
                <p>Introducir tarea y definir estado </p>
                <div class = "divActividad">
                    <input type="text" 
                    name="actividad" 
                    id="actividad"
                    placeholder="Ingrese la actividad">
                    <select name="estado" >
                        <option value="pendientes" selected>Pendiente </option>
                        <option value="ejecucion" >En ejecución</option>
                        <option value="finalizadas" >Finalizada</option>
                    </select>
                <input type="submit" value="Añadir Tarea">
                </div>
                

            </form>
            
        </section>

        <!-- Pendientes -->
        <section >
            <h2>Pendientes</h2>
            <div id="pendientes"></div>

        </section>

        <!-- En ejecución -->
        <section >
            <h2>En ejecución</h2>
            <div id="ejecucion"></div>

        </section>

        <!-- En ejecución -->
        <section >
            <h2>Finalizadas </h2>
            <div id="finalizadas"></div>

        </section>

    </main>
    <script src="js/script.js"></script>
</body>
</html>