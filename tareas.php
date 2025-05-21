<?php

// Llamar a la conexión una vez
require_once 'controlador/connection.php';


/* Realizamos una consulta segura a una base de datos usando 
PDO (PHP Data Objects) para obtener todas las tareas 
asociadas a un usuario específico en una tabla llamada tareas */

/* 1. Definir la sentencia (query)

Se define una consulta SQL con un marcador de posición ?, 
lo que indica que se usará una variable (en este caso, el
 id_usuario) más adelante. Esto ayuda a prevenir inyecciones SQL.
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
 arreglo. Cada fila representa una tarea asociada al usuario.Hola
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
            <h2>Nuestras tareas</h2>
            

            <h3>Pendientes</h3>
            <div id="pendientes">
            <?php foreach ($array_filas as $fila) {
                if ($fila['estado'] === 'pendientes') {
                
                echo '<p>' . htmlspecialchars($fila['tarea'], ENT_QUOTES, 'UTF-8') . '</p>';
            }
            }?>
       
                


    




            <!-- En ejecución -->
            <div>
                <h3>En ejecución</h2>
                <div id="ejecucion"></div>
            </div>

            <!-- En ejecución -->
            <div>
                <h3>Finalizadas </h2>
                <div id="finalizadas"></div>
            </div>
            <?php endforeach ?>
        </section>

        <section>
            <h2>Modifica tu tarea</h2>
            <!-- FORMULARIO PARA INGRESAR TAREA Y SU ESTADO -->
            <!-- El formulario enviará la información al fichero update.php
            y lo hará mediante el método POST. -->
                <form action="update.php" method="post" class="formColores">
                    <!-- <input type="hidden" name="id_color" value="<?= $_GET['id'] ?>"> -->
                    <fieldset>
                        <div>
                            <label for="tarea">Nombre del usuario</label>
                            <input type="text" id="tarea" name="tarea" value="<?= $_GET['tarea'] ?>" maxlength="50">
                        </div>
                        <div>
                            <select name="estado" id="estado">
                                <option value="pendientes" selected>Pendiente </option>
                                <option value="ejecucion" >En ejecución</option>
                                <option value="finalizadas" >Finalizada</option>
                            </select>
                        </div>
                        <div>
                            <button type="submit">Modificar tarea</button>
                            <button type="reset">Borrar</button> 
                        
                        </div>
                    </fieldset>

                </form>

            <h2>Introducir tarea y definir estado</h2>
            <!-- FORMULARIO PARA INGRESAR TAREA Y SU ESTADO -->
             
             <!-- -- Al no poner acción, no hay transición hacia otra página
             -- Al no poner método, el navegador usa GET por defecto. -->
            
            <form action="#" name="formInsert" class="formInsert">
            
                <!-- Enviamos el id_usuario conectado a través del método GET  -->
                <input type="hidden" name="id_usuario" value="<?= $_SESSION['id_usuario'] ?>">

                <!-- En viamos el token del usuario conectado a través del método GET -->
                <input type="hidden" name="token" value="<?= $_SESSION['token'] ?>">

                <!-- Método del pote de miel ( algo así) -->
                <input type="text" name="web" style="display:none">

                <fieldset>
                    <div>
                        <label for="tarea">Tarea:</label>
                        <input type="text" 
                        id="tarea" 
                        name="tarea"
                        placeholder="Ingrese la actividad">
                    </div>
                    <div>
                        <select name="estado" id="estado">
                            <option value="pendientes" selected>Pendiente </option>
                            <option value="ejecucion" >En ejecución</option>
                            <option value="finalizadas" >Finalizada</option>
                        </select>
                        
                    </div>
                    <div>
                        <button type="submit">Añadir tarea</button>
                        <button type="reset">Borrar tarea</button>
                    </div>
                    
                </fieldset>

             
                <div class = "divActividad">
                    <input type="text" 
                    name="actividad" 
                    id="actividad"
                    placeholder="Ingrese la actividad">
                    
                </div>
                

            </form>
            
        </section>



    </main>
    <script src="js/script.js"></script>
</body>
</html>