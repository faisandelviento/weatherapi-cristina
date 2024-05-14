
  const getOPcionesChart = (temperaturas, horas) => {
    //cambia el color de los puntos, si la temperatura es mas de 22:rojo, menos de 13 azul, entremedio naranja
    const borderColorArray = temperaturas.map(temp => {
      if (temp > 22) {
        return 'rgb(255, 99, 132)';
      } else if (temp < 13) {
        return 'rgb(54, 162, 235)'; // Cambiar a azul si es menor que 14
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
  //de los datos necesitamos la temperatura y hora del primer dia (las 23 primeras posiciones)
  const temperaturas = hourly.temperature_2m.slice(0,23);
  const fecha = hourly.time.slice(0,23);
  //limpiamos la fecha para que solo sean las horas
  const horas = fecha.map(str => str.slice(11, 16));
  //get el div donde va el chart
  const ctx = document.getElementById('myChart')
  
  //borrar el content that is inside myChart 
  let chartExistente = Chart.getChart(ctx);
  if (chartExistente) {
    chartExistente.destroy(); 
  }

  //pasamos los datos al chart
  const opcionesChart= getOPcionesChart(temperaturas, horas);
  //creamos chart
  new Chart(ctx, opcionesChart)
};

function showGrafico(e){
  const cards = document.querySelector('#contenedorCardsHorarias');
  const chart = document.querySelector('#contenedorGrafico');
  if (e.target.checked) {
    cards.style.display = 'none';
    cards.className = '';
    chart.style.display = 'block';
  } else {
    chart.style.display = 'none';
    cards.className = 'card-briefing container-fluid d-flex flex-row gap-2 flex-wrap justify-content-between w-100';
    cards.style.display = 'block';
  }
}

export { CreateChart, showGrafico}