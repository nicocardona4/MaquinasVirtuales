
class Usuario {
    constructor(id, nombre, apellido, usuarioNombre, contraseña, nroTarjeta, tarjetaCVC, sts) {
        this.id = id
        this.nombre = nombre;
        this.apellido = apellido;
        this.usuarioNombre = usuarioNombre;
        this.contraseña = contraseña;
        this.nroTarjeta = nroTarjeta;
        this.tarjetaCVC = tarjetaCVC;
        this.sts = sts;
    }
}

class Administrador {
    constructor(usuario, contraseña) {
        this.usuario = usuario;
        this.contraseña = contraseña;
    }
}

class Instancia {
    constructor(id, nombre, alquilerCosto, encendidoCosto, stock) {
        this.id = id;
        this.nombre = nombre;
        this.alquilerCosto = alquilerCosto;
        this.encendidoCosto = encendidoCosto;
        this.stock = stock;
    }
}

class Alquiler {
    constructor(id, estado, comprador, vecesEncendida, tipoDeInstancia, costoAlquiler, costoEncendido) {
        this.id = id;
        this.estado = estado;
        this.comprador = comprador;
        this.vecesEncendida = vecesEncendida;
        this.tipoDeInstancia = tipoDeInstancia;
        this.costoAlquiler = costoAlquiler;
        this.costoEncendido = costoEncendido;
    }
}

class Sistema {
    constructor() {
        this.usuarios = [];
        this.administradores = [];
        this.instancias = [];
        this.alquileres = [];
    }
    agregarUsuario(id, nombre, apellido, usuarioNombre, contraseña, nroTarjeta, tarjetaCVC, sts) {
        let crearUsuario = new Usuario(id, nombre, apellido, usuarioNombre, contraseña, nroTarjeta, tarjetaCVC, sts);
        this.usuarios.push(crearUsuario);
    }
    agregarAlquiler(id, estado, comprador, vecesEncendida, tipoDeInstancia, costoAlquiler, costoEncendido) {
        let crearAlquiler = new Alquiler(id, estado, comprador, vecesEncendida, tipoDeInstancia, costoAlquiler, costoEncendido);
        this.alquileres.push(crearAlquiler);
    }
}
let sistema = new Sistema();
let CantIntentos = 0;
let filtro = 'Todas';


window.addEventListener('load', inicio);


function inicio() {
    Ocultar('seccionRegistro,seccionAlquilar,seccionMisMaquinas,seccionMisAlquileres,seccionAprobacion,seccionStock,seccionInforme,navPrincipal');

    precargarDatos();
    // console.log(sistema.instancias);

    document.querySelector('#btnRegistrarse').addEventListener('click', registroUsuario);
    document.querySelector('#btnVolverLogin').addEventListener('click', volverLogin);
    document.querySelector('#btnCrearUsuario').addEventListener('click', validarUsuarioNuevo);
    document.querySelector('#btnSeccionLogin').addEventListener('click', volverLogin);
    document.querySelector('#btnIniciarSesion').addEventListener('click', login);




    let secciones = document.querySelectorAll('.seccion');
    for (let i = 0; i < secciones.length; i++) {
        const seccion = secciones[i];
        //console.log(seccion)
        seccion.addEventListener('click', mostrarSeccion);
    }
    document.querySelector('#btnAlquilar').addEventListener('click', alquilarMaquina);
    document.querySelector("#btnCargarMaquinas").addEventListener("click", filtroInstancias);
    document.querySelector('#btnStock').addEventListener('click', modificarStock);

    armarTablaAprobacion()
}

