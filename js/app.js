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
  for (var h = 0; h <= closed - open - 1; h++) {
    //Fill Hours Array
    if (h + open < 12) {
      hours.push(h + open + 'am');
    } else if (h + open === 12) {
      hours.push(h + open + 'pm');
    } else {
      hours.push((h + open - 12) + 'pm');
    }
    
    // Populate Customers, cookies, and totals per hour for each location
    for (var p = 0; p < allLoc.length; p++) {
      // Customers
      var min = Math.ceil(allLoc[p].minCust);
      var max = Math.floor(allLoc[p].maxCust);
      console.log(allLoc[p].name, min, max);
      allLoc[p].CustPerHr.push(Math.floor(Math.random() * (max - min + 1)) + min);
      console.log(allLoc[p].CustPerHr);

      // Cookies Sold per hour
      allLoc[p].cookiesPerHr.push(Math.ceil(allLoc[p].avgCookies * allLoc[p].CustPerHr));
      
    }
    // Daily Totals
  }
}
openHours(openHrs, closedHrs);