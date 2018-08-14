'use strict';

var gregor = {
  firstName: 'Gregor',
  lastName: 'Sancez',
  favoriteFood: 'Natural Balance Platefuls',
  introduce: function() {
    return 'Hi, my names is ' + this.firstName + ' ' + this.lastName + '. I am  a cat, and I like to eat ';
  }
};

console.log(gregor.introduce());

function Cat(firstName, lastName, favoriteFood, isCute) {
  //  we store informaton we want to track
  this.firstName = firstName;
  this.lastName = lastName;
  this.favoriteFood = favoriteFood;
  this.isCute = isCute;

  this.introduction = function() {
    return 'Hi, my names is ' + this.firstName + ' ' + this.lastName + '. I am  a cat, and I like to eat ' + this.favoriteFood;
  };

  
}

Cat.prototype.likesToEat = function() {
  // THIS and prototype BELONG TOGETHER
  return 'I like to eat ' + this.favoriteFood;
};


var buddy = new Cat ('Buddy', 'Hamm', 'Mice', true);
var gary = new Cat ('Gary', 'Grampa', 'Homemade dog food', true);



console.log(buddy.introduction());
console.log(gary.introduction());
console.log(gary.likesToEat());


console.log(gary instanceof Cat);
console.log(gregor instanceof Cat);
console.log(buddy instanceof Cat);

