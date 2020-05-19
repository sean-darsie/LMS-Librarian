// import librarianDao from "../dao/librarianDao";
var librarianDao = require("../dao/librarianDao");

exports.getAllBranches = function(cb){
    librarianDao.getAllBranches(function(error, result){
        if(error) throw error;
        console.log(result);
        cb(error, result);
      });
};

exports.updateBranch = function(branch, cb){
    librarianDao.updateBranch(branch, function(err, res) {
        if (err) throw err;
        cb(err, res);
    });
};

exports.getBranchById = function (id) {
    return new Promise(function (resolve, reject){
        librarianDao.getBranchById(id)
        .then(function (result) {
            resolve(result);
        })
        .catch(function (error){
            reject(error);
        });
    });
}