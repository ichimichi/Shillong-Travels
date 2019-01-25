const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: String,
    gender: String,
    age: Number
});

Person = mongoose.model('person', PersonSchema, 'persons');
module.exports = {
    PersonSchema: PersonSchema,
    Person: Person
};