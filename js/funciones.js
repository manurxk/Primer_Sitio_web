// ACCESO
function inicializar_formulario_acceso() {
    $('#panel-acceso').addClass('animated zoomInDown');
    siguiente_campo('#usuario_usuario', '#clave_usuario', false);
    siguiente_campo('#clave_usuario', '#boton-ingresar', false);
    $('#usuario_usuario').focus();
    cerrar_session_ajax();
}
function validar_acceso() {
    var usuario = $('#usuario_usuario').val();
    var clave = $('#clave_usuario').val();
    if (usuario === '') {
        mostrar_mensaje('Mensaje del Sistema', 'Usuario en blanco', 'Aceptar', '#usuario_usuario');
    } else if (clave === '') {
        mostrar_mensaje('Mensaje del Sistema', 'Clave en blanco', 'Aceptar', '#clave_usuario');
    } else {
        validar_acceso_ajax();
    }
}

function validar_acceso_ajax() {
    var pDatosFormulario = $("#form_acceso").serialize();
    console.log(pDatosFormulario);
    var pUrl = "usuario/validar";
    var pBeforeSend = "";
    var pSuccess = "validar_acceso_ajax_success(json)";
    var pError = "ajax_error()";
    var pComplete = "";
    ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete);
}

function validar_acceso_ajax_success(json) {
    if (json.acceso === true) {
        location.href = 'elegirdeposito.html';
    } else {
        mostrar_mensaje("Mensaje del Sistema", "Credencial Incorrecta", "Aceptar", "");
    }
}

function salir_acceso() {
    $('#panel-acceso').addClass('zoomOutDown');
}

// ELEGIR EMPRESA SUCURSAL DEPOSITO Y ROL
function inicializar_formulario_elegir_deposito() {
    $('#panel-elegirdeposito').addClass('animated zoomInLeft');
    $('#boton-elegir').focus();
    recuperar_session_ajax();
}

function recuperar_session_ajax() {
    var pDatosFormulario = '';
    var pUrl = "session/validar";
    var pBeforeSend = "";
    var pSuccess = "recuperar_session_ajax_success(json)";
    var pError = "ajax_error()";
    var pComplete = "";
    ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete);
}

function recuperar_session_ajax_success(json) {
    if (json.logueado !== true) {
        location.href = "./";
    }
    var id_usuario = json.usuario.id_usuario;
    buscar_usuariorol_ajax(id_usuario);
    buscar_usuariodeposito_ajax(id_usuario);
}

// BUSCAR USUARIOROL
function buscar_usuariorol_ajax(id_usuario) {
    var pDatosFormulario = "id_usuario=" + id_usuario;
    var pUrl = "usuariorol/buscar/usuario/id";
    var pBeforeSend = "";
    var pSuccess = "buscar_usuariorol_ajax_success(json)";
    var pError = "ajax_error()";
    var pComplete = "";
    ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete);
}

function buscar_usuariorol_ajax_success(json) {
    mostrar_datos_usuariorol(json);
}

function mostrar_datos_usuariorol(json) {
    var datos = "";
    $.each(json, function (key, value) {
        datos += "<tr onclick='seleccionar_usuariorol($(this))'>";
        datos += "<td><input type='checkbox'></td>";
        datos += "<td>" + value.id_usuariorol + "</td>";
        datos += "<td>" + value.id_rol + "</td>";
        datos += "<td>" + value.nombre_rol + "</td>";
        datos += "</tr>";
    });
    if (datos === '') {
        datos += "<tr><td colspan='3'>No existen registros ...</td></tr>";
    }
    $('#tbody_datos_usuariorol').html(datos);
    $('#tabla-rol').find('input').eq(0).prop('checked', true);
}

function seleccionar_usuariorol($this) {
    $this.parent().find('input').prop('checked', false);
    if ($this.find('input').prop('checked')) {
        $this.find('input').prop('checked', false);
    } else {
        $this.find('input').prop('checked', true);
    }
}

