
const formInsert =document.forms["formInsert"]

formInsert.addEventListener("submit", (e) => {
    e.preventDefault();

  // EXTRAEMOS LOS VALORES DE LOS CAMPOS DEL FORMULARIO
  const tarea  = formInsert["tarea"].value.trim();
  const estado = formInsert["estado"].value;
  const web = formInsert["web"].value;
  const token = formInsert["token"].value;
  const id_usuario = formInsert["id_usuario"].value


  // CREAR Y LLLENAR UN OBJETO  URLSearchParams
  
  /* 
  --Enviar datos a insert.php por POST. URLSearchParams es 
    una clase para construir fácilmente cadenas de 
    parámetros tipo URL (key=value&key2=value2).
  -- append() agrega cada dato que quieres enviar. 
  */

  const datos = new URLSearchParams();
  datos.append("tarea", tarea );
  datos.append("estado", estado);
  datos.append("web", web);
  datos.append("token", token);
  datos.append("id_usuario", id_usuario);


// ENVIAR LOS DATOS USANDO FETCH
/* 
--Enviamos los datos al archivo PHP insert.php ,ubicado en el directorio superior (../),
  usando el método  HTTP: POST
--El cuerpo (body) del mensaje es una cadena formateada como formulario (application/x-www-form-urlencoded),
 igual a como se enviaría un formulario HTML. */

  
  fetch("../insert.php",{
    "method":"POST",
    "body":datos.toString(),
    "headers":{
        "Content-type":"application/x-www-form-urlencoded"

    }
})


// PROCESAR LA RESPUESTA DEL SERVIDOR
/* 
-- .then(respuesta => respuesta.text()): Convierte la respuesta  del servidor (que viene en formato Response)) en texto plano.
-- console.log(data);: Imprime la respuesta del servidor en la consola (útil para depuración).
-- location.reload(): Recarga la página actual para reflejar cambios (por ejemplo, mostrar la nueva tarea insertada).
*/

.then(respuesta => respuesta.text())
.then(data => {
    console.log(data);
    location.reload()
})

// CAPTURAR ERRORES
/*
Si ocurre un error durante el proceso 
(fetch, conexión, etc.), se captura aquí y se imprime en consola.  
*/
.catch(error => {
    console.log("Error: ", error);
})

  });


/*
Ventajas de usar JavaScript / Fetch / AJAX
1.Evita recargar la página:

2.Ideal cuando solo quieres actualizar una parte de la interfaz sin perder el estado actual.

3.Mejor experiencia de usuario:

-- Puedes mostrar mensajes personalizados de "Guardando...", "Error en el envío", etc., sin perder el contenido que el usuario escribió.

4.Validación personalizada antes del envío:

-- Aunque HTML5 tiene validaciones, con JS puedes hacer validaciones más complejas antes de enviar los datos.

5.Enviar datos desde múltiples formularios o fuentes al mismo tiempo:

--Puedes recolectar datos de varios lugares del DOM antes de enviarlos.

6.Interactividad moderna (como SPAs):

--En aplicaciones web modernas (React, Vue, etc.) es común usar solo JS para comunicación con el servidor.



*/



  


const pendientes = document.getElementById("pendientes")

const ejecucion = document.getElementById("ejecucion")

const finalizadas = document.getElementById("finalizadas")

let listaMensajesPendientes = []
let listaMensajesEjecucion = []
let listaMensajesFinalizadas = []
let listaBasureroPendiente = []
let listaProvisionalPendiente=[]

