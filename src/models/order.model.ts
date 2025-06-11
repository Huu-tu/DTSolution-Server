import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true
    },
    customerPhone: {
      type: String,
      required: true
    },
    customerAddress: {
      type: String,
      required: true
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'completed', 'cancelled'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);


const Order = mongoose.model('Order', OrderSchema);
export default Order;