// BUSCAR USUARIODEPOSITO
function buscar_usuariodeposito_ajax(id_usuario) {
    var pDatosFormulario = "id_usuario=" + id_usuario;
    var pUrl = "usuariodeposito/buscar/usuario/id";
    var pBeforeSend = "";
    var pSuccess = "buscar_usuariodeposito_ajax_success(json)";
    var pError = "ajax_error()";
    var pComplete = "";
    ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete);
}

function buscar_usuariodeposito_ajax_success(json) {
    mostrar_datos_usuariodeposito(json);
}

function mostrar_datos_usuariodeposito(json) {
    console.log(json);
    var datos = "";
    $.each(json, function (key, value) {
        datos += "<tr onclick='seleccionar_usuariodeposito($(this))'>";
        datos += "<td><input type='checkbox'></td>";
        datos += "<td>" + value.id_usuariodeposito + "</td>";
        datos += "<td>" + value.id_empresa + "</td>";
        datos += "<td>" + value.nombre_empresa + "</td>";
        datos += "<td>" + value.id_sucursal + "</td>";
        datos += "<td>" + value.nombre_sucursal + "</td>";
        datos += "<td>" + value.id_deposito + "</td>";
        datos += "<td>" + value.nombre_deposito + "</td>";
        datos += "</tr>";
    });
    if (datos === '') {
        datos += "<tr><td colspan='7'>No existen registros ...</td></tr>";
    }
    $('#tbody_datos_usuariodeposito').html(datos);
    $('#tabla-deposito').find('input').eq(0).prop('checked', true);
}

function seleccionar_usuariodeposito($this) {
    $this.parent().find('input').prop('checked', false);
    if ($this.find('input').prop('checked')) {
        $this.find('input').prop('checked', false);
    } else {
        $this.find('input').prop('checked', true);
    }
}

// ELEGIR EMPRESA SUCURSAL DEPOSITO Y ROL
function elegir_deposito() {

    var id_rol = 0;
    var nombre_rol = '';

    var id_empresa = 0;
    var nombre_empresa = '';

    var id_sucursal = 0;
    var nombre_sucursal = '';
    
    var id_deposito = 0;
    var nombre_deposito = '';

    var filas = $('#tbody_datos_usuariorol tr');
    $.each(filas, function (index, fila) {
        var elegido = $(this).find('input').prop('checked');
        if (elegido) {
            id_rol = $(this).find('td').eq(2).text();
            nombre_rol = $(this).find('td').eq(3).text();
        }
    });

    filas = $('#tbody_datos_usuariodeposito tr');
    $.each(filas, function (index, fila) {
        var elegido = $(this).find('input').prop('checked');
        if (elegido) {
            id_empresa = $(this).find('td').eq(2).text();
            nombre_empresa = $(this).find('td').eq(3).text();
            id_sucursal = $(this).find('td').eq(4).text();
            nombre_sucursal = $(this).find('td').eq(5).text();
            id_deposito = $(this).find('td').eq(6).text();
            nombre_deposito = $(this).find('td').eq(7).text();
        }
    });
    console.log('id_rol=' + id_rol + " - nombre_rol=" + nombre_rol);
    console.log('id_empresa=' + id_empresa + " - nombre_empresa=" + nombre_empresa);
    console.log('id_sucursal=' + id_sucursal + " - nombre_sucursal=" + nombre_sucursal);
    console.log('id_deposito=' + id_deposito + " - nombre_deposito=" + nombre_deposito);

    elegir_deposito_ajax(id_rol, nombre_rol, id_empresa, nombre_empresa, id_sucursal, nombre_sucursal, id_deposito, nombre_deposito);
}

