'use strict';

// Global use variables
var allLoc = [], hours = [];

var openHrs = 6, closedHrs = 20;


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

// Fill hours array based on open and close times using 24hour clock to help determine am/pm

function openHours(open,closed) {
  for (var h = open; h <= closed - 1; h++) {
    
    //Fill Hours Array
    if (h < 12) {
      hours.push(h + 'am');
    } else if (h === 12) {
      hours.push(h + 'pm');
    } else {
      hours.push((h - 12) + 'pm');
    }
    // Random number of Customers

    // Cookies Sold

    // Daily Totals
  }
}
openHours(openHrs, closedHrs);
console.log(hours);