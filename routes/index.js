var express = require('express');
var router = express.Router();

// Async handler wrapper
function asyncHandler(cb){
  return async(req,res,next) => {
    try{
      await cb(req,res,next)
    } catch(error){
      console.log(error);
      res.status(500).send(error);
    }
  }
}

module.exports = router;
