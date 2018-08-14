'use strict';

// Create hours array
var hoursArray = [];

function openHours() {
  var open = 6, closed = 20;
  for (var h = 0; h <= closed - open; h++) {
    console.log (h, h+open);
    if (h + open < 12) {
      hoursArray[h] = h + open + 'am';
      console.log(h, hoursArray[h]);
    } else if ((h + open) === 12) {
      hoursArray[h] = h + open + 'pm';
      console.log(h, hoursArray[h]);
    } else {
      hoursArray[h] = h + open - 12 + 'pm';
      console.log(h,hoursArray[h]);
    }
  }
}
openHours();

// Build out cookies per hour per location
function cookiesHour(location) {
  var cookiesArray = [];
  for (var c = 0; c < hoursArray.length; c++) {
    console.log(c, location.avgCookiesPerCustomer, location.customersPerHour());
    cookiesArray[c] = Math.ceil(location.avgCookiesPerCustomer * location.customersPerHour());
  }
  return cookiesArray;
}

// Create object for each location

// Each object will include
// location name
// minCustomers
// maxCustomers
// avgCookiesPerCustomer
// customersPerHour - random number between min and max customers
// cookiesPerHour [] - multiply customersPerHour * avgCookiesPerCustomer and pair with correct hour
// totalCookies - sum of all cookies sold in a day

// Location #1
var firstAndPike = {
  name: '1st and Pike',
  minCustomers: 23,
  maxCustomers: 65,
  avgCookiesPerCustomer: 6.3,
  customersPerHour:
    function () {
      this.minCustomers = Math.ceil(this.minCustomers);
      this.maxCustomers= Math.floor(this.maxCustomers);
      return (Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers);
    },
  cookiesPerHour: [],
  totalCookies:
    function() {
      var total = this.cookiesPerHour[0];
      for (var t = 0; t < this.cookiesPerHour.length-1; t++){
        console.log(t,total, '+', this.cookiesPerHour[t+1]);
        total = total + this.cookiesPerHour[t+1];
        //console.log(hoursArray[t] + total, '+' + this.cookiesPerHour[t+1]);
      }
      console.log(total);
      return total;
    },
  render: function() {
    var marketUlel = document.getElementById('market');
    for (var x = 0; x < hoursArray.length; x++) {
      var liEl = document.createElement('li');
      liEl.textContent = hoursArray[x] + ': ' + this.cookiesPerHour[x] + ' cookies';
      marketUlel.appendChild(liEl);
    }
    liEl = document.createElement('li');
    liEl.textContent = 'Total Cookies: ' + this.totalCookies();
    marketUlel.appendChild(liEl);
  }
};

//Location #2 - SeaTac Airport
var seaTacAirport = {
  name: 'SeaTac Airport',
  minCustomers: 3,
  maxCustomers: 24,
  avgCookiesPerCustomer: 1.2,
  customersPerHour:
    function() {
      this.minCustomers = Math.ceil(this.minCustomers);
      this.maxCustomers = Math.floor(this.maxCustomers);
      return (Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers);
    },
  cookiesPerHour: [],
  totalCookies:
      function() {
        var total = this.cookiesPerHour[0];
        for (var t = 0; t < this.cookiesPerHour.length-1; t++){
          total = total + this.cookiesPerHour[t+1];
        }
        return total;
      },
  render: function (){
    var seaTacUlel = document.getElementById('seaTac');
    for (var x = 0; x < hoursArray.length; x++){
      var liEl = document.createElement('li');
      liEl.textContent = hoursArray[x] + ': ' + this.cookiesPerHour[x] + ' cookies';
      seaTacUlel.appendChild(liEl);
    }
    liEl = document.createElement('li');
    liEl.textContent= 'Total Cookies: ' + this.totalCookies();
    seaTacUlel.appendChild(liEl);
  }
};

// populate cookiesPerHour for each location
firstAndPike.cookiesPerHour = cookiesHour(firstAndPike);
seaTacAirport.cookiesPerHour = cookiesHour(seaTacAirport);
seattleCenter.cookiesPerHour = cookiesHour(seattleCenter);
capitolHill.cookiesPerHour = cookiesHour(capitolHill);
alki.cookiesPerHour = cookiesHour(alki);

// render each location
firstAndPike.render();
seaTacAirport.render();

// seattleCenter.render();
// capitolHill.render();
// alki.render();


// dailyCookies: totalLocationCookies()

// method to render individual location

//for loop to perform the render in an array