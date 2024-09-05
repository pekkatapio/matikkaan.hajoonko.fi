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
      content = content + "<div>" + task + "</div>";
    }
    content = content + "</div>"
  }
  content = content + "<div style='clear: both'></div>";
  document.getElementById("tasks").innerHTML = content;
}

/*
  fillVisitors
    Selvittää käyntikertojen määrän kutsumalla API-kutsua 
    ja lisää inforivin visits-tunnisteella olevaan 
    elementtiin.
*/   
function fillVisitors(site) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://neutroni.hayo.fi/~pta/api/count/" + site);
  xhr.responseType = "json";
  xhr.onload = function() {
    document.getElementById('visits').innerText = "Kokeita luotu " + this.response.value + " kertaa.";
  }
  xhr.send();  
}

/*
  Tehtävien luontifunktiot

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
      tasks.push(multiplier + " &times; " + base[index] + " = ______");
    }
  }
  fillContentWithTasks(tasks);
  fillVisitors("matikkaan.hajoonko.fi/kertotaulu");
}