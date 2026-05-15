-- Crear bases de datos
CREATE DATABASE IF NOT EXISTS ventas_db;
CREATE DATABASE IF NOT EXISTS despacho_db;

-- Datos para Ventas
USE ventas_db;
CREATE TABLE IF NOT EXISTS venta (
    id_venta BIGINT AUTO_INCREMENT PRIMARY KEY,
    direccion_compra VARCHAR(255),
    valor_compra INT,
    fecha_compra DATE,
    despacho_generado BOOLEAN DEFAULT FALSE
);

INSERT INTO venta (direccion_compra, valor_compra, fecha_compra, despacho_generado) 
VALUES 
('Av. Siempre Viva 742', 15000, '2026-05-14', false),
('Calle Falsa 123', 25000, '2026-05-14', false);

-- Datos para Despachos
USE despacho_db;
CREATE TABLE IF NOT EXISTS despacho (
    id_despacho BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_compra BIGINT,
    direccion_compra VARCHAR(255),
    valor_compra BIGINT,
    fecha_despacho DATE,
    patente_camion VARCHAR(255),
    intento INT DEFAULT 0,
    despachado BOOLEAN DEFAULT FALSE
);

INSERT INTO despacho (id_compra, direccion_compra, valor_compra, fecha_despacho, patente_camion, intento, despachado) 
VALUES 
(1, 'Av. Siempre Viva 742', 15000, '2026-05-15', 'ABCD-12', 0, false);