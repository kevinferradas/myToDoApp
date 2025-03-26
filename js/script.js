
const formActividad =document.forms["formActividad"]

const pendientes = document.getElementById("pendientes")

const ejecucion = document.getElementById("ejecucion")

const finalizadas = document.getElementById("finalizadas")

let listaMensajesPendientes = []
let listaMensajesEjecucion = []
let listaMensajesFinalizadas = []

formActividad.addEventListener("submit", (e) => {

    e.preventDefault() 
    let actividad = formActividad["actividad"].value
    let estado =  formActividad["estado"].value
   

   
    // Pendientes
    if (estado == "pendientes") { 
        let mensajePendiente = `<div class ="actividadPendientes">
        <p>${actividad} </p>
        <i onclick="borrarPendiente(${listaMensajesPendientes.length})" class="fa-solid fa-trash" style="color: red ;"></i>
    </div> `

    listaMensajesPendientes.push(mensajePendiente)
    actualizarPendientes()
            
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
        <i onclick="borrarFinalizadas(${listaMensajesFinalizadas.length})" class="fa-solid fa-trash" style="color: red ;"></i>
    </div> `

    listaMensajesFinalizadas.push(mensajeFinalizadas)
    
    actualizarFinalizadas()    

    }
    
})

// PENDIENTES
function borrarPendiente(j) {

    // Recorremos los elementos de "listaMensajeUsuario"
    for (let i = 0; i<listaMensajesPendientes.length;i++){

        if (i==j){ listaMensajesPendientes[i]= ""}
    }

    actualizarPendientes()

}

// Declaramos la función 
function actualizarPendientes() {

    pendientes.innerHTML =""
    for (mensajes of listaMensajesPendientes){

        if(mensajes !="") // Solo se mostraran los mensajes que no sean strings vacíos
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

