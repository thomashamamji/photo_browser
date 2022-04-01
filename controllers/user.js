const jwt = require('jsonwebtoken');
const { runSQLQuery, handleError } = require('../config/db');
const bcrypt = require("bcrypt");

exports.register_new_user = (req, res, next) => {
    const {
        firstname,
        lastname,
        email,
        password
    } = req.body;

    if (firstname && lastname && email &&  password) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return handleError(err, res);
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) return handleError(err, res);
                runSQLQuery(`select uuid() as uuid;`).then(userId => {
                    runSQLQuery(`insert into Users(Id_user, firstname, lastname, email, password, createdAt, updatedAt) values("${userId[0].uuid}", "${firstname}", "${lastname}", "${email}", "${hash}", CURDATE(), CURDATE());`).then(r => {
                        if (!r.affectedRows) res.status(400).json({ success: false, msg : "An error occured while inserting user table data." });
                        
                        runSQLQuery(`insert into Album(Id_album, name, createdAt, updatedAt, Id_user) values(uuid(), "Recents", CURDATE(), CURDATE(), "${userId[0].uuid}");`)
                        .then(ar => {
                            if (!ar.affectedRows) {
                                return res.status(400).json({ success : false, msg : "An error occured while creating the first table." });
                            }

                            res.json({
                                success: true,
                                data : r,
                                msg : "User created !"
                            });
                        })
                        .catch(err => handleError(err, res));
                    })
                    .catch(err => handleError(err, res));
                });
            });
        });
    }

    else return res.status(400).json({ success : false, msg : 'Missing some fields.' });
}

exports.login = (req, res, next) => {
    let errors = {};
    let msg = "";
    const query = `SELECT * FROM Users WHERE email="${req.body.email}";`;
    runSQLQuery(query).then(r => {
        if (r.length) {
            console.log(r[0]);
            bcrypt.compare(req.body.password, r[0].password).then(correct => {
				if (correct) {
					// User Matched
			        const payload = { id: r[0].Id_user, email: r[0].email }; // Create JWT Payload
                    console.log(payload);

			        // Sign Token
			        jwt.sign(
			          payload,
			          process.env.APP_SECRET,
			          { expiresIn: 102000 },
			          (err, token) => {
			            res.json({
			              success: true,
			              token: 'Bearer ' + token
			            });
			          }
			        );
				} else {
					errors.password = "Incorrect password.";
                    return res.status(401).json({ msg, data : req.body, errors });
				}
			});
        }

        else {
            msg = "No user found with this email or username";
            return res.status(401).json({ msg, data : req.body, errors });
        }
    })
    .catch(err => handleError(err, res));
}

exports.check_token = (req, res, next) => {
    if (req.user) return res.json({ success : true });
    else return res.status(401).json({ success : false, msg : "You need to refresh your token." });
}