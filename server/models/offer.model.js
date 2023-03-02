const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    job: { 
        type: String,
        required: [ true, "Job is required"],
        validate: {
            validator: function(val) {
                // validar que el valor de job sea uno de los valores permitidos
                return /^(Frontend developer|Backend developer|DevOps|Fullstack developer)$/.test(val);
            },
            message: "Job must be 'Frontend developer', 'Backend developer', 'DevOps', or 'Fullstack developer'"
        }
    },
    languages: {
        type: [String], // indicar que el campo es una lista de strings
        required: [
            true,
            "Languages is required"
        ],
        validate: {
            validator: function(val) {
                // validar que cada elemento en la lista sea válido
                return val.every(lang => /^(JS|CSS)$/.test(lang));
            },
            message: "Languages must be 'JS', 'CSS', or both"
        }
    },
    salary:{
        type: Number,
        require:[
            true,
            "Salary is required"
        ]
    }
});

const Offer = mongoose.model('Offer', OfferSchema);
module.exports = Offer;
