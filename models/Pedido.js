const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PedidoSchema = new Schema({
    nombreCliente: {
        type: String,
        required: true
    },
    direccionCliente: {
        type: String,
        required: true
    },
    consejo: {
        type: String,
        default: 'Dirección exacta'
    },
    telefonoFijo: {
        type: Number,
    },
    telefonoCelular: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        default: 'para entregar',
        enum: {values: ['para entregar', 'en proceso', 'entregado']}
    },
    descripcionEntrega: {
        type: String,
        required: true
    },
    vendedor: {
        type: Schema.Types.ObjectId,
        required: true
    },
    repartidor: {
        type: Schema.Types.ObjectId
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    fechaEntrega: {
        type: Date,
    }
});

module.exports = Pedido = mongoose.model('pedido', PedidoSchema);