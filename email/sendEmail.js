const sgMail = require('@sendgrid/mail');
const config = require('config')

const bienvenida = (email, nombre, tipo) => {
    const msgVendedor = "<h1> Bienvenido al sistema </h1> </br> Como usuario tipo vendedor puedes realizar tus pedidos en el sistema para que sean entregados por algún repartidor.</br>";
    const msgRepartidor = "<h1> Bienvenido al sistema </h1> </br> Como usuario tipo repartidor puedes escojer algún pedido disponible para entregarlo.</br>";
    var msg = "";
    if(tipo === "vendedor"){
        msg = msgVendedor;
    } else {
        msg = msgRepartidor;
    }
    sgMail.setApiKey(config.get("SENDGRID_API_KEY"));
    const body = {
        to: email,
        from: 'pedidos.productos.2019@gmail.com',
        subject: nombre + ', Bienvenido al sistema',
        text: 'Pedidos productos',
        html: msg,
    };
    sgMail.send(body);
};

module.exports.bienvenida = bienvenida;