/* PRECARGAMOS TODOS LOS DATOS */
function precargarDatos() {

    /* CARGAMOS LAS INSTANCIAS POR DEFECTO */

    /* Optimizadas para computo */
    let c7Small = new Instancia('1', 'c7.Small', 20, 2.5, 4);
    sistema.instancias.push(c7Small);
    let c7Medium = new Instancia('2', 'c7.Medium', 30, 3.5, 1);
    sistema.instancias.push(c7Medium);
    let c7Large = new Instancia('3', 'c7.Large', 50, 6, 1);
    sistema.instancias.push(c7Large);

    /* Optimizadas para memoria */
    let r7Small = new Instancia('4', 'r7.Small', 35, 4, 1);
    sistema.instancias.push(r7Small);
    let r7Medium = new Instancia('5', 'r7.Medium', 50, 6.5, 1);
    sistema.instancias.push(r7Medium);
    let r7Large = new Instancia('6', 'r7.Large', 60, 7, 1);
    sistema.instancias.push(r7Large);

    /* Optimizadas para almacenamiento */
    let i7Medium = new Instancia('7', 'i7.Medium', 30, 3.5, 1);
    sistema.instancias.push(i7Medium);
    let i7Large = new Instancia('8', 'i7.Large', 50, 6.5, 1);
    sistema.instancias.push(i7Large);

    /* CARGAMOS LOS USUARIOS Y ADMINISTRADORES */

    /* Administradores */
    let admin1 = new Administrador('Admin1', 'Admin1');
    sistema.administradores.push(admin1);
    let admin2 = new Administrador('Admin2', 'Admin2');
    sistema.administradores.push(admin2);
    let admin3 = new Administrador('Admin3', 'Admin3');
    sistema.administradores.push(admin3);
    let admin4 = new Administrador('Admin4', 'Admin4');
    sistema.administradores.push(admin4);
    let admin5 = new Administrador('Admin5', 'Admin5');
    sistema.administradores.push(admin5);

    /* Usuarios */
    let Usuario1 = new Usuario(1, 'Nicolas', 'Cardona', 'Ncardona', 'Ncardona1', 1111222233334444, 123, 'Activo');
    sistema.usuarios.push(Usuario1);
    let Usuario2 = new Usuario(2, 'Jonatan', 'Pais', 'JonatanP', 'Jonatan1', 4444333322221111, 321, 'Activo');
    sistema.usuarios.push(Usuario2);
    let Usuario3 = new Usuario(3, 'Pepe', 'Mendez', 'ElPepe', 'Pepe1', 3333444421212121, 231, 'Bloqueado');
    sistema.usuarios.push(Usuario3);
    let Usuario4 = new Usuario(4, 'Pedro', 'Gonzalez', 'PGonzales', 'PGonzales1', 4444333321212121, 231, 'Pendiente');
    sistema.usuarios.push(Usuario4);
    let Usuario5 = new Usuario(5, 'Alberto', 'Olivera', 'AOlivera', 'AOlivera1', 3434343421212121, 231, 'Activo');
    sistema.usuarios.push(Usuario5);

    /* CARGAMOS LOS ALQUILERES */
    let Alquiler1 = new Alquiler(1, 'Encendido', 'Ncardona', 1, 'c7.Small', 20, 2.5);
    sistema.alquileres.push(Alquiler1);
    let Alquiler2 = new Alquiler(2, 'Apagado', 'Ncardona', 4, 'c7.Large', 50, 6);
    sistema.alquileres.push(Alquiler2);
    let Alquiler3 = new Alquiler(3, 'Encendido', 'JonatanP', 3, 'r7.Small', 35, 4);
    sistema.alquileres.push(Alquiler3);
    let Alquiler4 = new Alquiler(4, 'Encendido', 'JonatanP', 1, 'r7.Large', 60, 7);
    sistema.alquileres.push(Alquiler4);
    let Alquiler5 = new Alquiler(5, 'Apagado', 'JonatanP', 2, 'c7.Small', 20, 2.5);
    sistema.alquileres.push(Alquiler5);
    let Alquiler6 = new Alquiler(6, 'Apagado', 'ElPepe', 4, 'i7.Medium', 30, 3.5);
    sistema.alquileres.push(Alquiler6);
    let Alquiler7 = new Alquiler(7, 'Encendido', 'PGonzales', 1, 'i7.Large', 50, 6.5);
    sistema.alquileres.push(Alquiler7);
    let Alquiler8 = new Alquiler(8, 'Apagado', 'AOlivera', 4, 'r7.Medium', 50, 6.5);
    sistema.alquileres.push(Alquiler8);
    let Alquiler9 = new Alquiler(9, 'Encendido', 'PGonzales', 3, 'c7.Medium', 30, 3.5);
    sistema.alquileres.push(Alquiler9);
    let Alquiler10 = new Alquiler(10, 'Encendido', 'AOlivera', 1, 'c7.Small', 20, 2.5);
    sistema.alquileres.push(Alquiler10);

}

/* FUNCIONES PARA OCULTAR Y MOSTRAR */
function Ocultar(componentes) {
    let objOcultar = '';
    for (let i = 0; i < componentes.length; i++) {
        let letra = componentes[i];

        if (letra != ',') {
            objOcultar += letra;
        }
        else {

            let IdObjOcultar = document.getElementById(objOcultar);

            IdObjOcultar.style.display = 'none';
            objOcultar = '';
        }

        if (i + 1 == componentes.length) {
            let IdObjOcultar = document.getElementById(objOcultar);

            IdObjOcultar.style.display = 'none';
            objOcultar = '';
        }

    }
}

function Mostrar(componentes) {
    let objMostrar = '';
    for (let i = 0; i < componentes.length; i++) {
        let a = componentes[i];

        if (a != ',') {
            objMostrar += a;
        }
        else {

            let IdObjMostrar = document.getElementById(objMostrar);

            IdObjMostrar.style.display = 'block';
            objMostrar = '';
        }

        if (i + 1 == componentes.length) {
            let IdObjMostrar = document.getElementById(objMostrar);

            IdObjMostrar.style.display = 'block';
            objMostrar = '';
        }

    }
}

/* REGISTRAR NUEVO USUARIO */
function registroUsuario() {

    Mostrar('seccionRegistro');
    Ocultar('seccionAlquilar,seccionLogin,seccionMisMaquinas,seccionMisAlquileres,seccionAprobacion,seccionStock,seccionInforme');

}

/* FUNCION PARA VOLVER AL LOGIN */
function volverLogin() {

    Ocultar('seccionRegistro,seccionMisMaquinas,seccionAlquilar,seccionMisAlquileres,seccionAprobacion,seccionStock,seccionInforme,navPrincipal');
    Mostrar('seccionLogin');

}


