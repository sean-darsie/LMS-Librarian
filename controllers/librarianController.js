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
        console.log(result.length);
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
  if (req.body.branchName.length >= 45 || req.body.branchAddress.length >= 45)
  {
    res.status(400).send("name or address length is too long");
  }
  librarianService.updateBranch(req.body)
  .then(function (result){
    if (result == "empty") {
      res.status(404).send("no record exists");
    } else {
      res.status(202).send("updated branch");
    }
  })
  .catch(function (error) {
    res.sendStatus(404);
    console.log(error);
  })
});

//using a promise
routes.get('/lms/librarian/branches/:id', function(req, res) {
  librarianService.getBranchById(parseInt(req.params.id))
  .then(function(result) {
    if (result.length != 0) {
      res.setHeader('Content-Type', 'application/json');
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
  librarianService.updateBookCopies(req.body)
  .then(function (result) {
    if (result == "empty") {
      res.status(404).send("no record exists");
    } else {
      res.status(202).send("updated copies");
    }
  })
  .catch(function (error) {
    res.sendStatus(404);
    console.log(error);
  });
});


module.exports = routes;