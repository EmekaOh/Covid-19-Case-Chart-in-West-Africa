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
    confirmedCases.push(covid19Data[i].replace(/[^0-9]/g, ""));
  }
  console.log(confirmedCases);
}, 3000);

