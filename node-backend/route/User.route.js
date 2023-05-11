const express= require('express');
const app = express();

const userRoute = express.Router();
let User = require('../model/User');



//get all book  
userRoute.route("/login").get(async (req,res)=>{
    try {
        const data = await User.find();
        res.json(data);
      } catch (error) {
        next(error);
      }
})
//add 
userRoute.route('/sign-up').post((req, res, next) => {
    User.create(req.body)
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        return next(error);
      });
  });
//get book
userRoute.route('/read-book/:id').get((req, res, next) => {
    Book.findById(req.params.id)
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        return next(error);
      });
  });

//update 
userRoute.route('/update/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, { $set: req.body })
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        return next(error);
      });
  });
//delete
userRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdAndRemove(req.params.id)
      .then(data => {
        res.status(200).json({ msg: data });
      })
      .catch(error => {
        return next(error);
      });
  });
module.exports=bookRoute;