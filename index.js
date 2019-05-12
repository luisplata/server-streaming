'use strict'
var express = require("express");
var app = express();
var path = require("path");
var mediaserver = require("mediaserver");
var bodyParser = require("body-parser");
var multer = require('multer');
var opcionesMulter = multer.diskStorage({
	destination:function(req,file, cb){
		cb(null,path.join(__dirname,"canciones"));
	},
	filename:function(req,file,cb){
		var extension = path.extname(file.originalname);
		var fileName = path.basename(file.originalname,extension);
		cb(null,fileName+"_"+Date.now()+extension);
	}
});

var upload = multer({storage:opcionesMulter});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var DataBase;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  DataBase = db.db("canciones");
});


app.use(express.static("front"));

// configuramos la app para que use bodyParser(), esto nos dejara usar la informacion de los POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/",function(req, res){
res.sendFile(path.join(__dirname,"front/index.html"));
});

app.get("/cancion/:nombre",function(req, res){
var archivo = path.join(__dirname,"canciones",req.params.nombre);
mediaserver.pipe(req,res,archivo);
});

app.get("/cancion",function(req,res){
	DataBase.collection("canciones").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});



app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post("/cancion", upload.single("ruta"),function(req,res){
	var archivoCancion = req.file;
	var cancion = {};
	cancion.nombre = req.body.nombre;
	cancion.descripcion = req.body.descripcion;
	cancion.ruta = archivoCancion.filename;
	DataBase.collection("canciones").insertOne(cancion, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		//db.close();
	});
	res.redirect('/');
});


app.listen(80, function(){
	console.log("run");
});
