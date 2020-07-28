const controller = {};


controller.list = (req, res) => {
    req.getConnection((err, connection) => {
        connection.query('SELECT * FROM client', (err, clientsDB) => {
            res.render('client', { data: clientsDB });
        });
    });
}

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, connection) => {
        connection.query('INSERT INTO client set ?', [data], (err, clientDB) => {
            if(err){
                req.getConnection((err, connection) => {
                    connection.query('SELECT * FROM client', (err, clientsDB) => {
                        res.render('client', { 
                            data: clientsDB,
                            error: `Error: ya existe un cliente con la cedula ${ data.cedula }`
                        });
                    });
                });
                return true;
            }
            req.getConnection((err, connection) => {
                connection.query('SELECT * FROM client', (err, clientsDB) => {
                    res.render('client', { 
                        data: clientsDB,
                        success: `Registro almacenado exitosamente!`
                    });
                });
            });
        });
    });
}

controller.delete = (req, res) => {
    const { cedula } = req.params;
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM client WHERE cedula = ?', [cedula], (err, clientDB) => {
            req.getConnection((err, connection) => {
                connection.query('SELECT * FROM client', (err, clientsDB) => {
                    res.render('client', { 
                        data: clientsDB,
                        deleted: `Registro eliminado exitosamente!`
                    });
                });
            });
        });
    });
}

module.exports = controller;