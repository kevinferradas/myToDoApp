CREATE DATABASE IF NOT EXISTS  gestorTareas;
USE gestorTareas;
CREATE TABLE tareas (
id_tarea int AUTO_INCREMENT PRIMARY KEY,
tarea VARCHAR(200) NOT NULL,
estado VARCHAR(25),
fecha_inicio  DATETIME   ,
fecha_caducidad DATETIME  ,
id_usuario int NOT NULL
);

INSERT INTO colores(usuario,color_es,color_en) 
VALUES ("Tarzan","verde","green"), ("Dani","dark salmon","dark salmon");