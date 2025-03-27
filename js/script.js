
const formActividad =document.forms["formActividad"]

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

