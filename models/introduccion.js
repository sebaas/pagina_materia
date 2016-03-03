// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Introduccione', new Schema({ 
    materia: String, 
    titulo: String,
    universidad: String,
    facultad: String,
    facultad_link: String,
    universidad_link: String,
    resumen: String
}));