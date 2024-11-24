/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function fillContent(tasks) {
  let content = "";
  for (let group = 1; group <= 4; group++) {
    content = content + "<div class='taskgroup'>"
    for (let row = 1; row <= 25; row++) {
      let task = tasks.shift();
      content = content + "<div>" + task + "</div>";
    }
    content = content + "</div>"
  }
  content = content + "<div style='clear: both'></div>";
  document.getElementById("tasks").innerHTML = content;
}

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
  fillContent(tasks);
  fillVisitors();
}

function fillVisitors() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://neutroni.hayo.fi/~pta/api/count/matikkaan.hajoonko.fi/kertotaulu");
  xhr.responseType = "json";
  xhr.onload = function() {
    document.getElementById('visits').innerText = "Kertotaulukokeita luotu " + this.response.value + " kertaa.";
  }
  xhr.send();  
}

function generateMultiplicationTable() {
  let tasks = [];
  for (let first = 1; first <= 10; first++ ) {
    for (let second = 1; second <= 10; second++ ) {
      tasks.push(first + " &times; " + second + " = ______");
    }    
  }
  shuffleArray(tasks);
  fillContent(tasks);
  fillVisitors();
}