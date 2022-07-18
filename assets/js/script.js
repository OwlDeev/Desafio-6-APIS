//variables
var divLeft = document.getElementById('divLeft');
var buttonTransform = document.getElementById('buttonTransform');

function changeImage() {
  divLeft.style.backgroundColor= "#9018F5";
  divLeft.style.backgroundImage = "url('https://img.freepik.com/foto-gratis/monedas-billetes-dinero-rublos-rusos-esparcidos-monton-vista-superior-mesa-idea-fondo-o-banner-noticias-mercado_166373-2643.jpg?t=st=1658170846~exp=1658171446~hmac=64eb3c312e14af98d40496d2f9a33c360520ef660a2e463853ffe18dcabbaf21&w=1380')";
}

changeImage();

//Converter money
 const converterMoneys = document.querySelector("#moneyChange");
 const apiURL = "https://mindicador.cl/api/";

 async function getMoneys() {
     const res = await fetch(apiURL);
     const moneys = await res.json();
     return moneys;
     }

     async function renderMoneys() {
         const moneys = await getMoneys();
         let template = "";
            template += `
            <option class="selectedItem" value="${moneys.dolar.codigo}">${moneys.dolar.nombre}&emsp;💵</option>
            `;
          template += `
            <option class="selectedItem" value="${moneys.euro.codigo}">€&emsp;${moneys.euro.nombre}&emsp;💶</option>
            `;
            template += `
            <option class="selectedItem" value="${moneys.bitcoin.codigo}">${moneys.bitcoin.nombre}&emsp;💶</option>
            `;
         converterMoneys.innerHTML = template;
         }
         renderMoneys(); 


//Canvas Graphic
async function getAndCreateDataToChart() {
  const res = await fetch("https://api.gael.cloud/general/public/sismos");
  const sismos = await res.json();
  const labels = sismos.map((sismo) => {
    return sismo.Fecha;
  });
  const data = sismos.map((sismo) => {
    const magnitud = sismo.Magnitud.split(" ")[0];
    return Number(magnitud);
  });
  const datasets = [
    {
      label: "Sismo",
      borderColor: "rgb(255, 99, 132)",
      data,
    },
  ];
  return { labels, datasets };
}

async function renderGrafica() {
  const data = await getAndCreateDataToChart();
  const config = {
    type: "line",
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  new Chart(myChart, config);
}
renderGrafica();