function elegir_deposito_ajax(id_rol, nombre_rol, id_empresa, nombre_empresa, id_sucursal, nombre_sucursal, id_deposito, nombre_deposito) {
    var pDatosFormulario = "id_rol=" + id_rol + "&nombre_rol=" + nombre_rol +
            "&id_empresa=" + id_empresa + "&nombre_empresa=" + nombre_empresa +
            "&id_sucursal=" + id_sucursal + "&nombre_sucursal=" + nombre_sucursal +
            "&id_deposito=" + id_deposito + "&nombre_deposito=" + nombre_deposito;
    console.log(pDatosFormulario);
    var pUrl = "session/actualizar";
    var pBeforeSend = "";
    var pSuccess = "elegir_deposito_ajax_success(json)";
    var pError = "ajax_error()";
    var pComplete = "";
    ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete);
}

function elegir_deposito_ajax_success(json) {
    console.log(json);
    if (json.actualizado) {
        location.href = './menu.html';
    } else {
        mostrar_mensaje("Mensaje del Sistema", "ERROR: No se pudo actualizar los datos", "Aceptar", "#boton-elegir");
    }
}

function salir_elegirdeposito() {
    location.href = './';
}
// MENU
var ocultar = false;
function inicializar_menu() {
    $("#s_nombre_formulario").text('Menú');
    validar_session_ajax();
    $('#boton-menu').on('click', function () {
        $('nav').toggleClass('ocultar');
        $('main').toggleClass('ocultar');
        if (ocultar === false) {
            ocultar = true;
            $(this).removeClass('glyphicon-menu-left').addClass('glyphicon-menu-right');
        } else {
            ocultar = false;
            $(this).removeClass('glyphicon-menu-right').addClass('glyphicon-menu-left');
        }
    });
    $('#boton-logout').on('click', function () {
        location.href = './';
    });
    $('#boton-refrescar').on('click', function () {
        location.href = './menu.html';
    });
    generar_menu_ajax();
}

function generar_menu_ajax() {
    var pDatosFormulario = "id_rol=1";
    var pUrl = "permiso/buscar/rol/id";
    var pBeforeSend = "";
    var pSuccess = "generar_menu_ajax_success(json)";
    var pError = "ajax_error()";
    var pComplete = "";
    ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete);
}

function generar_menu_ajax_success(json) {
    console.log(json);
    var menu = '';
    var g_id_sistema = 0;
    var id_sistema = 0;
    var g_id_submenu = 0;
    var id_submenu = 0;
    $.each(json, function (key, value) {
        //console.log(key);
        id_sistema = value.id_sistema;
        id_submenu = value.id_submenu;
        if (g_id_sistema !== id_sistema) {
            if (g_id_sistema === 0) {
                menu = '<li>PuntoVenta_20180104_1800\n';
                menu += "<ul>\n";
            } else {
                g_id_submenu = 0;
                menu += "</ul>\n";
                menu += "</li>\n";
                menu += "</ul>\n";
                menu += "</li>\n";
            }
            menu += "<li>" + value.nombre_sistema + "\n";
            menu += "<ul>\n";
            g_id_sistema = id_sistema;
        }
        if (g_id_submenu !== id_submenu) {
            if (g_id_submenu !== 0) {
                menu += "</ul>\n";
                menu += "</li>\n";
            }
            menu += "<li>" + value.nombre_submenu + "\n";
            menu += "<ul>\n";
            g_id_submenu = id_submenu;
        }
        menu += "<li><a onclick=\"cargar_formulario('" + value.url_formulario + "')\" href=\"#\">" +
                value.nombre_formulario + "</a></li>\n";
    });
    if (menu !== '') {
        menu += "</ul>\n";
        menu += "</li>\n";
        menu += "</ul>\n";
        menu += "</li>\n";
    }
    $('#menu').html(menu);
    ver_menu();
}

function ver_menu() {
    //$("#menu ul").hide();
    $("#menu li").each(function () {
        var handleSpan = $("<span></span>");
        handleSpan.addClass("handle");
        handleSpan.prependTo(this);
        if ($(this).has("ul").length > 0) {
            handleSpan.addClass("collapsed");
            handleSpan.click(function () {
                var clicked = $(this);
                clicked.toggleClass("collapsed expanded");
                clicked.siblings("ul").toggle();
            });
        } else {
            handleSpan.click(function () {
                var clicked = $(this);
                //console.log('---> ' + clicked.parent().html());
            });
        }
    });
}

