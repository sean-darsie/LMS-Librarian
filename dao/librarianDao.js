// import db from "./db";
var db = require("./db");

exports.getAllBranches = function(cb){
    db.query('select * from library.tbl_library_branch', function(err, result) {
        cb(err, result);
      });
};

exports.updateBranch = function(branch, cb){
    let info = {branchName: branch.branchName, branchAddress: branch.address}
    db.query('UPDATE library.tbl_library_branch SET ? WHERE branchId = ?', [info, branch.branchId], (err, result) => {
        if (err) {
            db.rollback(function(err, res){
                cb(err, res);
              });
        };
        db.commit(function(err,res) {
            cb(err, result);
        });
    });
};

exports.getBranchById = function(id) {
    return new Promise(function (resolve, reject) {
        db.query('SELECT * FROM library.tbl_library_branch WHERE branchId = ?;',id,function(err,result) {
            return err ? reject(err) : resolve(result);
        });
    });
};