CREATE DATABASE crudnodejsmysql;
USE crudnodejsmysql;

-- Table Gerente
CREATE TABLE gerente(
    cedula VARCHAR(10) NOT NULL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    edad INT(2) NOT NULL,
    salario FLOAT(7) NOT NULL,
    municipio VARCHAR(2) NOT NULL
);

-- Table SubGerente
CREATE TABLE subgerente(
    cedula VARCHAR(10) NOT NULL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    edad INT(2) NOT NULL,
    salario FLOAT(7) NOT NULL,
    jefe VARCHAR(10) NOT NULL REFERENCES gerente,
    comuna VARCHAR(2) NOT NULL REFERENCES comuna
);

-- Table Domiciliario
CREATE TABLE domiciliario(
    cedula VARCHAR(10) NOT NULL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    edad INT(2) NOT NULL,
    salario FLOAT(7) NOT NULL,
    jefe VARCHAR(10) NOT NULL REFERENCES gerente,subgerente,
    licencia VARCHAR(12) NOT NULL,
    incentivo FLOAT(6)
); 

-- Table Viaje
CREATE TABLE viaje(
    codigo VARCHAR(10) NOT NULL PRIMARY KEY,
    ruta VARCHAR(60) NOT NULL, 
    distancia FLOAT(2),
    domiciliario VARCHAR(10) NOT NULL REFERENCES domiciliario
);

-- Table Municipio
CREATE TABLE municipio(
    codigo VARCHAR(2) NOT NULL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    nroComunas INT(2) NOT NULL,
    poblacion INT(7) 
);

-- Table Comuna
CREATE TABLE comuna(
    codigo VARCHAR(2) NOT NULL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    municipio VARCHAR(2) REFERENCES municipio
);

-- Table Cliente
CREATE TABLE cliente(
    cedula VARCHAR(10) NOT NULL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL,
    direccion VARCHAR(20) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    metodoPago VARCHAR(10) NOT NULL
);

-- Table Pedido
CREATE TABLE pedido(
    codigo VARCHAR(10) NOT NULL,
    valor INT(10) NOT NULL,
    fechaEntrega DATE DEFAULT NOT NULL,
    cliente VARCHAR(10) NOT NULL,
    vehiculo VARCHAR(10) NOT NULL,
    viaje VARCHAR(10) NOT NULL,
    PRIMARY KEY(codigo, cliente, viaje, vehiculo)
);

-- Table Vehiculo
CREATE TABLE vehiculo(
    placa VARCHAR(7) NOT NULL PRIMARY KEY,
    capacidad FLOAT(2) NOT NULL,
    tipoVehiculo VARCHAR(1) REFERENCES tipodevehiculo
);

-- Table TipoDeVehiculo
CREATE TABLE tipodevehiculo(
    codigo VARCHAR(1) NOT NULL PRIMARY KEY,
    descripcion VARCHAR (300) NOT NULL
);

-- Table Paquete
CREATE TABLE paquete(
    codigo VARCHAR(10) NOT NULL PRIMARY KEY,
    peso FLOAT(2) NOT NULL,
    descripcion VARCHAR(100),
    precio INT(7) NOT NULL,
    tipodepaquete VARCHAR(1) NOT NULL REFERENCES tipodepaquete
);

-- Table TipoDePaquete
CREATE TABLE tipodepaquete(
    codigo VARCHAR(1) NOT NULL PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL
);

-- Table PaquetexPedido
CREATE TABLE paquetexpedido(
    paquete VARCHAR(10) NOT NULL PRIMARY KEY,
    pedido VARCHAR(10) NOT NULL REFERENCES pedido,
    tarifa INT(6) NOT NULL
); 