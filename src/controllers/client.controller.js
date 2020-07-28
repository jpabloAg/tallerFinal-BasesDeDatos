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
            res.redirect('/client-list');
        });
    });
}

controller.delete = (req, res) => {
    const { cedula } = req.params;
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM client WHERE cedula = ?', [cedula], (err, clientDB) => {
            res.redirect('/client-list');
        })
    })
}

module.exports = controller;