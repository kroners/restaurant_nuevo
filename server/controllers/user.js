'use strict'

const User = require('mongoose').model('User');

updateUser = function (req, res){
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

createUser = function (req, res) {
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var dni = req.body.dni;
    var telefono = req.body.telefono;
    var imagen = req.body.imagen;
    var sexo = req.body.sexo;
    var email = req.body.email;
    var password = req.body.password;
    Usuario.exists(email, function (err, user) {
        if (err) {
            return res.json({ message: err.message, status: "fail", usuario: null });
        }
        if (!user) {
            let user = new Usuario({
                nombre: nombre,
                apellido: apellido,
                dni: dni,
                sexo: sexo,
                telefono: telefono,
                imagen: imagen,
                local: {
                    email: email,
                    password: crypt.hash(password)
                }
            });
            user.save(function (err, newUser) {
                if (err) {
                    return res.json({ message: "ERROR_GUARDANDO", status: "fail", usuario: null });
                }
                req.session.regenerate(function () {
                    req.session.user = newUser;
                    // next();
                    res.json({
                        status: "ok",
                        usuario: newUser,
                        message: "REGISTRADO"
                    });
                });
            });
        } else {
            return res.json({ message: "EMAIL_YA_EXISTE", status: "fail", usuario: null });
        }
    });
}