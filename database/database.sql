CREATE DATABASE crudnodejsmysql;
USE crudnodejsmysql;

-- Table Gerente

-- Table client
CREATE TABLE client(
    cedula VARCHAR(10) NOT NULL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL,
    direccion VARCHAR(20) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    metodoPago VARCHAR(10) NOT NULL
);

-- Table orders
CREATE TABLE orders(
    codigo VARCHAR(10) NOT NULL,
    valor INT(10) NOT NULL,
    fechaEntrega DATE DEFAULT NOT NULL,
    cliente VARCHAR(10) NOT NULL,
    vehiculo VARCHAR(10) NOT NULL,
    viaje VARCHAR(10) NOT NULL,
    PRIMARY KEY('codigo', 'cliente', 'viaje', 'vehiculo')
);