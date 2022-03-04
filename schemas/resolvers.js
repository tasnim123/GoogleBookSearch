const User = require("../models/User");
const Books = require("../models/Book");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args) => {
      const userData = await User.findById({ _id: args.id });
      const booksSaved = await Books.find({ userId: args.id });
      // console.log(userData);
      return { user: userData, savedBooks: booksSaved };
    },
    removeBook: async (parent, { bookId }) => {
      console.log(bookId);
      const book = await Books.findOneAndDelete({ _id: bookId });
      console.log(book.bookId);

      return { bookId: book.bookId };
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("This info is wrong");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("This info is wrong");
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { book }) => {
      console.log(book);
      const addedBook = new Books(book);
      console.log(addedBook);
      addedBook.save();
      return { addedBook };
    },
    addUser: async (parent, args) => {
      console.log(args);
      const user = new User({ ...args });
      user.save();
      console.log(user);
      const token = signToken(user);
      return { token, user };
    },
  },
  // }
};

module.exports = resolvers;
