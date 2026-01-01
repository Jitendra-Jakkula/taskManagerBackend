const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        maxLength : 100,
    },
    description :{
        type : String,
        maxLength : 500, 
    },
    startDate :{
        type : Date,
        required : true, 
    },
    endDate :{
        type : Date,
    },
    status :{
        type : String,
        enum : ["not started","in progress","completed"],
        default : "not started",
    },
    owner :{
        type :mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true,
    },

    members : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    ],

});

const Project = mongoose.model("Project",projectSchema);
module.exports = Project;