// FUNCIONES GENERALES
function mostrar_mensaje(titulo, mensaje, textoBoton, focusCampo) {
    $('body').append('<div id="mensajes"></div>');
    modal = '<div id="divModal" class="modal fade" tabindex="-1" role="dialog" ';
    modal += '     aria-labelledby="gridSystemModalLabel">';
    modal += '<div class="modal-dialog" role="document">';
    modal += '<div class="modal-content">';
    modal += '  <div class="modal-header">';
    modal += '    <button type="button" class="close" data-dismiss="modal" ';
    modal += '            aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    modal += '    <h4 class="modal-title" id="gridSystemModalLabel">' + titulo + '</h4>';
    modal += '  </div>';
    modal += '  <div class="modal-body">';
    modal += '     ' + mensaje;
    modal += '  </div>';
    modal += '  <div class="modal-footer">';
    modal += '    <button id="botonAceptar" type="button" class="btn btn-primary"';
    modal += '            data-dismiss="modal">' + textoBoton + '</button>';
    modal += '  </div>';
    modal += '</div>';
    modal += '</div>';
    modal += '</div>';
    $('#mensajes').html(modal);
    $('#divModal').modal('show');
    $('#divModal').on('shown.bs.modal', function (e) {
        $('#botonAceptar').focus();
    });
    $('#divModal').on('hidden.bs.modal', function (e) {
        $(focusCampo).focus();
        $('#mensajes').remove();
    });
}

function mostrar_confirmar(titulo, mensaje, textoBoton, funcion) {
    $('body').append('<div id="confirmar"></div>');
    modal = '<div id="divModal" class="modal fade" tabindex="-1" role="dialog" ';
    modal += '     aria-labelledby="gridSystemModalLabel">';
    modal += '<div class="modal-dialog" role="document">';
    modal += '<div class="modal-content">';
    modal += '  <div class="modal-header">';
    modal += '    <button type="button" class="close" data-dismiss="modal" ';
    modal += '            aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    modal += '    <h4 class="modal-title" id="gridSystemModalLabel">' + titulo + '</h4>';
    modal += '  </div>';
    modal += '  <div class="modal-body">';
    modal += '     ' + mensaje;
    modal += '  </div>';
    modal += '  <div class="modal-footer">';
    modal += '    <button id="botonAceptar" type="button" class="btn btn-primary"';
    modal += '            onclick=eval(' + funcion + ') ';
    modal += '            data-dismiss="modal">' + textoBoton + '</button>';
    modal += '    <button id="botonCancelar" type="button" class="btn btn-primary"';
    modal += '            data-dismiss="modal">Cancelar</button>';
    modal += '  </div>';
    modal += '</div>';
    modal += '</div>';
    modal += '</div>';
    $('#confirmar').html(modal);
    $('#divModal').modal('show');
    $('#divModal').on('shown.bs.modal', function (e) {
        $('#botonCancelar').focus();
    });
    $('#divModal').on('hidden.bs.modal', function (e) {
        $('#confirmar').remove();
    });
}

function cargar_formulario(frm) {
    $("#busquedas").remove();
    $("#formularios").load(frm);
}

function cargar_busqueda(frm) {
    $('main').append('<div id="busquedas" class="oculto"></div>');
    $("#busquedas").load(frm);
    $("#panel-formulario").fadeOut(500, function () {
        $("#busquedas").fadeIn(500, function () { // callback - funcion anonima
            $("#buscar_texto").focus();
        });
    });
}

function cargar_busqueda_detalle(frm) {
    $('main').append('<div id="busquedas" class="oculto"></div>');
    $("#busquedas").load(frm);
    $("#detalles").fadeOut(500, function () {
        $("#busquedas").fadeIn(500, function () { // callback - funcion anonima

        });
    });
}

function cargar_detalle(frm) {
    $('main').append('<div id="detalles" class="oculto"></div>');
    $("#detalles").load(frm);
    $("#panel-formulario").fadeOut(500, function () {
        $("#detalles").fadeIn(500, function () { // callback - funcion anonima

        });
    });
}

