var http_request = false;

function makeRequest(url) {
    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/plain');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', url, true);
    http_request.send(null);

}

function makeRequest1(url) {
    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/XML');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', url, true);
    http_request.send(null);

}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            /*Aquí deben procesar el JSON y mostrar la respuesta en el HTML*/
            let lista = document.getElementById("lista")
            var documento = http_request.response;
            var docJson=JSON.parse(documento);
            for(i=0;i<docJson.length;i++){
                let nombre=docJson[i].nombre;
                let elemento = document.createElement("li")
                let link = document.createElement("a")
                link.setAttribute("href","#")
                let texto = document.createTextNode(nombre)
                link.appendChild(texto)
                elemento.appendChild(link)
                lista.appendChild(elemento)
            }
            
        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}

window.onload = function() {
        makeRequest('gastos_personales.json');
    
}