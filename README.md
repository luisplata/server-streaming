# server-streaming
Servidor hecho en NodeJS donde sube archivos de audio y los sirve para ser escuchados por Streaming.

# Como usarlo!

## subir un archivo

Usar el metodo `POST` en la URL `/cancion` para subir el archivo de audio.

Parametros: 

- nombre : titulo de la cancion
- descripcion : descripcion de la cancion, por ejemplo autor de ser cover
- ruta : archivo que se desa subir

## Streaming

Usa el metodo `GET` en la URL `/cancion/[nombre]` donde _`nombre`_ es el nombre del archivo especifico.

## Lista de canciones

Usar el metodo GET en la URL /cancion que retornará todas las canciones. con los datos:

- Nombre
- Descripcion
- Ruta : nombre del archivo, para solicitarlo en [Streaming](#Streaming)
