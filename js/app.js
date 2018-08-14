'use strict';

// Create hours array
var hoursArray = [];

function openHours() {
  var open = 6, closed = 20;
  for (var h = 0; h <= closed - open; h++) {
    console.log (h, h+open);
    if (h + open < 12) {
      hoursArray[h] = h + open + 'am:';
      console.log(h, hoursArray[h]);
    } else if ((h + open) === 12) {
      hoursArray[h] = h + open + 'pm:';
      console.log(h, hoursArray[h]);
    } else {
      hoursArray[h] = h + open - 12 + 'pm:';
      console.log(h,hoursArray[h]);
    }
  }
}
openHours();

// Create object for each location

// Each object will include
// location name
// minCustomers
// maxCustomers
// avgCookiesPerCustomer
// customersPerHour - random number between min and max customers
// cookiesPerHour [] - multiply customersPerHour * avgCookiesPerCustomer and pair with correct hour
// totalCookies - sum of all cookies sold in a day

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
    }
};
// populate cookiesPerHour property
firstAndPike.cookiesPerHour = cookiesHour();

function cookiesHour() {
  var cookiesArray = [];
  for (var c = 0; c < hoursArray.length; c++) {
    console.log(c, firstAndPike.avgCookiesPerCustomer, firstAndPike.customersPerHour());
    cookiesArray[c] = Math.ceil(firstAndPike.avgCookiesPerCustomer * firstAndPike.customersPerHour());
  }
  return cookiesArray;
}

// dailyCookies: totalLocationCookies()

// method to render individual location

//for loop to perform the render in an array