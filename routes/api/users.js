const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail');
const { bienvenida } = require('../../email/sendEmail')

// Item Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
    const { nombre, email, telefono, tipo, password } = req.body;
    
    //Simple validation
    if(!nombre || !email || !password || !telefono || !tipo){
        return res.status(400).json({msg: 'Por favor ingresa todos los campos'})
    }

    //Check for existing user
    User.findOne({email})
    .then(user =>{
        if(user){
            return res.status(400).json({msg: 'Este correo ya ha sido tomado'})
        }
        const newUser = new User({
            nombre,
            email,
            telefono,
            tipo,
            password
        })

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => {
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 36000 }, 
                        (err, token) => {
                            if(err) throw err
                            // Enviar correo de bienvenida
                            bienvenida(user.email, user.nombre, user.tipo)
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    nombre: user.nombre,
                                    telefono: user.nombre,
                                    tipo: user.tipo,
                                    email: user.email,
                                    register_date: user.register_date
                                }
                            })
                        }
                    )
                })
            })
        })
    })
});

module.exports = router;