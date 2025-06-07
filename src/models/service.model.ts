import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type:{
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
    collection: 'services',
    timestamps: true,
  }
);

const Service = mongoose.model('Service', ServiceSchema);
export default Service;