/* VALIDAMOS QUE TODOS LOS DATOS AL MOMENTO DE CREAR UN USUARIO ESTÉN CORRECTOS */
function validarUsuarioNuevo() {

    let newUsuarioNom = document.querySelector('#txtIngNombre').value;
    let newUsuarioApe = document.querySelector('#txtIngApellido').value;
    let newUsuario = document.querySelector('#txtIngUsuario').value;
    let newUsuarioPsw = document.querySelector('#txtIngPsw').value;
    let newUsuarioPswConfirm = document.querySelector('#txtIngPswConfirm').value;
    let newUsuarioTarjeta = document.querySelector('#txtTarjeta').value;
    let newUsuarioCVC = Number(document.querySelector('#txtCVC').value);
    document.querySelector('#pMsgErrRegistro').innerHTML = '';

    /* PRIMERO VALIDO QUE NINGÚN CAMPO INGRESADO SEA VACÍO */
    if (!newUsuarioNom) {
        document.querySelector('#pMsgErrRegistro').innerHTML = 'Debe ingresar su nombre.';
    } else if (!newUsuarioApe) {
        document.querySelector('#pMsgErrRegistro').innerHTML = 'Debe ingresar su apellido.';
    } else if (!newUsuario) {
        document.querySelector('#pMsgErrRegistro').innerHTML = 'Debe ingresar un nombre de usuario.';
    } else if (!newUsuarioPsw || !newUsuarioPswConfirm) {
        document.querySelector('#pMsgErrRegistro').innerHTML = 'Debe ingresar una contraseña y confirmarla.';
    } else if (newUsuarioPsw != '' && newUsuarioPswConfirm != '') {

        if (verificarNewPsw(newUsuarioPsw)) {
            document.querySelector('#pMsgErrRegistro').innerHTML = '';

            if (newUsuarioPsw != newUsuarioPswConfirm) {
                document.querySelector('#pMsgErrRegistro').innerHTML = 'Las contraseñas ingresadas no coinciden.';
            } else if (existeUsuario(newUsuario)) {
                document.querySelector('#pMsgErrRegistro').innerHTML = 'El usuario ya existe';
            } else if (!newUsuarioTarjeta) {
                document.querySelector('#pMsgErrRegistro').innerHTML = 'Debe ingresar su tarjeta de crédito.';
            } else if (!AlgoritmoLuhn(newUsuarioTarjeta)) {
                document.querySelector('#pMsgErrRegistro').innerHTML = 'La tarjeta ingresada no es válida';
            } else if (newUsuarioCVC.toString().length !== 3) {
                document.querySelector('#pMsgErrRegistro').innerHTML = 'Codigo de verificación no válido';
            } else if (existeUsuario(newUsuario)) {
                document.querySelector('#pMsgErrRegistro').innerHTML = 'El usuario ya existe';
            } else {
                document.querySelector('#pMsgErrRegistro').innerHTML = '';
                let newId = 0;
                newId = numeradorUsuarioId() + 1;
                sistema.agregarUsuario(newId, newUsuarioNom, newUsuarioApe, newUsuario, newUsuarioPsw, newUsuarioTarjeta, newUsuarioCVC, 'Pendiente');
                armarTablaAprobacion();
                alert(`Bienvenido/a ${newUsuarioNom}`);
                volverLogin();

            }

        }
        else {
            document.querySelector('#pMsgErrRegistro').innerHTML = 'La contraseña debe tener al menos una mayúscula, un número y un símbolo.';
        }

    }
    else {
        document.querySelector('#pMsgErrRegistro').innerHTML = 'La contraseña debe tener al menos una mayúscula, un número y un símbolo.';
    }

    /*} else if (!newUsuarioTarjeta) {
        document.querySelector('#pMsgErrRegistro').innerHTML = 'Debe ingresar su tarjeta de crédito.';
    } else if (!newUsuarioCVC) {
        document.querySelector('#pMsgErrRegistro').innerHTML = 'Debe ingresar el código de verificación de su tarjeta (CVC).';
    } else {

        if (verificarNewPsw(newUsuarioPsw)) {
            document.querySelector('#pMsgErrRegistro').innerHTML = '';

            if (newUsuarioPsw != newUsuarioPswConfirm) {
                document.querySelector('#pMsgErrRegistro').innerHTML = 'Las contraseñas ingresadas no coinciden.';
            } else if (existeUsuario(newUsuario)) {
                document.querySelector('#pMsgErrRegistro').innerHTML = 'El usuario ya existe';


            } else {
                document.querySelector('#pMsgErrRegistro').innerHTML = '';
                let newId = 0;
                newId = numeradorUsuarioId() + 1;
                sistema.agregarUsuario(newId, newUsuarioNom, newUsuarioApe, newUsuario, newUsuarioPsw, newUsuarioTarjeta, newUsuarioCVC, 'Pendiente')
                alert(`Bienvenido/a ${newUsuarioNom}`);
                volverLogin();

            }

        }
        else {
            document.querySelector('#pMsgErrRegistro').innerHTML = 'La contraseña debe tener al menos una mayúscula, un número y un símbolo.';
        }

    }*/

}

/* AQUI VERIFICAMOS SI LA CONTRASEÑA CUMPLE CON LOS REQUISITOS */
function verificarNewPsw(nuevaPsw) {
    //PRIMERO VERIFICAMOS QUE LA NUEVA CONTRASEÑA TENGA AL MENOS 5 CARACTERES
    let mayorDeCinco = false;

    if (nuevaPsw.length >= 5) {
        mayorDeCinco = true;
    }

    //VERIFICAMOS QUE TENGA AL MENOS UNA LETRA MINÚSCULA
    let tieneMinuscula = false;

    for (i = 0; i < nuevaPsw.length; i++) {
        if (nuevaPsw[i] >= 'a' && nuevaPsw[i] <= 'z') {
            tieneMinuscula = true;
            break;
        }
    }

    //VERIFICAMOS QUE TENGA AL MENOS UNA LETRA MAYÚSCULA
    let tieneMayuscula = false;

    for (i = 0; i < nuevaPsw.length; i++) {
        if (nuevaPsw[i] >= 'A' && nuevaPsw[i] <= 'Z') {
            tieneMayuscula = true;
            break;
        }
    }

    //VERIFICAMOS QUE TENGA AL MENOS UN NÚMERO
    let tieneNumero = false;

    for (i = 0; i < nuevaPsw.length; i++) {
        if (nuevaPsw[i] >= 0 && nuevaPsw[i] <= 9) {
            tieneNumero = true;
            break;
        }
    }

    return mayorDeCinco && tieneMinuscula && tieneMayuscula && tieneNumero;

}

