'use strict';
//--------------------GLOBAL VARIABLES/IMPORTS

let currentRound = 0;

// unique image/index array
let imageArray = [];

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

//--------------------CONSTRUCTORS

// Product Constructor:
function Product(name) {
  this.name = name;
  this.source = `img/${name}.jpg`;
  this.viewed = 0;
  this.clicked = 0;
}

//--------------------CONSTRUCTOR METHODS

//--------------------FUNCTIONS

// return a random index inside allProducts array
function randomImage() {
  // return a number between 0 - 6 (6 is the index of the last item in allProducts)
  return Math.floor(Math.random() * allProducts.length);
}


// Generate 19 unique indexes
function uniqueImageChecker () {
  // while there are fewer than 3 images
  while (imageArray.length < 19) {
    // generate an index
    let randomIndex = randomImage();
    // if repeated image, don't do anything
    if (imageArray.includes(randomIndex)) {
      // do nothing
    }
    else {
      // if new image, add to the array
      imageArray.push(randomIndex);
    }
  }
  // console.log('uniqueImageChecker', imageArray);
}
// ^^shared by Camilla


//render  3 unique images
function renderImages (){

  uniqueImageChecker();

  let img1 = document.getElementById('img1');
  let img2 = document.getElementById('img2');
  let img3 = document.getElementById('img3');

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

  imageArray.shift();
  imageArray.shift();
  imageArray.shift();
}


// rounds counter
function roundCounter(){
  let roundCounter = document.getElementById('roundCounter');
  roundCounter.innerText = currentRound;
}

//--------------------EVENT LISTENERS

// Event Listener (clicking on an image):
let imagesSection = document.getElementById('productImages');
imagesSection.addEventListener('click', showNewImage);

// Event Listener (click on view results)
// results data
let button = document.getElementById('resultsButton');
button.addEventListener('click', results);
button.addEventListener('click', resultsChart);

//--------------------EVENT HANDLERS

// Event Handler (show 3 new unique images)
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

  roundCounter();
}

// Event Handler (render results)
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

// Event Handler results chart
function resultsChart() {

  if (currentRound === 25){
    const labels = [];
    const views = [];
    const clicks = [];

    for (let i = 0; i < allProducts.length; i++) {
      labels.push(allProducts[i].name);
      views.push(allProducts[i].viewed);
      clicks.push(allProducts[i].clicked);
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Views',
          backgroundColor: 'rgba(255, 255, 0, 0.668)',
          borderColor: 'yellow',
          data: views,
        },
        {
          label: 'Votes',
          backgroundColor: 'rgba(0, 128, 0, 0.668)',
          borderColor: 'green',
          data: clicks,
        },
      ],
    };

    const config = {
      type: 'bar',
      data: data,
      options: {},
    };

    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
  }
}


//--------------------FUNCTION CALLS

renderImages();

roundCounter();











