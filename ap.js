
function cargarNombres() {

    /*carga de artistas desde cantantes.json*/

    $.getJSON("gastos_personales.json", function(data) {
        $.each(data, function(key, val) {
            var nombre = val["nombre"]
            var ul = $('<ul></ul>')
            ul.attr('class', 'lista-nombres');
            $('#lista').append(ul);
            let li = $('<li></li>');
            let a = $('<a></a>');
            a.attr('href', '#')
            a.attr("class","referencia")
            /*a.click({ritmo: titulo}, filtrar);*/
             var servicios= val["servicios"];
            var deudatotal=0;
            for(i=0;i<servicios.length;i++){
                    let deuda=servicios[i]["deuda"];
                    deudatotal+=parseFloat(deuda);
                }
             nombre+=": ";
            nombre+= deudatotal;
            a.append(nombre)
            li.append(a);
            ul.append(li);
            $('.referencia').click(function(){
                let texto ="";
                let texto1 = "";
                for(i=0;i<servicios.length;i++){
                    let deuda=servicios[i]["deuda"];
                    let tipo_servicio=servicios[i]["servicio"];
                    texto+="Deuda: "+deuda+"\n"+"Servicio: "+tipo_servicio+"\n";
                    texto1 += cargarInfo(tipo_servicio);
                    /*let info=cargarInfoServicio(tipo_servicio);
                    texto+="\n"+info;*/ 
                }
                alert(texto);
                alert(texto1);

            });

           

        });
        
    });
}

function cargarInfo( tipo_servicio) {
    
    /*Carga de ritmos desde generos.xml*/

    $.ajax({
        url: 'servicios_basicos.xml',
        error: function() {
            alert('¡error al cargar el archivo con los ritmos!')
        },
        dataType: 'xml',
        success: function(data) {
            var ul = $('<ul></ul>')
            ul.attr('class', 'lista-generos text-center');
            $('#contenedor-generos').append(ul);

            $(data).find('servicio').each(function() {
                tipo = $(this).attr("tipo");
                console.log(tipo);
                if (tipo == tipo_servicio){
                    var nombre = $(this).find('nombre').text();
                    var direccion = $(this).find('direccion').text();
                    var telefono = $(this).find('telefono').text();
                    var texto = nombre + "  "+direccion + "  "+ telefono;
                    return texto;
                    let li = $('<li></li>');
                    let a = $('<a></a>');
                    a.attr('class', 'ritmos-latinos')
                    a.click({ritmo: titulo}, filtrar);

                    a.append(titulo)
                    li.append(a);
                    li.append(cantidad);
                    ul.append(li);
                }
                

            });

        },
        type: 'GET'
    });
}


window.onload = function() {
    cargarNombres() ;
}