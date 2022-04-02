import mongoose from 'mongoose';

// Article Schema
const articleSchema = mongoose.Schema({
  journal: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  linkText: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
  },
});

const Article = mongoose.model('writing', articleSchema);
export {Article};
