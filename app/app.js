(function() {
    //ServiceWorker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
                 .register('./service-worker.js')
                 .then(function() {
                     console.log('Service Worker Registered');
                });
    }
})( );

(  function() {
    var app = {
        perroEstadoFilter: document.getElementById( "perroEstadoFilter" ),
        perroList: [],
        localList : [],
    }

    var loadData = function() {
        var xhttp = new XMLHttpRequest();
        var url = "https://furby.pythonanywhere.com/perros/";

        xhttp.onreadystatechange = function() {
            if( this.readyState == 4 && this.status == 200 ){
                console.log( this.responseText );
                var data = JSON.parse( this.responseText );
                displayPerros( data.results );
                localStorage.setItem('perros',JSON.stringify(data.results));
                app.perroList = data.results;
            }
        }
        xhttp.open( 'GET', url, true );
        xhttp.send();
    }

    var displayPerros = function( perros ) {
        var perrosContainer = document.getElementById( "perrosContainer");
        perrosContainer.innerHTML = "";

        for( let perro of perros ) {
            var perroContainer = document.createElement( "div" );
            var txtPerroNombre = document.createElement( "h3" );
            var imgPerro = document.createElement( "img" );
            var txtPerroCaracteristica = document.createElement( "p" );
            var txtPerroRaza = document.createElement( "p" );
            var txtPerroEstado = document.createElement( "p" );
            perroContainer.className = "perroContainer";
            txtPerroNombre.innerHTML = perro.nombre;
            imgPerro.src = perro.imageUrl;
            imgPerro.alt = perro.nombre;
            txtPerroCaracteristica.innerHTML = perro.caracteristica;
            txtPerroRaza.innerHTML = perro.raza;
            txtPerroEstado.innerHTML = "<b>Estado: </b>" + perro.estado;
            // Agrega hijos
            perroContainer.appendChild( txtPerroNombre );
            perroContainer.appendChild( imgPerro );
            perroContainer.appendChild( txtPerroCaracteristica );
            perroContainer.appendChild( txtPerroRaza );
            perroContainer.appendChild( txtPerroEstado );
            // Agregar contenedor 
            perrosContainer.appendChild( perroContainer );
        }
    }

    if(navigator.onLine){
        app.perroEstadoFilter.addEventListener("change", function(e){
            var filteredPerros = app.perroList.filter(function(perro){
                if (perro.estado == app.perroEstadoFilter.value || app.perroEstadoFilter.value == "TODOS"){
                    return perro;
                    localStorage.setItem('perros',perro);
                }
            });
            displayPerros(filteredPerros);
        });
        loadData();
    }else{
        displayPerros(JSON.parse(localStorage.getItem('perros')));
    }    

    app.perroEstadoFilter.addEventListener( "change", function( e ) {
        var filteredPerros = app.perroList.filter( function( perro ) {
            if( perro.estado == app.perroEstadoFilter.value ) {
                return perro;
            }
        } );
        displayPerros( filteredPerros );
    } );
    
    loadData();
} ) ( );
