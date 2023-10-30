import { methods } from './handlers/foodHandlers.js';
import express from "express";
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/api', router);

router.route('/food/:id')
    .get((req, res) => {
        const id = req.params?.id
        const food = methods.getFood(id)
        res.json(food)
    })

router.route('/food')
    .get((req, res) => {
    const name = req.query?.name;
    const price = req.query?.price;
    const food = methods.getFoods(name, price);
    res.json(food);
    });


router.route('/food')
    .post((req, res, next) => {
        const foodData = req.body
        const food = methods.addFoods(foodData)
        res.status(200).json(food)
    })

router.route('/food/:id')
    .put((req, res) => {
        const foodId = req.params?.id
        const foodData = req.body
        const food = methods.updateFood(foodId, foodData)
        res.status(200).json(food)
    })

router.route('/food/:id')
    .put((req, res) => {
        const foodId = req.params?.id
        const foodData = req.body
        const food = methods.updatePartOfFood(foodId, foodData)
        res.status(200).json(food)
    })

router.route('/food/:id')
    .delete((req, res) => {
        const id = req.params?.id
        methods.deleteFood(id)
        res.status(200)
    })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })