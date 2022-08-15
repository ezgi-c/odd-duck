'use strict';

let currentRound = 0;


// Product Constructor:
function Product(name) {
  this.name = name;
  this.source = `img/${name}.jpg`;
  this.viewed = 0;
  this.clicked = 0;
}

// Products Category
let allProducts = [
  new Product('bag'),
  new Product('banana'),
  new Product('bathroom'),
  new Product('boots'),
  new Product('breakfast'),
  new Product('bubblegum'),
  new Product('chair'),
  new Product('cthulhu'),
  new Product('dog-duck'),
  new Product('dragon'),
  new Product('pen'),
  new Product('pet-sweep'),
  new Product('scissors'),
  new Product('shark'),
  new Product('sweep'),
  new Product('tauntaun'),
  new Product('unicorn'),
  new Product('water-can'),
  new Product('wine-glass'),
];


// // Instead of a for loop, I want to use a random number generator
// for (let i = 0; i < allProducts.length; i++) {
// let product = allProducts[i];
// // Step 1. create element
// // - Done in html, line 11
// // Step 2. fill with content
// let img = document.getElementById("productImage");
// console.log(img);
// img.src = `assets/${product.name}.jpg`
// // Step 3. append child
// }

// return a random index inside allProducts array
function randomImage() {
  // return a number between 0 - 6 (6 is the index of the last item in allProducts)
  return Math.floor(Math.random() * allProducts.length);
}


// Generate 3 unique indexes

let imageArray = [];

function uniqueImageChecker () {
  // while there are fewer than 3 images
  while (imageArray.length < 3) {
    let randomIndex = randomImage();
    // generate an image
    if (imageArray.includes(randomIndex)) {
      // do nothing
    }
    else {
      imageArray.push(randomIndex);
    }
    // if new image, add to the array
    // if repeated image, don't do anything
  }
  // console.log('uniqueImageChecker', imageArray);
}

// ^from Camilla



let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');


function renderImages (){

  uniqueImageChecker();

  img1.src = allProducts[imageArray[0]].source;
  img1.alt = allProducts[imageArray[0]].name;
  img1.title = allProducts[imageArray[0]].name;

  img2.src = allProducts[imageArray[1]].source;
  img2.alt = allProducts[imageArray[1]].name;
  img2.title = allProducts[imageArray[1]].name;

  img3.src = allProducts[imageArray[2]].source;
  img3.alt = allProducts[imageArray[2]].name;
  img3.title = allProducts[imageArray[2]].name;

  allProducts[imageArray[0]].viewed++;
  allProducts[imageArray[1]].viewed++;
  allProducts[imageArray[2]].viewed++;

  imageArray.pop();
  imageArray.pop();
  imageArray.pop();
}

renderImages();



// Event Listener:

let imagesSection = document.getElementById('productImages');

imagesSection.addEventListener('click', showNewImage);

function showNewImage(event) {
  let clickedImage = event.target.title;
  for (let i = 0; i < allProducts.length; i++){
    if (clickedImage === allProducts[i].name){
      allProducts[i].clicked++;
    }
  }
  renderImages();
  currentRound++;
  if (currentRound === 25){
    imagesSection.removeEventListener('click', showNewImage);
  }

  // rounds counter
  let roundCounter = document.getElementById('roundCounter');
  roundCounter.innerText = currentRound;
}

// rounds counter

let roundCounter = document.getElementById('roundCounter');
roundCounter.innerText = `${currentRound}`;

// results data

let button = document.getElementById('resultsButton');

button.addEventListener('click', results);

function results (){

  let dataSection = document.getElementById('data');
  let title = document.getElementById('title');
  for (let i=0; i<allProducts.length; i++){

    if (currentRound === 25){
      title.innerText = 'Results';
      
      let dataRow = document.createElement('p');
      dataRow.innerText = `${allProducts[i].name} had ${allProducts[i].clicked} votes, and was seen ${allProducts[i].viewed} times.`;
      dataSection.appendChild(dataRow);
    }
  }
  if (title.innerText === 'Results'){
    button.removeEventListener('click', results);
  }
}



// // HINT: use Array.includes(<target item>) array method to generate 3 uniquely random images