//VALIDAR NUMERO DE TARJETA 
function AlgoritmoLuhn(codigoTarjeta) {
    let ultimoDigitoIngresado = Number(codigoTarjeta.charAt(codigoTarjeta.length - 1));
    let suma = 0;
    let numeroActual;
    let contador = 0;

    for (let i = codigoTarjeta.length - 2; i >= 0; i--) {
        numeroActual = Number(codigoTarjeta.charAt(i));

        if (contador % 2 === 0) {
            suma += obtenerDigito(numeroActual);
        } else {
            suma += numeroActual;
        }
        contador++;
    }
    ultimoDigitoObtenido = obtenerDigitoVerificador(suma);
    return ultimoDigitoIngresado === ultimoDigitoObtenido;
}

//OBTENER DIGITO
function obtenerDigito(numero) {
    let duplicado = numero * 2
    if (duplicado > 9) {
        duplicado = 1 + (duplicado % 10);
    }
    return duplicado;
}

//DIGITO VERIFICADOR
function obtenerDigitoVerificador(numero) {
    return (numero * 9 % 10);
}

/* AQUI VERIFICAMOS SI EL USUARIO QUE INTENTAMOS CREAR NO EXISTE */
function existeUsuario(usuUsuario) {
    let existeUsuario = false;

    for (i = 0; i < sistema.usuarios.length; i++) {
        if (sistema.usuarios[i].usuarioNombre.toUpperCase() === usuUsuario.toUpperCase()) {
            existeUsuario = true;
            break;
        }
    }

    return existeUsuario;
}


//MOSTRAR SECCIONES//
function mostrarSeccion() {
    Ocultar('seccionLogin,seccionRegistro,seccionAlquilar,seccionMisMaquinas,seccionMisAlquileres,seccionAprobacion,seccionStock,seccionInforme');
    let IdLiSeccion = this.getAttribute('id');
    let IdSeccion = IdLiSeccion.charAt(3).toLowerCase() + IdLiSeccion.substring(4)
    //console.log(IdSeccion)

    document.querySelector('#' + IdSeccion).style.display = 'block';
}
//CALCULAR ID DE USUARIO
function numeradorUsuarioId() {
    let ultimoId = 0;
    for (let i = 0; i < sistema.usuarios.length; i++) {
        ultimoId = sistema.usuarios[i].id;
    }
    return ultimoId;
}

//LOGIN
function login() {
    let usuarioLogin = document.querySelector('#txtUsuario').value;
    let contraseñaLogin = document.querySelector('#txtPassword').value;
    let usuarioSts = '';
    admitido = verificarLogin(usuarioLogin, contraseñaLogin);
    isAdmin = determinarRol(usuarioLogin);

    for (let i = 0; i < sistema.usuarios.length; i++) {
        if (usuarioLogin === sistema.usuarios[i].usuarioNombre) {
            usuarioSts = sistema.usuarios[i].sts;
            console.log(usuarioSts)
        }
    }
    if (usuarioSts === 'Activo' || isAdmin) {
console.log(isAdmin)

    CantIntentos += 1;

    if (CantIntentos < 5) {

        // console.log(admitido)
        if (admitido) {
            CantIntentos = 0;
            document.querySelector('#intentosLogin').innerHTML = '';
            document.querySelector('#pMsgErrLogin').innerHTML = '';
            //console.log(isAdmin)
            if (isAdmin === true) {
                Mostrar('seccionAprobacion,navPrincipal,btnSeccionAprobacion,btnSeccionInforme,btnSeccionStock');
                Ocultar('seccionLogin,seccionRegistro,seccionAlquilar,seccionMisMaquinas,seccionMisAlquileres,btnSeccionAlquilar,btnSeccionMisMaquinas,btnSeccionMisAlquileres');
                alert('Bienvenido nuevamente ' + usuarioLogin + '!!');
                armarInformeAdmin()
            } else {
                Mostrar('seccionAlquilar,navPrincipal,btnSeccionMisAlquileres,btnSeccionMisMaquinas,btnSeccionAlquilar');
                Ocultar('seccionLogin,seccionRegistro,seccionAprobacion,seccionStock,seccionInforme,btnSeccionAprobacion,btnSeccionStock,btnSeccionInforme');
                alert('Bienvenido nuevamente ' + usuarioLogin + '!!');
                armarTablaMaquinas();
                armarTablaAlquileres();
            }

        }
        else {
            document.querySelector('#pMsgErrLogin').innerHTML = '';

            switch (CantIntentos) {
                case 3:
                    document.querySelector('#intentosLogin').innerHTML = 'Quedan 2 intentos de login';
                    break;
                case 4:
                    document.querySelector('#intentosLogin').innerHTML = 'Queda 1 intento de login';
                    break;
            }

            document.querySelector('#pMsgErrLogin').innerHTML = 'ERROR: Usuario o Contraseña invalidos';
        }
    }
    else {
        document.querySelector('#intentosLogin').innerHTML = '';
        document.querySelector('#pMsgErrLogin').innerHTML = 'ERROR : Maximo numero de intentos superado.';
        document.querySelector("#btnIniciarSesion").setAttribute("disabled", "disabled");
    }
} else {
    console.log(usuarioSts)
    document.querySelector('#pMsgErrLogin').innerHTML = `El usuario se encuentra ${usuarioSts}`;

}
}

//VERIFICAR LOGIN
function verificarLogin(verificarUsuario, verificarContraseña) {
    let admitido = false;
    console.log(verificarUsuario);

    for (let j = 0; j < sistema.administradores.length; j++) {
        let administradorLogin = sistema.administradores[j];
        if (administradorLogin.usuario.toUpperCase() === verificarUsuario.toUpperCase() && administradorLogin.contraseña === verificarContraseña) {
            admitido = true;
            break;
        }
    }

    for (let i = 0; i < sistema.usuarios.length; i++) {
        let usuarioLogin = sistema.usuarios[i];
        if (usuarioLogin.usuarioNombre.toUpperCase() === verificarUsuario.toUpperCase() && usuarioLogin.contraseña === verificarContraseña) {
            admitido = true;
            break;
        }
    }

    return admitido;
}

