import { food } from "../models/foodModels.js";

function getFood(id) {
  if (!id) {
    return food;
  }
  return food.find((meal) => meal.id == id);
}

function getFoods(name, price) {
  if (!name && !price) {
    return food;
  }

  return food.find((meal) => meal.ime == name && meal.cijena == price);
}

let currentId = food.length + 1;

function addFoods(newFood) {
  const id = currentId++;
  newFood.id = id;
  return food.push(newFood);
}

function updateFood(id, foodToUpdate) {
  let oldFoodData = food.findIndex((meal) => meal.id == id);
  food.splice(oldFoodData, 1, foodToUpdate);
  return foodToUpdate;
}

function updatePartOfFood(id, newFoodData) {
  let oldFood = food.find((meal) => meal.id == id);
  let foodDetailsToChange = Object.keys(newFoodData);

  for (let foodDetail of foodDetailsToChange) {
    if (oldFood[foodDetail]) {
      oldFood[foodDetail] = newFoodData[foodDetail];
    }
  }

  let oldFoodIdx = food.findIndex((meal) => meal.id == id);
  food.splice(oldFoodIdx, 1, oldFood);
  return oldFood;
}

function deleteFood(id) {
  let oldFoodIdx = food.findIndex((meal) => meal.id == id);
  food.splice(oldFoodIdx, 1);
  return;
}

export const methods = {
  getFood,
  getFoods,
  addFoods,
  updateFood,
  updatePartOfFood,
  deleteFood,
};
