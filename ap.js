
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
                alert("entroo")
                let texto ="";
                for(i=0;i<servicios.length;i++){
                    let deuda=servicios[i]["deuda"];
                    let tipo_servicio=servicios[i]["servicio"];
                     texto+="Deuda: "+deuda+"\n"+"Servicio: "+tipo_servicio+"\n";
                    /*let info=cargarInfoServicio(tipo_servicio);
                    texto+="\n"+info;*/ 
                }
                alert(texto);

            });

           

        });
        
    });
}


window.onload = function() {
    cargarNombres() ;
}