function salir_formulario() {
    $("#formularios").html("");
}

function salir_busqueda(campo) {
    $("#busquedas").fadeOut(500, function () {
        $("#busquedas").remove();
        $("#panel-formulario").fadeIn(500, function () {
            $(campo).focus();
            $(campo).select();
        });
    });
}

function salir_busqueda_detalle() {
    $("#busquedas").fadeOut(500, function () {
        $("#busquedas").remove();
        $("#detalles").fadeIn(500, function () {

        });
    });
}

function salir_detalle() {
    $("#detalles").fadeOut(500, function () {
        $("#detalles").remove();
        $("#panel-formulario").fadeIn(500, function () {

        });
    });
}

function habilitar_agregar() {
    $("#boton-agregar").prop("disabled", false);
    $("#boton-modificar").prop("disabled", true);
    $("#boton-eliminar").prop("disabled", true);
}

function deshabilitar_agregar() {
    $("#boton-agregar").prop("disabled", true);
    $("#boton-modificar").prop("disabled", false);
    $("#boton-eliminar").prop("disabled", false);
}

function anterior(pFuncion) {
    var pag = parseInt($("#pagina").val());
    if (pag > 1) {
        $("#pagina").val(pag - 1);
    }
    eval(pFuncion);
}

function siguiente(pFuncion) {
    var pag = parseInt($("#pagina").val());
    $("#pagina").val(pag + 1);
    eval(pFuncion);
}

// SESSION
function validar_session_ajax() {
    var pDatosFormulario = '';
    var pUrl = "session/validar";
    var pBeforeSend = "";
    var pSuccess = "validar_session_ajax_success(json)";
    var pError = "ajax_error()";
    var pComplete = "";
    ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete);
}

function validar_session_ajax_success(json) {
    console.log(json);
    if (json.logueado !== true) {
        location.href = "./";
    }
    $('#s_nombre_empresa').html(json.deposito.nombre_empresa);
    $('#s_nombre_sucursal').html(json.deposito.nombre_sucursal);
    $('#s_nombre_deposito').html(json.deposito.nombre_deposito);
    $('#s_usuario_usuario').html(json.usuario.usuario_usuario);
    $('#s_nombre_rol').html(json.rol.nombre_rol);
    id_usuario = json.usuario.id_usuario;
}

function cerrar_session_ajax() {
    var pDatosFormulario = '';
    var pUrl = "session/cerrar";
    var pBeforeSend = "";
    var pSuccess = "cerrar_session_ajax_success(json)";
    var pError = "ajax_error()";
    var pComplete = "";
    ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete);
}

function cerrar_session_ajax_success(json){
    // console.log(json);
}

// AJAX
// CALLBACK
//function ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete) {
//    $.ajax({
//        type: 'POST',
//        url: pUrl,
//        data: pDatosFormulario,
//        dataType: 'json',
//        beforeSend: function (objeto) {
//            eval(pBeforeSend);
//        },
//        success: function (json) {
//            eval(pSuccess);
//        },
//        error: function (e) {
//            eval(pError);
//        },
//        complete: function (objeto, exito, error) {
//            eval(pComplete);
//        }
//    });
//}
// PROMISE (PROMESAS)
function ajax(pDatosFormulario, pUrl, pBeforeSend, pSuccess, pError, pComplete) {
    eval(pBeforeSend);
    $.ajax({
        type: 'POST',
        url: pUrl,
        data: pDatosFormulario,
        dataType: 'json'
    }).done(function (json) {
        eval(pSuccess);
    }).fail(function (e) {
        eval(pError);
    }).always(function (objeto, exito, error) {
        eval(pComplete);
    });
}

function ajax_error() {
    mostrar_mensaje("Mensaje del Sistema", "ERROR: No se pudo conectar con el Servidor", "Aceptar", "");
}

