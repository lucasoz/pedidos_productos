const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

// Item Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
    const { email, password } = req.body;
    
    //Simple validation
    if(!email || !password){
        return res.status(400).json({msg: 'Por favor ingresa todos los campos'})
    }

    //Check for existing user
    User.findOne({email})
    .then(user =>{
        if(!user) return res.status(400).json({msg: 'el usuario no existe'})
        
        // Validate password
        bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' })
            jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 36000 }, 
                (err, token) => {
                    if(err) throw err
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
});


// @route   GET api/auth/user
// @desc    Get user data
// @access  Pivate
router.get('/user', auth, (req, res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router;