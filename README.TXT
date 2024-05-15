explicacion de las funcionalidades:
    En la parte de temperaturas del dia por hora se ha hecho funcional el boton para hacer graficos
    Al clicar el boton sale un grafico con las temperaturas de cada hora de las 00 a las 22
    Segun la temperatura el grafico cambia de color 
    - +22 rojo 
    - -13 azul 
    - entre 22 y 13 naranja
    Para esta funcionalidad se ha modificando:
        - index-php (añadimos el div id=contenedorGrafico que contiene el grafico)
        - script (
            onload: se hace un selector del boton de switch y se añade un evento de click para esconder y enseñar el grafico
            con la fucnion showGrafico
            refreshDashboard: añadimos una funcion de crearChart para pasarle los datos de las temperaturas
        )
        -scripts/grafics.js (
            cada funcion de este archivo esta muy comentada
        )
    Añadir grafico a favoritos:
    -se ha añadido un boton 'save chart' que guarda los datos del grafico
    Para esto se ha guardado un string de las temperaturas, lo que se podria utilizar posteriormente para 
    volver a general el grafico.
    Para esta funcionalidad se ha modificado:
        - base de datos(añadido tabla 'favoriteChart')
        - script (listener en boton 'save chart')
        - scripts/grafics.js (funcion addfavouriteChart prepara los datos para hacer un fetch en el controlador /favorites.php)
        - favorites.php (añadimos opcion addChart que ejecuta funcion addCHart() para hacer los inserts en la BD)