function getDDMMYYYY(fecha) {
    // fecha = 2016-01-02 -> ddmmyyyy = 02/01/2016
    var dd = fecha.substr(8, 2);
    var mm = fecha.substr(5, 2);
    var yyyy = fecha.substr(0, 4);
    var ddmmyyyy = dd + "/" + mm + "/" + yyyy;
    return ddmmyyyy;
}

// NUMEROS
function dar_formato_numero(numero, separador_decimal, separador_miles) {
    var fnumero = "";
    var snumero = numero.toString().replace(/\./g, "");
    snumero = snumero.replace(/[a-z]|_|%/ig, "");
    var pdecimal = snumero.indexOf(",");
    var psigno = snumero.indexOf("-");
    var enumero = snumero;
    var edecimal = "";
    var esigno = "";
    if (psigno !== -1) {
        esigno = "-";
        enumero = snumero.substr(1, snumero.length);
    }
    if (pdecimal !== -1) {
        if (psigno === -1) {
            enumero = snumero.substr(0, pdecimal);
        } else {
            enumero = snumero.substr(1, pdecimal - 1);
        }
        edecimal = snumero.substr(pdecimal, snumero.length);
    }
    var longitud = enumero.length;
    for (pos = longitud - 1; pos >= 0; pos--) {
        var cnumero = enumero.charAt(pos);
        fnumero = cnumero + fnumero;
        if ((longitud - pos) !== longitud) {
            if ((longitud - pos) % 3 === 0) {
                fnumero = separador_miles + fnumero;
            }
        }
    }
    fnumero = esigno + fnumero + edecimal;
    return fnumero;
}

function formatear_hora(hora) {
    var fhora = "";
    var shora = hora.toString().replace(/\:/g, "");
    var longitud = shora.length - 1;
    if (longitud > 3) {
        longitud = 3;
    }
    for (pos = longitud; pos >= 0; pos--) {
        var chora = shora.charAt(pos);
        fhora = chora + fhora;
        if (pos === 2) {
            fhora = ":" + fhora;
        }
    }
    return fhora;
}

function formatear_numero(id) {
    var tecla = event.which;
    if (tecla !== 37 && tecla !== 38 && tecla !== 39 && tecla !== 40 && tecla !== 9) {
        var monto = $(id).val();
        $(id).val(dar_formato_numero(monto, ",", "."));
    }
}
function quitar_formato_numero(numero) {
    numero = numero.toString().replace(/\./g, "").replace(/\,/g, ".");
    console.log(numero);
    return parseFloat(numero);
}

function formatear_vencimiento(vencimiento) {
    console.log('--> ' + vencimiento);
    var fvencimiento = "";
    var svencimiento = vencimiento.toString().replace(/\:/g, "");
    var longitud = svencimiento.length - 1;
    if (longitud > 3) {
        longitud = 3;
    }
    for (pos = longitud; pos >= 0; pos--) {
        var cvencimiento = svencimiento.charAt(pos);
        fvencimiento = cvencimiento + fvencimiento;
        if (pos === 2) {
            fvencimiento = ":" + fvencimiento;
        }
    }
    return fvencimiento;
}

// NUMEROS A LETRAS
function Unidades(num) {

    switch (num)
    {
        case 1:
            return'UN';
        case 2:
            return'DOS';
        case 3:
            return'TRES';
        case 4:
            return'CUATRO';
        case 5:
            return'CINCO';
        case 6:
            return'SEIS';
        case 7:
            return'SIETE';
        case 8:
            return'OCHO';
        case 9:
            return'NUEVE';
    }

    return'';
}//Unidades()

