var express = require("express");
var router = express.Router();
var User = require("../models").User;
var Course = require("../models").Course;

// Async handler wrapper
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };
}

// Returns the currently authenticated user
router.get('/users',asyncHandler(async(req,res,next) =>{

  try{
    let user = await User.findByPk(req.params.id);
  }catch(error){
    throw error
  }

  if(!user){

  }

  res.status(200).end();
}));


// Creates a user, sets the Location header to "/", and returns no content
router.post(asyncHandler(async(req,res) =>{

  res.status(201);
}));



// Returns a list of courses (including the user that owns each course)
router.get('/courses',asyncHandler(async(req,res)=>{

  res.status(200);
}));

// Returns a the course (including the user that owns the course) for the provided course ID
router.get('/courses/:id',asyncHandler(async(req,res)=>{

  res.status(200);
}));

// Updates a course and returns no content
router.post('courses/:id',asyncHandler(async(req,res)=>{

  res.status(200);
}));

// Deletes a course and returns no content
router.delete('courses/:id',asyncHandler(async(req,res)=>{

  res.status(204);
}));


module.exports = router;
