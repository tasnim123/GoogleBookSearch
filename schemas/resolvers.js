const  User  = require('../models/User');
const Books = require('../models/Book');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { argsToArgsConfig } = require('graphql/type/definition');

const resolvers = {

  Query: { 
    // attempt 2 with different style
    me: async (parent, args, context) => {
       const userData = await User.findById({_id:args.id})
       const booksSaved = await Books.find({userId:args.id})
      // console.log(userData);
      // console.log(booksSaved);
    
       return {user:userData,savedBooks:booksSaved }
   },
    removeBook: async (parent, {bookId}, context) => {
      console.log(bookId);  
         const book = await Books.findOneAndDelete({bookId:bookId});
         console.log(book.bookId); 
            
            return {bookId:book.bookId};
        }, 
},

  Mutation: {
    login: async (parent, {email, password}) => {
      const user = await User.findOne({email});
        if (!user) {
    throw new AuthenticationError('This info is wrong');
  }

  const correctPw = await user.isCorrectPassword(password);

  if (!correctPw) {
    throw new AuthenticationError('This info is wrong');
  }

  const token = signToken(user);
  return { token, user };
 
    },
    
    addUser: async (parent, args) => {
      // instead of args? - {username, email, password}
      console.log(args)
      const user = new User({...args})
      user.save();
      console.log(user)
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, {book}, context) => {
      //         saveBook: async (parent, args, context) => {
     console.log("Coming Data",book)
      const addedBook = new Books(book);
      console.log(addedBook);
      addedBook.save();
      return {addedBook}
     },
    
}
// }
};

module.exports = resolvers;
