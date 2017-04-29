'use strict'

const User = require('mongoose').model('User');

var updateUser = function (req, res){
	var age = req.body.edad;
    var email = req.body.email;
    var dni = req.body.dni;
    var sex = req.body.sexo;
    var first = req.body.nombre;
    var last = req.body.apellido;
    var address = req.body.direccion;
    var city = req.body.ciudad;
    var phone = req.body.telefono;

    var id = (req.session.user||{})._id;

    User.findById(id).exec(function (err, user) {
        if (!err) {
            if (user) {
                user.age = age;
                user.dni = dni;
                user.sex = sex;
                user.address = address;
                user.city = city;
                user.phone_number = phone;
                user.save(function (err) {
                    if (!err) {
                        res.json({
                            status: "ok",
                            user: user,
                            message: "ACTUALIZADO"
                        });
                    } else {
                        return res.json({ message: err.message, status: "fail", user: null });
                    }
                })
            } else {
                return res.json({ message: "USUARIO_NO_ENCONTRADO", status: "fail", user: null });
            }
        } else {
            return res.json({ message: err.message, status: "fail", user: null });
        }
    });
}

var createUser = function (req, res) {

    // var age = req.body.edad;
    var email = req.body.email;
    var password = req.body.password;
    // var dni = req.body.dni;
    // var sex = req.body.sexo;
    var first = req.body.nombre;
    var last = req.body.apellido;
    // var address = req.body.direccion;
    // var city = req.body.ciudad;
    // var phone = req.body.telefono;

    console.log("Creating user nodejs");

    User.exists(email, function (err, user) {
        if (err) {
            return res.json({ message: err.message, status: "fail", user: null });
        }
        if (!user) {
            let user = new User({
                // age: age,
                local: {
                    email: email,
                    password: password,
                },                
                // dni: dni,
                // sex: sex,
                // phone: phone,
                // address: address,
                // city: city,
                name: {
                    first: first,
                    last: last
                }
            });
            user.save(function (err, newUser) {
                console.log("saving user");
                if (err) {
                    console.log(err);
                    return res.json({ message: "ERROR_GUARDANDO", status: "fail", user: null });
                }
                res.json({ status: "ok", user: newUser, message: "USUARIO REGISTRADO" });
                // req.session.regenerate(function () {
                //     req.session.user = newUser;
                //     // next();
                //     res.json({
                //         status: "ok",
                //         user: newUser,
                //         message: "REGISTRADO"
                //     });
                // });
            });
        } else {
            return res.json({ message: "EMAIL_YA_EXISTE", status: "fail", user: null });
        }
    });
}

var getUsers = function (req, res) {

    User.find({}, function (err, users) {
        if (err) {
            return res.json({ message: "no hay usuarios", status: "fail", users: null });
        } else {
            return res.json({ message: "OK", status: "ok", users: users });
        }
    });
}

var getUser = function (req, res) {

    var id = (req.session.user||{})._id;
	User.findById(id).exec(function (err, user) {
		if (!err) {
				if (user) {
					return res.json({ message: "OK", status: "ok", user: user });
				} else {
						return res.json({ message: "USUARIO_NO_ENCONTRADO", status: "fail", user: null });
				}
		} else {
				return res.json({ message: err.message, status: "fail", user: null });
		}
	});
}

var deleteUser = function (req, res) {

}

module.exports = {
    updateUser,
    createUser,
    getUsers,
	getUser,
	deleteUser
}
