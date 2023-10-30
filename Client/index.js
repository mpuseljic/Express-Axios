const axios = require('axios');
const { response } = require('express');
const port = 3000;
const dataServiceBaseUrl = `http://127.0.0.1:${port}`;

function getFood(){
    axios.get(dataServiceBaseUrl + '/api/food')
        .then(response => { console.log('Success: ', response.data) })
        .catch(error => { debugger; console.error('Error: ', error) });

}

//getFood()

function getFoodById(id){
    axios.get(dataServiceBaseUrl + `/api/food/${id}`)
    .then(response => { console.log('Success: ', response.data) })
    .catch(error => { debugger; console.error('Error: ', error) });


}
// getFoodById(7)

function getFoodByNameAndPrice(name, price){
    axios.get(dataServiceBaseUrl + `/api/food?name=${name}&price=${price}`)
    .then(response => {console.log('Success: ', response.data)} )
    .catch(error => {console.error('Error: ', error)})

}

// getFoodByNameAndPrice('Rižoto s gljivama', 80)

function addFood(ime, kategorija, cijena, sastojci){

    const postData = {
        ime: ime,
        kategorija: kategorija,
        cijena: cijena,
        sastojci: sastojci
    }

    const headers = {
        'Content-Type': 'application/json'
    }

    axios.post(dataServiceBaseUrl + '/api/food', postData, {headers:headers})
    .then(response => {console.log('Success: ', response.data)})
    .catch(error => {console.error('Error: ', error)})
    

}

const ime = "Bolonjez"
const kategorija = "Glavno jelo"
const cijena = 30.00
const sastojci = ["luk", "meso", "tjestenina"]

addFood(ime, kategorija, cijena, sastojci)
getFood()

const ime1 = "Pizza"
const kategorija1 = "Glavno jelo"
const cijena1 = 40.00
const sastojci1 = ["luk", "sir", "šunka"]

addFood(ime1, kategorija1, cijena1, sastojci1)
getFood()


function changeFood(id, ime, kategorija, cijena, sastojci){
    const changeFood = {
        id,
        ime: ime,
        kategorija: kategorija,
        cijena: cijena,
        sastojci: sastojci

    }

    axios.put(dataServiceBaseUrl + `/api/food/${id}`, changeFood)
    .then(response => {console.log('Success: ', response.data)})
    .catch(error => console.error('Error: ', error))

}

const id = 24
const ime2 = "Piletina"
const kategorija2 = "Predjelo"
const cijena2 = 60
const sastojci2 =["piletina", "luk"]

changeFood(id, ime2, kategorija2, cijena2, sastojci2)
getFood()


/*
function changePartOfFoodInfo(id, updateData){
    const updateData = {}
    axios.put(dataServiceBaseUrl + `/api/food/${id}`, updateData)
    .then(response => {console.log('Success: ', response.data)})
    .catch(error => console.error('Error: ', error))


}

const id1 = 21
const updateData = {
    cijena: 70
}

changePartOfFoodInfo(id1, updateData)
getFood()

*/

function changePartOfFoodInfo(id, updateData) {
    // Dohvati trenutne podatke o hrani
    axios.get(`${dataServiceBaseUrl}/api/food/${id}`)
        .then(response => {
            const currentFoodData = response.data;

            if (updateData.ime !== undefined) {
                currentFoodData.ime = updateData.ime;
            }

            if (updateData.kategorija !== undefined) {
                currentFoodData.kategorija = updateData.kategorija;
            }

            // Ažuriraj cijenu ako je navedena u updateData
            if (updateData.cijena !== undefined) {
                currentFoodData.cijena = updateData.cijena;
            }

            // Ažuriraj sastojke ako su navedeni u updateData
            if (updateData.sastojci !== undefined) {
                currentFoodData.sastojci = updateData.sastojci;
            }



            // Pošalji PUT zahtjev za ažurirane podatke
            axios.put(`${dataServiceBaseUrl}/api/food/${id}`, currentFoodData)
                .then(updatedResponse => {
                    console.log('Success: ', updatedResponse.data);
                })
                .catch(error => {
                    console.error('Error: ', error);
                });
        })
        .catch(error => {
            console.error('Error fetching current data: ', error);
        });
}

const id1 = 21;
const updateData = {
    cijena: 70,
    sastojci: ["novi sastojak 1", "novi sastojak 2"]
};

changePartOfFoodInfo(id1, updateData);
getFood()


function deleteFood(id){
    axios.delete(dataServiceBaseUrl + `/api/food/${id}`)
    .then(response => { console.log('Success: ', response.data) })
    .catch(error => { debugger; console.error('Error: ', error) });

}

deleteFood(21)
getFood()
