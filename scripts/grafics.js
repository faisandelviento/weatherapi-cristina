//funcion para añadir un chart a favoritos
function addfavouriteChart(chart) {
  console.log("Adding new favorite chart...")

  const formData = new URLSearchParams();
  formData.append('addChart', true);
  formData.append('options', chart.options)

  const options = {
      method: 'POST',
      body: formData
  };
  fetch("./favorites.php", options)
      .then((response) => {
          return response.json()
      })
      .then((response) => {
          console.log("desde la funcion addchart "+response)
      })
      .catch((error) => { console.log(error) })
    }


const getOPcionesChart = (temperaturas, horas) => {
    //cambia el color de los puntos, si la temperatura es mas de 22:rojo, menos de 13 azul, entremedio naranja
    const borderColorArray = temperaturas.map(temp => {
      if (temp > 22) {
        return 'rgb(255, 99, 132)';
      } else if (temp < 13) {
        return 'rgb(54, 162, 235)'; 
      } else {
        return 'rgb(252, 186, 3)';
      }
    });

    return ({
      type: 'line',
      data: {
        labels: horas,
        datasets: [{
          label: 'Temperatura',
          data: temperaturas,
          pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 10,
          borderWidth: 2,
          borderColor: borderColorArray,
          tension: 0.2,
            spanGaps: true,
        }]
      },
      options: {
        fill: false,
        interaction: {
          intersect: false
        },
        radius: 0,
        scales: {
          y: {
            min: Math.min(...temperaturas) - 3, 
          }
        }
      }
  })
  }

function CreateChart(hourly){
  //de los datos de la api necesitamos la temperatura y hora del primer dia (las 23 primeras posiciones)
  const temperaturas = hourly.temperature_2m.slice(0,23);
  const fecha = hourly.time.slice(0,23);
  //limpiamos la fecha para que solo sean las horas
  const horas = fecha.map(str => str.slice(11, 16));
  //get el div donde va el chart
  const ctx = document.getElementById('myChart')
  
  //borrar el content que esta dentro de el div myChart para qeu no tenga problemas al cambiar de localizacion
  let chartExistente = Chart.getChart(ctx);
  if (chartExistente) {
    chartExistente.destroy(); 
  }

  //pasamos los datos al chart (esto es la configuracion del grafico)
  const opcionesChart= getOPcionesChart(temperaturas, horas);
  //creamos chart
  new Chart(ctx, opcionesChart)
};

function showGrafico(e){
  //modificamos el css para esconder o enseñar los divs
  const cards = document.querySelector('#contenedorCardsHorarias');
  const chart = document.querySelector('#contenedorGrafico');
  if (e.target.checked) {
    cards.style.display = 'none';
    //borramos las classes ed bootstarp pq sobreescriben el css
    cards.className = '';
    chart.style.display = 'block';
  } else {
    chart.style.display = 'none';
    //añadimos las classes de bootstrap al hacer visible el div
    cards.className = 'card-briefing container-fluid d-flex flex-row gap-2 flex-wrap justify-content-between w-100';
    cards.style.display = 'block';
  }
}

export { CreateChart, showGrafico, addfavouriteChart}