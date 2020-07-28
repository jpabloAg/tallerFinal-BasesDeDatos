const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, connection) => {
        connection.query('SELECT * FROM orders', (err, ordersDB) => {
            ordersDB = ordersDB.map((order) => {
                let fecha = JSON.stringify(order.fechaEntrega);
                let fechaCortada = fecha.slice(1,11);
                let fechaModificada = fechaCortada.split('-');
                order.fechaEntrega = `${ fechaModificada[0]}/${fechaModificada[1]}/${fechaModificada[2]}`;
                return order;
            });
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
            req.getConnection((err, connection) => {
                connection.query('SELECT * FROM orders', (err, ordersDB) => {
                    ordersDB = ordersDB.map((order) => {
                        let fecha = JSON.stringify(order.fechaEntrega);
                        let fechaCortada = fecha.slice(1,11);
                        let fechaModificada = fechaCortada.split('-');
                        order.fechaEntrega = `${ fechaModificada[0]}/${fechaModificada[1]}/${fechaModificada[2]}`;
                        return order;
                    });
                    res.render('order', { 
                        data: ordersDB,
                        success: `Registro almacenado exitosamente!`
                    });
                });
            });
        });
    });
}

controller.delete = (req, res) => {
    let { codigo } = req.params;
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM orders Where codigo = ?', [codigo], (err, ordersDB) => {
            connection.query('SELECT * FROM orders', (err, ordersDB) => {
                ordersDB = ordersDB.map((order) => {
                    let fecha = JSON.stringify(order.fechaEntrega);
                    let fechaCortada = fecha.slice(1,11);
                    let fechaModificada = fechaCortada.split('-');
                    order.fechaEntrega = `${ fechaModificada[0]}/${fechaModificada[1]}/${fechaModificada[2]}`;
                    return order;
                });
                res.render('order', { 
                    data: ordersDB,
                    deleted: `Registro eliminado exitosamente!`
                });
            });
        });
    });
}

module.exports = controller;