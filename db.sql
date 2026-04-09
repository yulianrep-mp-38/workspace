Create database SMC proyecto;
Use SMC proyecto;
Create table Usuario (
    cedula INT primary key ,
    nombre Varchar ,
    apellido Varchar,
    correo VARCHAR )
estos campos llevan el nombre de varchar porque el varchar es de  valores de text


Create database SMC proyecto;
Use SMC proyecto;
Create table Gastos (
    id gastos INT primary key ,
    extraordinarios INT,
    FIJOS INT,
   descripción VARCHAR );

estos campos llevan el nombre de varchar porque el varchar es de  valores de text, y el int por que son de valores numericos

Create database SMC proyecto;
Use SMC proyecto;
Create table Ingresos(
    id_ ingresos VARCHAR primary key ,
   ingresos extraordinarios INT,
   ingresos fijos INT,
   diferidos INT) ;

estos campos llevan el nombre de int por que son de valores numericos


Create database SMC proyecto;
Use SMC proyecto;
Create table Sistema SMC (
    id_cuenta VARCHAR primary key ,
    USUARIO VARCHAR(50),
    PRESUPUESTO INT ,
    CATEGORIA VARCHAR  );

estos campos llevan el nombre de varchar porque el varchar es de  valores de text, y el int por que son de valores numericos

Create database SMC proyecto;
Use SMC proyecto;
Create table presupuesto (
    id_ presupuesto INT primary key ,
    gastos acumulados INT,
    monto límite INT ,
    periodo INT );

estos campos llevan el nombre de int por que son de valores numericos


Create database SMC proyecto;
Use SMC proyecto;
Create table categories (
    id_categoria INT primary key ,
    tipo movimiento varchar,
    nombre varchar );

estos campos llevan el nombre de varchar porque el varchar es de  valores de text, y el int por que son de valores numericos


Create database SMC proyecto;
Use SMC proyecto;
Create table Cuenta (
    id_cuenta INT primary key ,
    NOMBRE varchar,
    DIVISA ENUM );

estos campos llevan el nombre de varchar porque el varchar es de  valores de text, y el enum para enumerar los valores
