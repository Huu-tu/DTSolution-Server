import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ConsultationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone:{
      type: Number,
      required: true,
    },
    topic: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    tech: {
      type: String,
      required: false,
    },
  },
  {
    collection: 'consultations',
    timestamps: true,
  }
);

const Consultation = mongoose.model('Consultation', ConsultationSchema);
export default Consultation;