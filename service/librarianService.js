// import librarianDao from "../dao/librarianDao";
var librarianDao = require("../dao/librarianDao");

const maxLength = 45;
const minLength = 1;

exports.getAllBranches = function(cb){
    librarianDao.getAllBranches(function(error, result){
        if(error) throw error;
        console.log(result);
        cb(error, result);
      });
};

exports.updateBranch = function (branch) {
    return new Promise(function (resolve, reject) {
        let responseAttributes = {};
        if(branch.branchName == undefined || branch.branchId == undefined || branch.branchAddress == undefined) {
            console.log("no branch");
            responseAttributes.status = 400;
            responseAttributes.message = "user must provide a value for all fields of the branch";
            resolve(responseAttributes);
        }

        if (branch.branchName.length >= maxLength    || 
            branch.branchName.length < minLength     ||
            branch.branchAddress.length >= maxLength ||
            branch.branchAddress.length < minLength) {
            responseAttributes.status = 400;
            responseAttributes.message = `text fields must be between ${minLength} and ${maxLength} in characters `;
            resolve(responseAttributes);
        }
        librarianDao.getBranchById(branch.branchId)
        .then(function (res) {
            if (res.length == 0) {
                responseAttributes.status = 404;
                responseAttributes.message = "branch not found";
                resolve(responseAttributes);
            } else {
                librarianDao.updateBranch(branch)
                .then(function (result){
                    responseAttributes.status = 202;
                    responseAttributes.message = "branch updated";
                    resolve(responseAttributes);
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
        let responseAttributes = {};
        librarianDao.getBookCopies(bookCopies.bookId, bookCopies.branchId)
        .then(function (result) {
            if (result.length == 0) {
                responseAttributes.status = 404;
                responseAttributes.message = `could not find record of bookcopies with bookId ${bookCopies.bookId} at branch ${bookCopies.branchId}`;
                resolve(responseAttributes);
            } else {
                librarianDao.updateBookCopies(bookCopies)
                .then(function (res){
                    responseAttributes.status = 202;
                    responseAttributes.message = "book copies updated";
                    resolve(responseAttributes);
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
