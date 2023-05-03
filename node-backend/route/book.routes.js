const express= require('express');
const app = express();

const bookRoute = express.Router();
let Book = require('../model/Book');



//get all book  
bookRoute.route("/").get(async (req,res)=>{
    try {
        const data = await Book.find();
        res.json(data);
      } catch (error) {
        next(error);
      }
})
//add 
bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body)
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        return next(error);
      });
  });
//get book
bookRoute.route('/read-book/:id').get((req, res, next) => {
    Book.findById(req.params.id)
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        return next(error);
      });
  });

//update 
bookRoute.route('/update/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, { $set: req.body })
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        return next(error);
      });
  });
//delete
bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdAndRemove(req.params.id)
      .then(data => {
        res.status(200).json({ msg: data });
      })
      .catch(error => {
        return next(error);
      });
  });
module.exports=bookRoute;