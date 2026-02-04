/* 
  Apufunktiot 
 
  shuffleArray
    Randomize array in-place using Durstenfeld shuffle algorithm 
*/
function shuffleArray(array) {
  for (var i = array.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

/* 
  Dokumentin muokkausfunktiot

  fillContentWithTasks
    Lisää tasks-taulukossa olevat tehtävät dokumentin 
    tasks-tunnisteella olevaan elementtiin.
*/    
function fillContentWithTasks(tasks, groups=4, rows=25) {
  let content = "";
  for (let group = 1; group <= groups; group++) {
    content = content + "<div class='taskgroup'>"
    for (let row = 1; row <= rows; row++) {
      let task = tasks.shift();
      if (task) {
        content = content + "<div>" + task + "</div>";
      }
    }
    content = content + "</div>"
  }
  content = content + "<div style='clear: both'></div>";
  document.getElementById("tasks").innerHTML = content;
}

/* 
  fillDigits
    Lisää digits-tunnisteella olevaan div-elementtiin
    vierailuja vastaavat numerokuvat. Täyttää luvun alkuun 
    ja loppuun tarpeellisen määrän täytenumeroita.
*/   
function fillDigits(visits) {
  let numbers = [0,1,2,3,4,5,6,7,8,9];
  shuffleArray(numbers);
  const visitDigits = new String(visits).split("");
  const centerDigits = visitDigits.length;  
  const startDigits = Math.ceil((10-centerDigits)/2);    
  const endDigits = 10 - startDigits - centerDigits;
  let content = "";
  for (let i = 0; i < startDigits; i++) {
    content = content + "<img src='../images/" + numbers.shift() + "v.png' alt=''>";
  }
  for (let i = 0; i < centerDigits; i++) {
    content = content + "<img src='../images/" + visitDigits[i] + ".png' alt=''>";
  }
  for (let i = 0; i < endDigits; i++) {
    content = content + "<img src='../images/" + numbers.shift() + "v.png' alt=''>";
  }
  document.getElementById("digits").innerHTML = content;
}

/*
  fillVisitors
    Selvittää käyntikertojen määrän kutsumalla API-kutsua 
    ja lisää inforivin visits-tunnisteella olevaan 
    elementtiin.
*/   
function fillVisitors(site, digits = false) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://neutroni.hayo.fi/~pta/api/count/" + site);
  xhr.responseType = "json";  
  xhr.onload = function() {
    document.getElementById('visits').innerText = "Kokeita luotu " + this.response.value + " kertaa.";
    if (digits) { 
      fillDigits(this.response.value); 
    }
  }
  xhr.send();  
}

/*
  Tehtävien luontifunktiot

  generateDifficultMultiplicationTable
    Muodostaa vaikeat kertotaulut (100 tehtävää)
    ja täytää sivun niillä.
*/
function generateDifficultMultiplicationTable() {
  let multiplications = [
    [3,7], [3,8], [4,7], [4,8],
    [6,6], [7,6], [8,6], [9,6],
    [6,7], [7,7], [8,7], [9,7],
    [6,8], [7,8], [8,8], [9,8],
    [6,9], [7,9], [8,9], [9,9]
  ];
  let tasks = [];
  multiplications.forEach((multiplication) => {
    tasks.push(multiplication[0] + " &times; " + multiplication[1] + " = ______");
  });
  tasks = new Array(Math.ceil(100/tasks.length)).fill(tasks).flat();
  shuffleArray(tasks);
  fillContentWithTasks(tasks);
  let visits = fillVisitors("matikkaan.hajoonko.fi/kertotaulu");
}

/*
  generateMiniMultiplicationTable
    Muodostaa lukujen 2,3,4,5 ja 10 kertotaulun 
    (50 tehtävää) ja täytää sivun niillä.
*/
function generateMiniMultiplicationTable() {
  let multipliers = [2,3,4,5,10];
  let tasks = [];
  for (let index = 0; index < multipliers.length; index++ ) {
    for (let multiplicand = 1; multiplicand <= 10; multiplicand++ ) {
      tasks.push(multiplicand + " &times; " + multipliers[index] + " = ______");
    }    
  }
  shuffleArray(tasks);
  fillContentWithTasks(tasks, 3, 17);
  let visits = fillVisitors("matikkaan.hajoonko.fi/minikertotaulu",true);  
}

/*
  generateMultiplicationTable
    Muodostaa lukujen 1-10 kertotaulun (100 tehtävää) ja 
    täytää sivun niillä.
*/
function generateMultiplicationTable() {
  let tasks = [];
  for (let first = 1; first <= 10; first++ ) {
    for (let second = 1; second <= 10; second++ ) {
      tasks.push(first + " &times; " + second + " = ______");
    }    
  }
  shuffleArray(tasks);
  fillContentWithTasks(tasks);
  fillVisitors("matikkaan.hajoonko.fi/kertotaulu");
}

/*
  generateMultiplicationTable
    Muodostaa annetun luvun kertotaulun (28 x 4 = 112 tehtävää)
    ja lisää sivulle niistä satunnaisesti 100 tehtävää.
*/
function generateSingleMultiplicationTable(multiplier) {
  let multiplicands = [1,2,2,3,3,4,4,4,4,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10];
  let tasks = [];
  for (let round = 1; round <= 4; round++) {
    let base = multiplicands.slice();
    shuffleArray(base);
    for (let index = 0; index < base.length; index++) {
      tasks.push(base[index] + " &times; " + multiplier + " = ______");
    }
  }
  fillContentWithTasks(tasks);
  fillVisitors("matikkaan.hajoonko.fi/kertotaulu");
}