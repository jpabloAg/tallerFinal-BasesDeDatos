const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, connection) => {
        connection.query('SELECT * FROM orders', (err, ordersDB) => {
            res.render('order', { data: ordersDB });
        });
    });
}

controller.save = (req, res) => {
    let data = req.body;
    let fecha = data.fechaEntrega.split('/');
    let newFecha = fecha[2]+'-'+fecha[0]+'-'+fecha[1];
    data.fechaEntrega = newFecha;
    req.getConnection((err, connection) => {
        connection.query('INSERT INTO orders set ?', [data], (err, ordersDB) => {
            res.redirect('/order-list');
        });
    });
}

controller.delete = (req, res) => {
    let { codigo } = req.params;
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM orders Where codigo = ?', [codigo], (err, ordersDB) => {
            res.redirect('/order-list');
        });
    });
}

module.exports = controller;