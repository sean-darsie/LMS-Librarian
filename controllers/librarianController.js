var routes = require('express').Router();
var librarianService = require('../service/librarianService');

//using callbacks
routes.get('/lms/librarian/branches',function(req,res){
    librarianService.getAllBranches(function(error, result){
      if(error) {
        res.status(500);
        res.send("an error occoured");
      }
      if (result.length != 0){
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(result); 
      } else {
        res.status(404);
        res.send("no records available ");
      }
    });
});

// using promises.
routes.put('/lms/librarian/branches', function(req,res){
  if (!req.body.branchId || !req.body.branchName || !req.body.branchAddress) {
    res.sendStatus(400);
  }
  if (req.body.branchName.length > 45 || req.body.branchName.length < 3) {
    res.status(400).send("text must be between 3 and 45 characters");
  } 
  if (req.body.branchAddress.length > 45 || req.body.branchAddress.length < 3) {
    res.status(400).send("text must be between 3 and 45 characters");
  } 

  librarianService.updateBranch(req.body)
  .then(function (result){
      res.status(result.status);
      res.send(result.message);
  })
  .catch(function (error) {
    res.sendStatus(500);
    console.log(error);
  })
});

//using a promise
routes.get('/lms/librarian/branches/:id', function(req, res) {
  librarianService.getBranchById(parseInt(req.params.id))
  .then(function(result) {
    if (result.length != 0) {
      res.status(200);
      res.format
      res.send(result);
    } else {
      res.status(404);
      res.send(`cannot find branch with id: ${req.params.id}`);
    }
  })
  .catch(function (error){
    res.sendStatus(500);
    console.log(error);
  });
});

routes.put('/lms/librarian/branches/:id/copies', function(req, res) {
  if (!req.body.branchId || !req.body.bookId || !req.body.noOfCopies) {
    res.sendStatus(400);
  }
  librarianService.updateBookCopies(req.body)
  .then(function (result) {
    res.status(result.status);
    res.send(result.message);
  })
  .catch(function (error) {
    res.sendStatus(500);
    console.log(error);
  });
});


module.exports = routes;