'use strict';
var hoursArray = [];

// Create hours array
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
  customersPerHour:
    function () {
      console.log(this.minCustomers,this.maxCustomers);
      this.minCustomers = Math.ceil(this.minCustomers);
      this.maxCustomers = Math.floor(this.maxCustomers);
      return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
    },
  avgCookiesPerCustomer: 6.3,
  // cookiesPerHour: [],
  // dailyCookies: totalLocationCookies()
};

// firstAndPike.customersPerHour = randomCustomers(this.minCustomers,this.maxCustomers);




//method to create a random number of customers between min/max customers


//function to populate hoursArray
// use 24hour for easy math to determine am and pm
// var open and close with offsets for populating array - if hour less than 12 use am - else pm

// method to render individual location





//for loop to perform the render in an array