var audio;
$(document).ready(function(){
	audio = $("audio");
	cargarLista();
	$("#nuevaCancion").on("click",function(){
		//subirCancion();
	});
	$(document).on("click",".cancion", play);
});

function cargarLista(){
	console.log("log");
	$.ajax({
		method:"get",
		url:"/cancion"
	}).done(function(canciones){
		console.log(canciones,"listado");
		var listaCanciones = $("#listaCanciones");
		listaCanciones.html("");
		canciones.forEach(function(cancion){
			var cancion = $('<div class="col-md-4 cancion" data-cancion="'+cancion.ruta+'"><h2>'+cancion.nombre+'</h2><p>'+cancion.descripcion+'</p></div>');
			listaCanciones.append(cancion);
		});
	});
}

function subirCancion(){
	var titulo = $("#ruta").val();
    var file2 = $('#ruta');   //Ya que utilizas jquery aprovechalo...
    var archivo = file2[0].files;       //el array pertenece al elemento
	// Crea un formData y lo envías
    var formData = new FormData($("#formulario-file"));
    formData.append('nombre',$("#nombre").val());
    formData.append('descripcion',$("#descripcion").val());
    formData.append('nombreArchivo',titulo);
    formData.append('ruta',archivo);
	subir(formData);
	cargarLista();
}

function subir(formData){
	$.ajax({
		method:"post",
		url:"/cancion",
		data:formData
	});
}

function play(evento){
	//cambiar el src
	//que empiece a sonar
	audio[0].pause();
	audio.attr("src","/cancion/"+$(this).data("cancion"));
	audio[0].play();
}