import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// import mongoose_delete from 'mongoose-delete';

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    image: {
      type: String,
      default: ''
    },
    tech: {
      type: String,
      required: false,
    },
    // inStock: {
    //   type: Boolean,
    //   default: true
    // },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

// ProductSchema.plugin(mongoose_delete, {
//   deleteAt?: true,
//   overrideMethods: 'all',
// });

const Product = mongoose.model('Product', ProductSchema);
export default Product;