function Decenas(num) {

    decena = Math.floor(num / 10);
    unidad = num - (decena * 10);

    switch (decena)
    {
        case 1:
        switch (unidad)
        {
            case 0:
                return'DIEZ';
            case 1:
                return'ONCE';
            case 2:
                return'DOCE';
            case 3:
                return'TRECE';
            case 4:
                return'CATORCE';
            case 5:
                return'QUINCE';
            default:
                return'DIECI' + Unidades(unidad);
        }
        case 2:
        switch (unidad)
        {
            case 0:
                return'VEINTE';
            default:
                return'VEINTI' + Unidades(unidad);
        }
        case 3:
            return DecenasY('TREINTA', unidad);
        case 4:
            return DecenasY('CUARENTA', unidad);
        case 5:
            return DecenasY('CINCUENTA', unidad);
        case 6:
            return DecenasY('SESENTA', unidad);
        case 7:
            return DecenasY('SETENTA', unidad);
        case 8:
            return DecenasY('OCHENTA', unidad);
        case 9:
            return DecenasY('NOVENTA', unidad);
        case 0:
            return Unidades(unidad);
    }
}//Unidades()

function DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
        return strSin + ' Y ' + Unidades(numUnidades)

    return strSin;
}//DecenasY()

function Centenas(num) {
    centenas = Math.floor(num / 100);
    decenas = num - (centenas * 100);

    switch (centenas)
    {
        case 1:
            if (decenas > 0)
                return'CIENTO ' + Decenas(decenas);
            return'CIEN';
        case 2:
            return'DOSCIENTOS ' + Decenas(decenas);
        case 3:
            return'TRESCIENTOS ' + Decenas(decenas);
        case 4:
            return'CUATROCIENTOS ' + Decenas(decenas);
        case 5:
            return'QUINIENTOS ' + Decenas(decenas);
        case 6:
            return'SEISCIENTOS ' + Decenas(decenas);
        case 7:
            return'SETECIENTOS ' + Decenas(decenas);
        case 8:
            return'OCHOCIENTOS ' + Decenas(decenas);
        case 9:
            return'NOVECIENTOS ' + Decenas(decenas);
    }

    return Decenas(decenas);
}//Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    letras = '';

    if (cientos > 0)
        if (cientos > 1)
            letras = Centenas(cientos) + ' ' + strPlural;
        else
            letras = strSingular;

    if (resto > 0)
        letras += '';

    return letras;
}//Seccion()

function Miles(num) {
    divisor = 1000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
    strCentenas = Centenas(resto);

    if (strMiles == '')
        return strCentenas;

    return strMiles + ' ' + strCentenas;
}//Miles()

function Millones(num) {
    divisor = 1000000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)

    strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
    strMiles = Miles(resto);

    if (strMillones == '')
        return strMiles;

    return strMillones + ' ' + strMiles;
}//Millones()

function NumeroALetras(num) {
    var data = {
        numero: num,
        enteros: Math.floor(num),
        centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
        letrasCentavos: '',
        letrasMonedaPlural: '.-', //'PESOS', 'Dólares', 'Bolívares', 'etcs'
        letrasMonedaSingular: '.-', //'PESO', 'Dólar', 'Bolivar', 'etc'

        letrasMonedaCentavoPlural: 'CENTAVOS',
        letrasMonedaCentavoSingular: 'CENTAVO'
    };

    if (data.centavos > 0) {
        data.letrasCentavos = 'CON ' + (function () {
            if (data.centavos == 1)
                return Millones(data.centavos) + '' + data.letrasMonedaCentavoSingular;
            else
                return Millones(data.centavos) + '' + data.letrasMonedaCentavoPlural;
        })();
    }
    ;

    if (data.enteros == 0)
        return'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    if (data.enteros == 1)
        return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
    else
        return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
}//NumeroALetras()

function getFixed(numero, decimales) {
    var valor = parseFloat(numero).toFixed(decimales);
    var valor_string = valor.toString().replace('.', ',');
    var valor_formateado = dar_formato_numero(valor_string.replace('.', ','), ',', '.');
    return valor_formateado;
}

function siguiente_campo(actual, siguiente, preventDefault) {
    $(actual).on('keydown', function (event) {
        //console.log("---> "+event.which);
        if (event.which === 13) {
            if (preventDefault) {
                event.preventDefault();
            }
            $(siguiente).focus();
            $(siguiente).select();
        }
    });
}

function mes(numero){
    var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"];
    return meses[numero-1];
}