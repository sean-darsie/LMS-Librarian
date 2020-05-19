// import librarianDao from "../dao/librarianDao";
var librarianDao = require("../dao/librarianDao");

exports.getAllBranches = function(cb){
    librarianDao.getAllBranches(function(error, result){
        if(error) throw error;
        console.log(result);
        cb(error, result);
      });
};

exports.updateBranch = function (branch) {
    return new Promise(function (resolve, reject) {
        librarianDao.getBranchById(branch.branchId)
        .then(function (res) {
            if (res.length == 0) {
                resolve("empty");
            } else {
                librarianDao.updateBranch(branch)
                .then(function (result){
                    resolve("successfully updated branch", result);
                })
                .catch(function (error) {
                    reject(`problem updating branch ${error}`);
                });
            }
        })
        .catch(function (err) {
            reject(err)
        });
    })
}

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

exports.updateBookCopies = function (bookCopies) {
    return new Promise(function (resolve, reject) {
        librarianDao.getBookCopies(bookCopies.bookId, bookCopies.branchId)
        .then(function (result) {
            if (result.length == 0) {
                resolve("empty");
            } else {
                librarianDao.updateBookCopies(bookCopies)
                .then(function (res){
                    resolve("successfully updated record", res);
                })
                .catch(function (error) {
                    reject(`database error ${error}`);
                });
            }
        })
        .catch(function (error) {
            reject(error);
        });
    });
}