formActividad.addEventListener("submit", (e) => {

    e.preventDefault() 
    let actividad = formActividad["actividad"].value
    let estado =  formActividad["estado"].value
   
    listaProvisionalPendiente.push(actividad)

    // Pendientes
    if (estado == "pendientes") { 
        
        let mensajePendiente = `<div class ="actividadPendientes">
        
        <p>${actividad} </p>
        <div>
        <i onclick="moverPendientesaEjecucion(${listaProvisionalPendiente.indexOf(actividad)}) " class="fa-solid fa-person-digging" style="color: darksalmon ;"></i>
        <i onclick="borrarPendiente(${listaProvisionalPendiente.indexOf(actividad)})" class="fa-solid fa-trash" style="color: red ;"></i>
        </div>
    </div> `

    actualizarPendientes(mensajePendiente)        
    }

    // En ejecución
    else if (estado == "ejecucion") { 
        let mensajeEjecucion = `<div class = "actividadEjecucion">
        <p>${actividad} </p>
        <i onclick="borrarEjecucion(${listaMensajesEjecucion.length})" class="fa-solid fa-trash" style="color: red ;"></i>
    </div> `

    listaMensajesEjecucion.push(mensajeEjecucion)
    
    actualizarEjecucion()        

    }

    // Finalizadas
    else  { 
        let mensajeFinalizadas = `<div class ="actividadFinalizadas">
        <p>${actividad} </p>
        <div>
        <i onclick="moverAejecucion(${listaMensajesPendientes.length}) " class="fa-solid fa-person-digging" style="color: darksalmon ;"></i>
        <i onclick="borrarFinalizadas(${listaMensajesFinalizadas.length})" class="fa-solid fa-trash" style="color: red ;"></i>
        </div>
    </div> `

    listaMensajesFinalizadas.push(mensajeFinalizadas)
    
    actualizarFinalizadas()    

    }
    
})


function moverPendientesaEjecucion (j){

    // Recorremos los elementos de "listaMensajeUsuario"
    for (let i = 0; i<listaMensajesPendientes.length;i++){

        if (i==j){ 
            borrarPendiente(i)
            listaMensajesEjecucion.push(listaMensajesPendientes[i]) 
            listaMensajesPendientes.splice(i,1)
    }

    actualizarPendientes()
    actualizarEjecucion()

}}



//FUNCIONES
// PENDIENTES

function borrarPendiente(j) {

    // Recorremos los elementos de "listaMensajeUsuario"
    for (let i = 0; i<listaMensajesPendientes.length;i++){

        if (i==j){ 
            // listaMensajesPendientes.splice(i,1)
            listaProvisionalPendiente.splice(i,1)}
        }

        actualizarPendientes()
    }

// Declaramos la función 
function actualizarPendientes(message) {

    listaMensajesPendientes = []
    pendientes.innerHTML =""

    for (actividad of listaProvisionalPendiente){
        message = `<div class ="actividadPendientes">
        
        <p>${actividad} </p>
        <div>
        <i onclick="moverPendientesaEjecucion(${listaProvisionalPendiente.indexOf(actividad)}) " class="fa-solid fa-person-digging" style="color: darksalmon ;"></i>
        <i onclick="borrarPendiente(${listaProvisionalPendiente.indexOf(actividad)})" class="fa-solid fa-trash" style="color: red ;"></i>
        </div>
        
    </div> `
    listaMensajesPendientes.push(message)
    }

    for (mensajes of listaMensajesPendientes){

        {pendientes.innerHTML += mensajes}   
    }
}   




// EJECUCIÓN
function borrarEjecucion(j) {

    // Recorremos los elementos de "listaMensajeUsuario"
    for (let i = 0; i<listaMensajesEjecucion.length;i++){

        if (i==j){ listaMensajesEjecucion[i]= ""}
    }

    actualizarEjecucion()

}

// Declaramos la función 
function actualizarEjecucion() {

    ejecucion.innerHTML = ""
    for (mensajes of listaMensajesEjecucion){

        if(mensajes !="") // Solo se mostraran los mensajes que no sean strings vacíos
        {ejecucion.innerHTML += mensajes}
        
    }  
}

// FINALIZADAS
function borrarFinalizadas(j) {

    // Recorremos los elementos de "listaMensajeUsuario"
    for (let i = 0; i<listaMensajesFinalizadas.length;i++){

        if (i==j){ listaMensajesFinalizadas[i]= ""}
    }

    actualizarFinalizadas()

}

// Declaramos la función 
function actualizarFinalizadas() {

    finalizadas.innerHTML = "" 
    for (mensajes of listaMensajesFinalizadas){

        if(mensajes !="") // Solo se mostraran los mensajes que no sean strings vacíos
        {finalizadas.innerHTML += mensajes}
        
    } 
}