function determinarRol(usuarioBuscar) {
    let isAdmin = false;
    for (i = 0; i < sistema.administradores.length; i++) {
        if (usuarioBuscar === sistema.administradores[i].usuario)
            isAdmin = true
    }
    return isAdmin;

}

//ALQUILAR MAQUINA VIRTUAL
function alquilarMaquina() {
    let comprador = usuarioActual();

    //console.log(comprador);
   
        let instanciaTipo = document.querySelector('#slcInstanciaTipo').value;
        let costoNuevoAlquiler;
        let costoNuevoEncendido;
        let idConsultaStock = 0;
        switch (instanciaTipo) {
            case 'c7S':
                instanciaTipo = 'c7.Small';
                costoNuevoAlquiler = 20;
                costoNuevoEncendido = 2.50;
                idConsultaStock = 1
                break;
            case 'c7M':
                instanciaTipo = 'c7.Medium';
                costoNuevoAlquiler = 30;
                costoNuevoEncendido = 3.50;
                idConsultaStock = 2;
                break;
            case 'c7L':
                instanciaTipo = 'c7.Large';
                costoNuevoAlquiler = 50;
                costoNuevoEncendido = 6.00;
                idConsultaStock = 3;
                break;
            case 'r7S':
                instanciaTipo = 'r7.Small';
                costoNuevoAlquiler = 35;
                costoNuevoEncendido = 4.00;
                idConsultaStock = 4;
                break;
            case 'r7M':
                instanciaTipo = 'r7.Medium';
                costoNuevoAlquiler = 50;
                costoNuevoEncendido = 6.50;
                idConsultaStock = 5;
                break;
            case 'r7L':
                instanciaTipo = 'r7.Large';
                costoNuevoAlquiler = 60;
                costoNuevoEncendido = 7.00;
                idConsultaStock = 6;
                break;
            case 'i7M':
                instanciaTipo = 'i7.Medium';
                costoNuevoAlquiler = 30;
                costoNuevoEncendido = 3.50;
                idConsultaStock = 7;
                break;
            case 'i7L':
                instanciaTipo = 'i7.Large';
                costoNuevoAlquiler = 50;
                costoNuevoEncendido = 6.50;
                idConsultaStock = 8;
                break;
            default:
                document.querySelector('#pMsgErrAlquilar').innerHTML = 'Debe seleccionar una opción';
                return;
        }


        let stockDisponibleAlq = consultarStock(idConsultaStock);
        let alquileresEnUso = CantAlquileresPorInstancia(instanciaTipo);
        if (alquileresEnUso >= stockDisponibleAlq){ 
            document.querySelector('#pMsgErrAlquilar').innerHTML = 'No hay stock de la instancia seleccionada';
        return;
    }else{


        let newAId = 0;
        newAId = numeradorAlquilerId() + 1;
        //console.log(newAId);
      //  console.log();

        sistema.agregarAlquiler(newAId, 'Encendido', comprador, 0, instanciaTipo, costoNuevoAlquiler, costoNuevoEncendido);
        document.querySelector('#pMsgErrAlquilar').innerHTML = 'Alquiler procesado con éxito';
        armarTablaMaquinas();
        armarTablaAlquileres();
    }
    
}

//CALCULAR ID DE USUARIO
function numeradorAlquilerId() {
    let ultimoAId = 0;
    for (let i = 0; i < sistema.alquileres.length; i++) {
        ultimoAId = sistema.alquileres[i].id;
    }
    return ultimoAId;
}

//DETERMINAR usuarioActual
function usuarioActual() {
    let usuarioActual = document.querySelector('#txtUsuario').value;
    for (i = 0; i < sistema.usuarios.length; i++) {
        if (usuarioActual === sistema.usuarios[i].usuarioNombre) {
            return usuarioActual;
        }
    }
    return null;

}

//TABLA DE MIS MAQUINAS
function armarTablaMaquinas() {
    let yo = usuarioActual();
    let tablaHTML = '';

    //PRECARGAR TODAS PARA EL PRIMER INGRESO
    for (let i = 0; i < sistema.alquileres.length; i++) {
        let alquilerActual = sistema.alquileres[i];
        if (yo === alquilerActual.comprador) {

            if (filtro === 'Todas' || (filtro === 'A' && alquilerActual.estado === 'Apagado') || (filtro === 'E' && alquilerActual.estado === 'Encendido')) {
                tablaHTML += `<tr>
        <td>${alquilerActual.tipoDeInstancia}</td>
        <td>${alquilerActual.estado}</td>
        <td>${alquilerActual.vecesEncendida}</td>`;

                if (alquilerActual.estado === 'Encendido') {
                    tablaHTML += `<td><input type="button" value="Apagar" data-apagado="${alquilerActual.id}" class="btnApagar"></td>
        </tr>`;
                } else {
                    tablaHTML += `<td><input type="button" value="Encender" data-encendido="${alquilerActual.id}" class="btnEncender"></td>
        </tr>`;
                }
            }
        }
        document.querySelector('#tblMaquinas').innerHTML = tablaHTML;
        eventoEncender();
        eventoApagar();


    }




}

