// import db from "./db";
var db = require("./db");

exports.getAllBranches = function(cb){
    let sql = 'select * from library.tbl_library_branch';
    db.query(sql, function(err, result) {
        cb(err, result);
      });
};

exports.updateBranch = function(branch){

    return new Promise(function (resolve, reject) {
        let sql = 'UPDATE library.tbl_library_branch SET branchName = ?, branchAddress = ? WHERE branchId = ?';
        db.query(sql,[branch.branchName, branch.branchAddress, branch.branchId] , function(err, res) {
            return err ? reject(err) : resolve(res);
        });
    });
}

exports.getBranchById = function(id) {
    return new Promise(function (resolve, reject) {
        let sql = 'SELECT * FROM library.tbl_library_branch WHERE branchId = ?;';
        db.query(sql,id,function(err,result) {
            return err ? reject(err) : resolve(result);
        });
    });
};

exports.getBookCopies = function(bookId, branchId) {
    return new Promise(function (resolve, reject) {
        let sql = 'SELECT * FROM library.tbl_book_copies WHERE bookId = ? AND branchId = ?;';
        db.query(sql,[bookId,branchId],function(err,result) {
            return err ? reject(err) : resolve(result);
        });
    });
};

exports.updateBookCopies = function(bookCopies) {
    return new Promise(function (resolve, reject) {
        let info = {branchId: bookCopies.branchId, bookId: bookCopies.bookId, noOfCopies: bookCopies.noOfCopies};
        let sql = 'UPDATE library.tbl_book_copies SET ? WHERE branchId = ? AND bookId = ?';
        db.query(sql,[info, bookCopies.branchId, bookCopies.bookId] , function(err, res) {
            return err ? reject(err) : resolve(res);
        });
    });
};