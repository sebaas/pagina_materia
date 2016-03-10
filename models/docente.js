// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Docente', new Schema({ 
    materia: String, 
    cargo: String,
    nombre: String,
    email: String,
    direccion: String,
    telefono: String,
    link: String,
    photo_link: String,
    active: Boolean
}));