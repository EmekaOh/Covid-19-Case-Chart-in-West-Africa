let westAfricaCountries = [
  "Benin",
  "Burkina Faso",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Liberia",
  "Mali",
  "Mauritania",
  "Niger",
  "Nigeria",
  "Senegal",
  "Sierra Leone",
  "Togo",
];
let covid19Data = [];
let links = [];
let confirmedCasesString = [];
let confirmedCases = [];

let options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "covid-19-coronavirus-statistics.p.rapidapi.com",
    "X-RapidAPI-Key": "451817c53amsh49e3b05aaf33e53p13a8aejsnc418de880f11",
  },
};

for (let i = 0; i < westAfricaCountries.length; i++) {
  links.push(
    fetch(
      "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=" +
        westAfricaCountries[i],
      options
    ).then((response) => response.json())
  );
}

let allData = Promise.all([links]);

for (let i = 0; i < westAfricaCountries.length; i++) {
  allData
    .then((response) =>
      response[0][i].then((result) =>
        covid19Data.push(
          result.data.covid19Stats[0].country +
            " " +
            result.data.covid19Stats[0].confirmed
        )
      )
    )
    .catch((err) => console.log(err));
}

setTimeout(function () {
  for (let i = 0; i < covid19Data.length; i++) {
    confirmedCasesString.push(covid19Data[i].replace(/[^0-9]/g, ""));
  }
  //   console.log(confirmedCasesString);
  confirmedCases = confirmedCasesString.map(Number);
  Covid19Chart();
  //   console.log(confirmedCases);
}, 3000);

function Covid19Chart() {
  // Chart.defaults.global.defaultFontFamily: 'lato';
  const labels = westAfricaCountries;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "West Africa Countries, Covid-19 Confirmed Cases",
        backgroundColor: [
          "rgb(255,255,0)",
          "rgb(255,69,0)",
          "rgb(189,183,107)",
          "rgb(0,0,205)",
          "rgb(138,43,226)",
          "rgb(0,255,255)",
          "rgb(255,99,71)",
          "rgb(255,250,205)",
          "rgb(230,230,250)",
          "rgb(139,69,19)",
          "rgb(124,252,0)",
          "rgb(139,0,139)",
          "rgb(216,191,216)",
          "rgb(0,0,128)",
        ],
        borderColor: "rgb(255, 255, 255)",
        borderWidth: 2,
        hoverBorderColor: "rgb(0, 0, 0)",
        data: confirmedCases,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 32,
              family: 'lato'
            },
          },
        },
      },
      layout: {
        padding: 40,
      },
      responsive: true,
    },
  };

  const myChart = new Chart(document.getElementById("myChart"), config);
}
