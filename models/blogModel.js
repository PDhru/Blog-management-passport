const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title :{
        type: 'string',
        required: true
    },
    description :{
        type: 'string',
        required: true
    },
    blogImage: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const blog = mongoose.model('blog', blogSchema);

module.exports = blog;