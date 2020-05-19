//import librarianService from "../service/librarianService";
var routes = require('express').Router();
var librarianService = require('../service/librarianService');
var librarianDao = require('../dao/librarianDao');

//using callbacks
routes.get('/lms/librarian/branches',function(req,res){
    librarianService.getAllBranches(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

// using promises.
routes.put('/lms/librarian/branches', function(req,res){
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
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
  })
  .catch(function (error){
    res.sendStatus(404);
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