const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
        console.log('El archivo ha sido guardado');
    });
}

const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }
}

const getListado = () => {

    const listado = require('../db/data.json').filter(x => x.completado === true);
    return listado;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(x => x.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = Boolean(completado);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(x => x.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}