function filtroInstancias() {
    let yo = usuarioActual();
    filtro = document.querySelector("#slcFiltroInstancias").value;
    tablaHTML = '';

    switch (filtro) {
        case "Todas":
            for (let i = 0; i < sistema.alquileres.length; i++) {
                if (yo === sistema.alquileres[i].comprador) {
                    tablaHTML += `<tr>
                        <td>${sistema.alquileres[i].tipoDeInstancia}</td>
                        <td>${sistema.alquileres[i].estado}</td>
                        <td>${sistema.alquileres[i].vecesEncendida}</td>`;

                    if (sistema.alquileres[i].estado === 'Encendido') {
                        tablaHTML += `<td><input type="button" value="Apagar" data-apagado="${sistema.alquileres[i].id}" class="btnApagar"></td>
                        </tr>`;
                    } else {
                        tablaHTML += `<td><input type="button" value="Encender" data-encendido="${sistema.alquileres[i].id}" class="btnEncender"></td>
                        </tr>`;
                    }
                }
            }
            break;
        case "A":
            for (let i = 0; i < sistema.alquileres.length; i++) {
                if (yo === sistema.alquileres[i].comprador && sistema.alquileres[i].estado === 'Apagado') {
                    tablaHTML += `<tr>
                        <td>${sistema.alquileres[i].tipoDeInstancia}</td>
                        <td>${sistema.alquileres[i].estado}</td>
                        <td>${sistema.alquileres[i].vecesEncendida}</td>
                        <td><input type="button" value="Encender" data-encendido="${sistema.alquileres[i].id}" class="btnEncender"></td>
                        </tr>`;
                }
            }
            break;
        case "E":
            for (let i = 0; i < sistema.alquileres.length; i++) {
                if (yo === sistema.alquileres[i].comprador && sistema.alquileres[i].estado === 'Encendido') {
                    tablaHTML += `<tr>
                        <td>${sistema.alquileres[i].tipoDeInstancia}</td>
                        <td>${sistema.alquileres[i].estado}</td>
                        <td>${sistema.alquileres[i].vecesEncendida}</td>
                        <td><input type="button" value="Apagar" data-apagado="${sistema.alquileres[i].id}" class="btnApagar"></td>
                        </tr>`;
                }
            }
            break;
    }

    document.querySelector('#tblMaquinas').innerHTML = tablaHTML;
    eventoApagar();
    eventoEncender();
}

function apagar() {
    let idAlquilerApagar = Number(this.getAttribute("data-apagado"));
    for (let i = 0; i < sistema.alquileres.length; i++) {
        //console.log(idAlquilerApagar);
        //console.log(sistema.alquileres[i].id);
        if (idAlquilerApagar === sistema.alquileres[i].id) {
            sistema.alquileres[i].estado = 'Apagado';
            break;
        }
    }
    // Actualizar la tabla después de apagar
    armarTablaMaquinas();
    armarTablaAlquileres();
}

function encender() {
    let idAlquilerEncender = Number(this.getAttribute("data-encendido"));
    for (let i = 0; i < sistema.alquileres.length; i++) {
        if (idAlquilerEncender === sistema.alquileres[i].id) {
            sistema.alquileres[i].estado = 'Encendido';
            sistema.alquileres[i].vecesEncendida += 1;
            break;
        }
    }
    // Actualizar la tabla después de encender
    armarTablaMaquinas();
    armarTablaAlquileres();
}

// ASIGNAR EVENTO DE CLICK PARA APAGAR 
function eventoEncender() {
    let botonesEncender = document.querySelectorAll(".btnEncender");
    for (let i = 0; i < botonesEncender.length; i++) {
        const botonEncender = botonesEncender[i];
        botonEncender.removeEventListener("click", encender);
        botonEncender.addEventListener("click", encender);
        // console.log(botonEncender);
    }
}

// ASIGNAR EVENTO DE CLICK PARA APAGAR
function eventoApagar() {
    let botonesApagar = document.querySelectorAll(".btnApagar");
    //  console.log(botonesApagar)
    for (let i = 0; i < botonesApagar.length; i++) {
        const botonApagar = botonesApagar[i];
        botonApagar.removeEventListener("click", apagar);
        botonApagar.addEventListener("click", apagar);
    }
}

//TABLA DE COSTOS DE ALQUILER
function armarTablaAlquileres() {
   // console.log('')
    let yoAlquileres = usuarioActual();
    let encendidasPorInstancia = 0;
    let costoTotalPorInstancia = 0;
    let instanciaActual = '';
    let precioEncendido = 0;
    let arrayAux = [];
    let auxVecesEncendida = 0;
    let isExiste = true;
    let contadorAlquileres = 0;
    document.querySelector("#tblAlquileres").innerHTML = '';
    for (i = 0; i < sistema.alquileres.length; i++) {
        // console.log('entre al for');
        if (arrayAux.length > 0) {
            for (let k = 0; k < arrayAux.length; k++) {
                //console.log(arrayAux[k]);
                //console.log(sistema.alquileres[i].tipoDeInstancia);

                if (sistema.alquileres[i].tipoDeInstancia === arrayAux[k]) {
                    isExiste = false;
                    break;
                } else {
                    isExiste = true;
                }
            }
        }
        //console.log(isExiste)
        if (yoAlquileres === sistema.alquileres[i].comprador && isExiste == true) {
            auxVecesEncendida = sistema.alquileres[i].vecesEncendida;
            instanciaActual = sistema.alquileres[i].tipoDeInstancia;
            precioEncendido = sistema.alquileres[i].costoEncendido;
            encendidasPorInstancia = sistema.alquileres[i].vecesEncendida;
            contadorAlquileres = 1;
            for (j = i + 1; j < sistema.alquileres.length; j++) {
                if (instanciaActual === sistema.alquileres[j].tipoDeInstancia) {
                    auxVecesEncendida += sistema.alquileres[j].vecesEncendida;
                    contadorAlquileres++;
                }
            }
            costoTotalPorInstancia = precioEncendido * auxVecesEncendida + (contadorAlquileres * sistema.alquileres[i].costoAlquiler);
            arrayAux.push(instanciaActual);

            document.querySelector('#tblAlquileres').innerHTML += `<tr>
            <td>${instanciaActual}</td>
            <td>U$S ${precioEncendido}</td>
            <td>${auxVecesEncendida}</td>
            <td>U$S ${costoTotalPorInstancia}</td>
            </tr>`;


        }

    }
}

