const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Calendar Schema
const CalendarSchema = new Schema({
    title: {
        type: String,
        required: [true, "*Campo obrigatório!"]
    },
    description: {
        type: String,
        required: [true, "*Campo obrigatório!"]
    },
    date: {
        type: Date,
        required: [true, "*Campo obrigatório!"]
    },
    startDate: {
        type: Date,
        required: [true, "*Campo obrigatório!"]
    },
    finishDate: {
        type: Date,
        required: [true, "*Campo obrigatório!"]
    },
    locate: {
        type: String
    },
    invite: {
        type: String
    }
});
// criar Modelo_Calendar baseado em CalendarSchema: "PontosInteresse"->nome da // coleção
const Calendar = mongoose.model("Calendar", CalendarSchema);
// exportar Modelo_Calendar
module.exports = Calendar;