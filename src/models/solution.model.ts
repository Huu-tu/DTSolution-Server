import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SolutionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company:{
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      data: Buffer,
    },
    tech: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'solutions',
    timestamps: true,
  }
);

const Solution = mongoose.model('Solution', SolutionSchema);
export default Solution;