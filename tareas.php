<?php

// Llamar a la conexión una vez
require_once 'controlador/connection.php';


/* Realizamos una consulta segura a una base de datos usando 
PDO (PHP Data Objects) para obtener todas las tareas 
asociadas a un usuario específico en una tabla llamada tareas */

$userId = 1;

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
$select_pre->execute([$userId]);
// $select_pre->execute(array($_SESSION['id_usuario']));

/* 4. Obtención de los valores
Se obtienen todas las filas que resultaron de la consulta en un
 arreglo. Cada fila representa una tarea asociada al usuario.Hola
*/

$array_filas = $select_pre->fetchAll();
// echo '<pre>';
// print_r($array_filas);
// echo '</pre>';


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
            
            
                <!-- Pendientes -->
                <div id="pendientes">
                    <h3>Pendientes</h3>
                        <?php foreach ($array_filas as $fila) : ?>

                            <?php if ($fila['estado'] === 'pendientes') : ?> 

                                <p> <?= htmlspecialchars($fila['tarea'], ENT_QUOTES, "UTF-8")  ?> </p>
                            <?php  endif; ?> 
                        <?php endforeach ?>

                </div>

                <!-- En ejecución -->  
                <div id="ejecucion">
                    <h3>En ejecución</h3>

                    <?php foreach ($array_filas as $fila) : ?>

                    <?php if ($fila['estado'] === 'ejecucion') : ?> 

                        <p> <?= htmlspecialchars($fila['tarea'], ENT_QUOTES, "UTF-8")  ?> </p>
                    <?php  endif; ?> 
                    <?php endforeach ?>

                    </div>
                    
                <!-- Finalizadas -->
                <div id="finalizadas">
                    <h3>Finalizadas </h3>
                    
                    <?php foreach ($array_filas as $fila) : ?>

                    <?php if ($fila['estado'] === 'finalizadas') : ?> 

                        <p> <?= htmlspecialchars($fila['tarea'], ENT_QUOTES, "UTF-8")  ?> </p>
                    <?php  endif; ?> 
                    <?php endforeach ?> 
                </div>
                
        
        </section>

        <section>
            
        <?php  if($_GET):   ?>
            <!-- FORMULARIO PARA MODIFICAR TAREA Y/O SU ESTADO -->
            <h2>Modifica tu tarea</h2>

            <!-- El formulario enviará la información al fic
             hero update.php
            y lo hará mediante el método POST. -->
                <form action="update.php" method="post" class="formActividad">
                <!-- <input type="hidden" name="id_color" value="<?//= $_GET['id'] ?>"> -->
                <fieldset>
                    <div>
                        <label for="tarea">Tarea a realizar:</label>
                        <input type="text" 
                        id="tarea" 
                        name="tarea"
                        value = "<?= $_GET['tarea'] ?>"
                        placeholder="Ingrese la actividad">
                    </div>
                    <div>
                        <select name="estado" id="estado" value = "<?= $_GET['estado'] ?>">
                            <option value="pendientes">Pendiente </option>
                            <option value="ejecucion" >En ejecución</option>
                            <option value="finalizadas" >Finalizada</option>
                        </select>
                        
                    </div>
                    <div>
                        <button type="submit">Modificar tarea</button>
                        <button type="reset">Borrar tarea</button>
                    </div>
                    
                </fieldset>

                </form>
        
        <?php else : ?>
            

            <!-- FORMULARIO PARA INGRESAR TAREA Y SU ESTADO -->
            <h2>Introducir tarea y definir estado</h2>
 
             <!-- -- Al no poner acción, no hay transición hacia otra página
             -- Al no poner método, el navegador usa el método GET por defecto. -->
            
            <form action="#" name="formInsert" class="formActividad">
            
                <!-- Enviamos el id_usuario conectado a través del método GET  -->
                <input type="hidden" name="id_usuario" value="<?= $_SESSION['id_usuario'] ?>">

                <!-- En viamos el token del usuario conectado a través del método GET -->
                <input type="hidden" name="token" value="<?= $_SESSION['token'] ?>">

                <!-- Método del pote de miel ( algo así) -->
                <input type="text" name="web" style="display:none">

                <fieldset>
                    <div>
                        <label for="tarea">Tarea a realizar:</label>
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
                

            </form>
        <?php endif ?>

        </section>



    </main>
    <script src="js/script.js"></script>
</body>
</html>