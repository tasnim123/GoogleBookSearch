const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  userId:{
    type:String,
    required:true,
  }
});
const Books = model('Books', bookSchema);

module.exports = Books;
