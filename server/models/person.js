const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    firstName: String,
    lastName: String,
    gender: String,
    age: Number
});

Person = mongoose.model('person', PersonSchema, 'persons');
module.exports = {
    PersonSchema: PersonSchema,
    Person: Person
};