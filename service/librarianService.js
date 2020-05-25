const librarianDao = require("../dao/librarianDao");
const db = require("./db");


exports.getAllBranches = function(cb){
    librarianDao.getAllBranches(db,function(error, result){
        if(error) throw error;
        cb(error, result);
      });
};

exports.updateBranch = function (branch) {
    return new Promise(function (resolve, reject) {
        let responseAttributes = {};

        librarianDao.getBranchById(db,branch.branchId)
        .then(function (res) {
            if (res.length == 0) {
                responseAttributes.status = 404;
                responseAttributes.message = "branch not found";
                resolve(responseAttributes);
            } else {
                db.beginTransaction((transactionError) => {
                    if (transactionError) {
                      results.transactionError = true;
                      reject(results);
                      return;
                    }
                    librarianDao.updateBranch(db,branch)
                    .then(function (result){
                        responseAttributes.status = 202;
                        responseAttributes.message = "branch updated";
                        db.commit(() => resolve(responseAttributes));
                    })
                    .catch(function (error) {
                        db.rollback(() => reject(error));
                    });
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
        librarianDao.getBranchById(db, id)
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
        let responseAttributes = {};
        librarianDao.getBookCopies(db,bookCopies.bookId, bookCopies.branchId)
        .then(function (result) {
            if (result.length == 0) {
                librarianDao.createBookCopies(db, bookCopies)
                .then(function (res){
                    responseAttributes.status = 201;
                    responseAttributes.message = "book copies record created";
                    resolve(responseAttributes);
                })
                .catch(function (error) {
                    reject(`database error ${error}`);
                });
            } else {
                db.beginTransaction((transactionError) => {
                    if (transactionError) {
                      results.transactionError = true;
                      reject(results);
                      return;
                    }
                    librarianDao.updateBookCopies(db,bookCopies)
                    .then(function (res){
                        responseAttributes.status = 202;
                        responseAttributes.message = "book copies updated";
                        db.commit(() => resolve(responseAttributes));
                    })
                    .catch(function (error) {
                        db.rollback(()=> reject(error));
                    });
                });
            }
        })
        .catch(function (error) {
            reject(error);
        });
    });
}
