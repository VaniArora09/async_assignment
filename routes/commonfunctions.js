


exports.checkBlank = function (arr, result) {
    if (!Array.isArray(arr)) {
        return 1;
    }

    var arrlength = arr.length;
    for (var i = 0; i < arrlength; i++) {
        if (arr[i] === undefined || arr[i] == null) {
            arr[i] = "";
        } else {
            arr[i] = arr[i];
        }
        arr[i] = arr[i].toString().trim();
        if (arr[i] === '' || arr[i] === "" || arr[i] === undefined) {
            console.log("Check blank failed",arr);
            return 1;
        }
    }
    return 0;
};

exports.checkEmailExits = function (req, res) {

let sql = "SELECT * FROM tb_customers where email=? ";
            connection.query(sql, [req.body.email], function (error, result) {
                if (error) {
                    return cb(error);
                }
                 else {
                     return cb(null,result);
                    }
                })
};

exports.checkEmailExits = function (req, res) {

    let sql = "INSERT INTO tb_customers (`email`,`access_token`,`phone_no`,`is_email_verified`) VALUES(?,?,?,?) ";
    let params = [req.body.email,req.body.access_token,req.body.phone_no,req.body.is_email_verified];
                connection.query(sql, [params], function (error, result) {
                    if (error) {
                        return cb(error);
                    }
                     else {
                         customer_id = result[0].insertId
                         return cb(null,customer_id);
                        }
                    })
    };