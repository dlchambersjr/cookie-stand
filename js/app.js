'use strict';

// Global use variables
var allLoc = [], hours = [];


// Constructor fucntion called "Build" to create individual locations
function Build(name, minCust, maxCust, avgCookies) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.CustPerHr = [];
  this.cookiesPerHr = [];
  this.totCookies = 0;
  allLoc.push(this);
}

// Construct each location with known details
var FirstAndPike = new Build('First and Pike', 23, 65, 6.3);
var seaTacAirport = new Build('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Build('Seattel Center', 11, 38, 3.7);
var capitolHill = new Build('Capitol Hill', 20, 38, 2.3);
var alki = new Build ('Alki', 2, 16, 4.6);

console.log(FirstAndPike);
console.log(seaTacAirport);
console.log(seattleCenter);
console.log(capitolHill);
console.log(alki);
console.log(allLoc)

// Fill hours[] based on open and close times

function (openHours() {
  var open = 6, closed = 20;
  for (var h = 0; h <= (closed - open) -1 ; h++) {
    
    if (h + open < 12) {
      hours[h] = h + open + 'am';
    } else if ((h + open) === 12) {
      hours[h] = h + open + 'pm';
    } else {
      hours[h] = h + open - 12 + 'pm';
    }
  }
}());


console.log(hours)

