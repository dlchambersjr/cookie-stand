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

// Location #1 - First and Pike (id = market)
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

//Location #2 - SeaTac Airport (id = seaTac)
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
    liEl.textContent = 'Total Cookies: ' + this.totalCookies();
    seaTacUlel.appendChild(liEl);
  }
};

//Location #3 - Seattle Center (id = seaCenter)
var seattleCenter = {
  name: 'Seattle Center',
  minCustomers: 11,
  maxCustomers: 38,
  avgCookiesPerCustomer: 3.7,
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
    var seaCenterUlel = document.getElementById('seaCenter');
    for (var x = 0; x < hoursArray.length; x++){
      var liEl = document.createElement('li');
      liEl.textContent = hoursArray[x] + ': ' + this.cookiesPerHour[x] + ' cookies';
      seaCenterUlel.appendChild(liEl);
    }
    liEl = document.createElement('li');
    liEl.textContent = 'Total Cookies: ' + this.totalCookies();
    seaCenterUlel.appendChild(liEl);
  }
};

//Location #4 - Capitol Hill (id = capHill)
var capitolHill = {
  name: 'Capitol Hill',
  minCustomers: 20,
  maxCustomers: 38,
  avgCookiesPerCustomer: 2.3,
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
    var capHillUlel = document.getElementById('capHill');
    for (var x = 0; x < hoursArray.length; x++){
      var liEl = document.createElement('li');
      liEl.textContent = hoursArray[x] + ': ' + this.cookiesPerHour[x] + ' cookies';
      capHillUlel.appendChild(liEl);
    }
    liEl = document.createElement('li');
    liEl.textContent = 'Total Cookies: ' + this.totalCookies();
    capHillUlel.appendChild(liEl);
  }
};

//Location #5 - Alki (id = alkiBeach)
var alki = {
  name: 'Alki',
  minCustomers: 2,
  maxCustomers: 16,
  avgCookiesPerCustomer: 4.6,
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
    var alkiBeachUlel = document.getElementById('alkiBeach');
    for (var x = 0; x < hoursArray.length; x++){
      var liEl = document.createElement('li');
      liEl.textContent = hoursArray[x] + ': ' + this.cookiesPerHour[x] + ' cookies';
      alkiBeachUlel.appendChild(liEl);
    }
    liEl = document.createElement('li');
    liEl.textContent = 'Total Cookies: ' + this.totalCookies();
    alkiBeachUlel.appendChild(liEl);
  }
};

// populate cookiesPerHour for each location then render
var locationArray = [firstAndPike,seaTacAirport, seattleCenter, capitolHill, alki];

for (var r = 0; r < locationArray.length; r++) {
  locationArray[r].cookiesPerHour = cookiesHour(locationArray[r]);
  locationArray[r].render();
}

// Total daily cookies for all locations (id = allLocations)
var totalAll = locationArray[0].totalCookies();

for (var z = 0; z < this.locationArray.length-1; z++){
  totalAll = totalAll + locationArray[z+1].totalCookies();
}

console.log(totalAll);

var totalUlel = document.getElementById('allLocations');
var totalLiel = document.createElement('li');

console.log(totalUlel, totalLiel)

totalLiel.textContent = 'Total Cookies (all Locations): ' + totalAll;
totalUlel.appendChild(totalLiel);