const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

// Item Model
const Pedido = require('../../models/Pedido');

// @route   GET api/pedidos
// @desc    Get All Pedidos
// @access  Public
router.get('/', (req, res) => {
    Pedido.find({})
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   GET api/pedidos/vendedor/
// @desc    Obtener los pedidos de un vendedor
// @access  Private
router.get('/vendedor/', auth, (req, res) => {
    Pedido.find({vendedor: req.user.id})
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   POST api/pedidos
// @desc    Crear un pedido
// @access  Private

router.post('/', auth, (req, res) => {
    const { nombreCliente, direccionCliente, telefonoCelular, descripcionEntrega } = req.body;
    
    //Simple validation
    if(!nombreCliente || !direccionCliente || !telefonoCelular || !descripcionEntrega){
        return res.status(400).json({msg: 'Por favor ingresa todos los campos'})
    }

    const newPedido = new Pedido({
        nombreCliente: req.body.nombreCliente,
        direccionCliente: req.body.direccionCliente,
        consejo: req.body.consejo,
        telefonoFijo: req.body.telefonoFijo,
        telefonoCelular: req.body.telefonoCelular,
        descripcionEntrega : req.body.descripcionEntrega,
        vendedor: req.user.id
    });
    newPedido.save().then(pedido => res.json(pedido))
});

// @route   DELETE api/items/:id
// @desc    Create an Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Item.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true}))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;