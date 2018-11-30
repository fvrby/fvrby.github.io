(function(){
    var xhttp = new XMLHttpRequest();
    var url = "http://127.0.0.1:8000/perros/";
    var txtData= document.getElementById("txtData");

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var data = this.responseText;
            txtData.innerHTML = data;
        }
    }
    xhttp.open( "GET", url, true);
    xhttp.send( );

} ) ( );