import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ConsultationSchema = new Schema(
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
    collection: 'consultations',
    timestamps: true,
  }
);

const Consultation = mongoose.model('Consultation', ConsultationSchema);
export default Consultation;