function armarTablaAprobacion() {
    let tablaAprobacion = '';

    for (let i = 0; i < sistema.usuarios.length; i++) {
        let esteUsuario = sistema.usuarios[i].usuarioNombre;
        let esteSts = sistema.usuarios[i].sts;
        let idAprobado = sistema.usuarios[i].id;
        tablaAprobacion += `<tr>
        <td>${esteUsuario}</td>
        <td>${esteSts}</td>`

        if (esteSts === 'Pendiente') {
            tablaAprobacion += `<td><input type="button" value= "Aprobar" class= "btnAprobar" data-aprobado="${idAprobado}"></td>
                                <td><input type="button" value= "Bloquear" disabled="disabled"></td></tr>`
        } else if (esteSts === 'Bloqueado') {
            tablaAprobacion += `<td><input type="button" value= "Aprobar" class= "btnAprobar" data-aprobado="${idAprobado}"></td>
                                <td><input type="button" value= "Bloquear" disabled="disabled"></td></tr>`
        } else if (esteSts === 'Activo') {
            tablaAprobacion += `<td><input type="button" value= "Aprobar" disabled= "disabled"></td>
                                <td><input type="button" value= "Bloquear" class="btnBloquear" data-bloqueado="${idAprobado}"></td></tr>`
        }
    }

    document.querySelector("#tblUsuarios").innerHTML = tablaAprobacion;
    aprobarUsuario();
    bloquearUsuario();
}

function aprobarUsuario() {
    let botonesAprobar = document.querySelectorAll(".btnAprobar");
    for (let i = 0; i < botonesAprobar.length; i++) {
        let botonAprobar = botonesAprobar[i];
        botonAprobar.addEventListener("click", aprobar);
    }
}

function bloquearUsuario() {
    let botonesBloquear = document.querySelectorAll(".btnBloquear");
    for (let i = 0; i < botonesBloquear.length; i++) {
        let botonBloquear = botonesBloquear[i];
        botonBloquear.addEventListener("click", bloquear);
    }
}

function aprobar() {
   // console.log('entre');
    let idBtnAprobar = Number(this.getAttribute("data-aprobado"));
   // console.log(idBtnAprobar);


    for (let i = 0; i < sistema.usuarios.length; i++) {
        if (idBtnAprobar === sistema.usuarios[i].id) {
            sistema.usuarios[i].sts = 'Activo';
            break;
        }

    }
    armarTablaAprobacion();
}

function bloquear() {
    let idBtnBloquear = Number(this.getAttribute("data-bloqueado"))
    let usuarioBloqueado='';
    for (let i = 0; i < sistema.usuarios.length; i++) {
        if (idBtnBloquear === sistema.usuarios[i].id) {
            sistema.usuarios[i].sts = 'Bloqueado';
            usuarioBloqueado = sistema.usuarios[i].usuarioNombre;
            break;
        }

    }
 //   console.log(usuarioBloqueado)
    for (let j = 0; j<sistema.alquileres.length; j++){
        if (usuarioBloqueado === sistema.alquileres[j].comprador){
            sistema.alquileres.splice(j, 1);
            j--;
        }
    }


    armarTablaAprobacion();
}

function modificarStock() {
    /* Primero vamos a consultar el stock disponible de esta instancia */
    let instanciaTipoS = document.querySelector('#slcInstanciaTipoStock').value;
    let newStock = Number(document.querySelector('#txtStock').value);
    let StockTpoInstanciaId = 0;
    let StockTpoInstanciaNom = '';



    switch (instanciaTipoS) {
        case 'Sc7S':
            StockTpoInstanciaId = 1;
            StockTpoInstanciaNom = 'c7.Small';
            break;
        case 'Sc7M':
            StockTpoInstanciaId = 2;
            StockTpoInstanciaNom = 'c7.Medium';
            break;
        case 'Sc7L':
            StockTpoInstanciaId = 3;
            StockTpoInstanciaNom = 'c7.Large';
            break;
        case 'Sr7S':
            StockTpoInstanciaId = 4;
            StockTpoInstanciaNom = 'r7.Small';
            break;
        case 'Sr7M':
            StockTpoInstanciaId = 5;
            StockTpoInstanciaNom = 'r7.Medium';
            break;
        case 'Sr7L':
            StockTpoInstanciaId = 6;
            StockTpoInstanciaNom = 'r7.Large';
            break;
        case 'Si7M':
            StockTpoInstanciaId = 7;
            StockTpoInstanciaNom = 'i7.Medium';
            break;
        case 'Si7L':
            StockTpoInstanciaId = 8;
            StockTpoInstanciaNom = 'i7.Large';
            break;
        default:
            document.querySelector('#pMsgErrModStock').innerHTML = 'Debe seleccionar una opción';
            return;
    }
    //console.log(StockTpoInstanciaId)
    //console.log(StockTpoInstanciaNom)

    let stockDisponibleObt = consultarStock(StockTpoInstanciaId);
    let cantAlquileresObt = CantAlquileresPorInstancia(StockTpoInstanciaNom);
    console.log(cantAlquileresObt)
    console.log(newStock)
    if (cantAlquileresObt === newStock) {
        document.querySelector("#pMsgStockInfo").innerHTML = `${newStock} es el stock disponible actual, ingrese otro número`

    } else if (cantAlquileresObt > newStock) {

        document.querySelector('#pMsgStockInfo').innerHTML = `Stock no válido.<br><br>El stock actual para el tipo de instancia solicitada es: ${stockDisponibleObt}
                                                            <br>El numero total de alquileres para ese tipo de instancia es: ${cantAlquileresObt}`;
    } else {
        for (let i = 0; i < sistema.instancias.length; i++) {
            console.log(sistema.instancias[i].id)
            console.log(StockTpoInstanciaId)
            if (Number(sistema.instancias[i].id) === StockTpoInstanciaId) {
                sistema.instancias[i].stock = newStock;


            }
        }
        document.querySelector("#pMsgStockInfo").innerHTML = `Stock actualizado con éxito. Nuevo stock: ${newStock}`
    }

    document.querySelector('#pMsgErrModStock').innerHTML = '';
}

