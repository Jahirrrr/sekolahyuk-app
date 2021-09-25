/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */

const mongoose = require('mongoose');
const Joi = require('joi');

const groupSchema = new mongoose.Schema({
    groupCode:{
        type: String,
        required: true
    },
    groupName: {
        type: String,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestPaper'
    }]
},{ timestamps: { createdAt: true, updatedAt: false }})

const Group = mongoose.model('Group', groupSchema);

function validateGroup(group) {
    const schema = Joi.object({
        groupCode: Joi.string().required(),
        groupName: Joi.string().required()
    })

    return schema.validate(group);
}

module.exports = {
    Group,
    validateGroup
}
