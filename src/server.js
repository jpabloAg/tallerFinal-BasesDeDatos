const express = require('express');
const app = express();
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const hbs = require('hbs');
const morgan = require('morgan');
const path = require('path');

// import routes
const clientRoutes = require('./routes/client.routes');
const orderRoutes = require('./routes/order.routes');

// settings
app.set('port', process.env.PORT || 3000);
hbs.registerPartials(path.join(__dirname, 'views','partials'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'views'));

// morgan
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host:'127.0.0.1',
    user: 'root',
    port:'3306',
    database: 'crudnodejsmysql'
}, 'single'));
app.use(express.urlencoded({extended:false}));

// settings routes
app.use('/', clientRoutes);
app.use('/', orderRoutes);

app.listen(app.get('port'), () => console.log(`Server on port ${ app.get('port') }`));