function consultarStock(instanciaDeConsulta) {
    // console.log(instanciaDeConsulta)
    let stockDisponible = 0;

    for (let i = 0; i < sistema.instancias.length; i++) {
        //console.log(instanciaDeConsulta)
        //console.log(sistema.instancias[i].id)

        if (Number(sistema.instancias[i].id) === instanciaDeConsulta) {
            //  console.log('entre')

            stockDisponible = sistema.instancias[i].stock;
        }
    }
    //console.log(stockDisponible);

    return stockDisponible;
}

function CantAlquileresPorInstancia(AlqTpoInstanciaNom) {
    let cantAlquileres = 0;
    for (let i = 0; i < sistema.alquileres.length; i++) {
        if (sistema.alquileres[i].tipoDeInstancia === AlqTpoInstanciaNom) {
            cantAlquileres++;
        }
    }
    //console.log(cantAlquileres);

    return cantAlquileres;
}




function armarInformeAdmin() {

    let tablaInforme = '';
    /* let InfoTipoInstancia = ''; */
    let tblCantidadTpo1 = 0;
    let tblIngTotTpo1 = 0;
    let tblCantidadTpo2 = 0;
    let tblIngTotTpo2 = 0;
    let tblCantidadTpo3 = 0;
    let tblIngTotTpo3 = 0;
    let tblCantidadTpo4 = 0;
    let tblIngTotTpo4 = 0;
    let tblCantidadTpo5 = 0;
    let tblIngTotTpo5 = 0;
    let tblCantidadTpo6 = 0;
    let tblIngTotTpo6 = 0;
    let tblCantidadTpo7 = 0;
    let tblIngTotTpo7 = 0;
    let tblCantidadTpo8 = 0;
    let tblIngTotTpo8 = 0;

    /* cargarInforme(InfoTipoInstancia); */

    for (let i = 0; i < sistema.alquileres.length; i++) {

        switch (sistema.alquileres[i].tipoDeInstancia) {
            case 'c7.Small':
                tblCantidadTpo1++;
                tblIngTotTpo1 += (sistema.alquileres[i].costoAlquiler + (sistema.alquileres[i].costoEncendido * sistema.alquileres[i].vecesEncendida));
                break;
            case 'c7.Medium':
                tblCantidadTpo2++;
                tblIngTotTpo2 += (sistema.alquileres[i].costoAlquiler + (sistema.alquileres[i].costoEncendido * sistema.alquileres[i].vecesEncendida));
                break;
            case 'c7.Large':
                tblCantidadTpo3++;
                tblIngTotTpo3 += (sistema.alquileres[i].costoAlquiler + (sistema.alquileres[i].costoEncendido * sistema.alquileres[i].vecesEncendida));
                break;
            case 'r7.Small':
                tblCantidadTpo4++;
                tblIngTotTpo4 += (sistema.alquileres[i].costoAlquiler + (sistema.alquileres[i].costoEncendido * sistema.alquileres[i].vecesEncendida));
                break;
            case 'r7.Medium':
                tblCantidadTpo5++;
                tblIngTotTpo5 += (sistema.alquileres[i].costoAlquiler + (sistema.alquileres[i].costoEncendido * sistema.alquileres[i].vecesEncendida));
                break;
            case 'r7.Large':
                tblCantidadTpo6++;
                tblIngTotTpo6 += (sistema.alquileres[i].costoAlquiler + (sistema.alquileres[i].costoEncendido * sistema.alquileres[i].vecesEncendida));
                break;
            case 'i7.Medium':
                tblCantidadTpo7++;
                tblIngTotTpo7 += (sistema.alquileres[i].costoAlquiler + (sistema.alquileres[i].costoEncendido * sistema.alquileres[i].vecesEncendida));
                break;
            case 'i7.Large':
                tblCantidadTpo8++;
                tblIngTotTpo8 += (sistema.alquileres[i].costoAlquiler + (sistema.alquileres[i].costoEncendido * sistema.alquileres[i].vecesEncendida));
                break;
        }

        tablaInforme = `<tr><td> c7.Small </td>
                        <td> ${tblCantidadTpo1} </td>
                        <td>US$ ${tblIngTotTpo1} </td></tr>
                        <tr><td> c7.Medium </td>
                        <td> ${tblCantidadTpo2} </td>
                        <td> US$ ${tblIngTotTpo2} </td></tr>
                        <tr><td> c7.Large </td>
                        <td> ${tblCantidadTpo3} </td>
                        <td> US$ ${tblIngTotTpo3} </td></tr>
                        <tr><td> r7.Small </td>
                        <td> ${tblCantidadTpo4} </td>
                        <td> US$ ${tblIngTotTpo4} </td></tr>
                        <tr><td> r7.Medium </td>
                        <td> ${tblCantidadTpo5} </td>
                        <td> US$ ${tblIngTotTpo5} </td></tr>
                        <tr><td> r7.Large </td>
                        <td> ${tblCantidadTpo6} </td>
                        <td> US$ ${tblIngTotTpo6} </td></tr>
                        <tr><td> i7.Medium </td>
                        <td> ${tblCantidadTpo7} </td>
                        <td> US$ ${tblIngTotTpo7} </td></tr>
                        <tr><td> i7.Large </td>
                        <td> ${tblCantidadTpo8} </td>
                        <td> US$ ${tblIngTotTpo8} </td></tr>`;

    }

    document.querySelector("#tblInforme").innerHTML = tablaInforme;

}