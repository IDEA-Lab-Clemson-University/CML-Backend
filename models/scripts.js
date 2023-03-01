const mongoose = require('mongoose');

const Script = mongoose.model("scripts", new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },
    speaker: {  //name of speaker/agent
        type: String,
        required: true
    },
    avatar: {  // avatar url
        type: String,
        required: true
    },
    dialog: {
        type: String,
        required: true
    },
    background: {  // background image url
        type: String,
        required: true
    },
    type: {  // type of script, ex: welcome script
        type: String,
        required: true
    }
})
);

module.exports = Script;