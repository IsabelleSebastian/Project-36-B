var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed the Dog");
  feed.position(800,195);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  database.ref('FeedTime').on("value" , function(data){
    lastFed = data.val() //1
  })
 
  //write code to display text lastFed time here
  fill("white")
  textSize(25)
  
  if(lastFed >= 12){
    text("Last Fed : " + lastFed + "PM", 550, 80)
  }
  else if(lastFed == 0){
    text("Last Fed : 12 AM", 800, 130)
  }
  else{
    text("Last Fed : " + lastFed + "AM", 550, 80)
  }

drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodS-
  database.ref('/').update({
    Food:foodS
  })

  var stockVal = foodObj.getFoodStock();
  if(stockVal <= 0){
    foodObj.updateFoodStock(stockVal *0); 
  }else{
    foodObj.updateFoodStock(stockVal -1);
  }

}

//function to add food in stock
function addFoods(){
  dog.addImage(sadDog);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
