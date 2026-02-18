// import mongoose from 'mongoose';

// const PostSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },

//     hotelLocation:{
//         title: String,
//         required: true,
//     },

//     description: {
//         type: String,
//         required: true,
//     },

//     category: {
//         type: mongoose.ObjectId,
//         ref: 'Category',
//         required: true,
//     },

//     images: {
//         type: [String],
//         required: true,
//         validate: [arrayLimit, 'You must provide at least 3 images.'],
//     },

//     isAvilable: {
//         type: Boolean,
//         default: true,
//         required: true,
//     },

//     guest: {
//         type: Number,
//         required: true,
//     },

//     price: {
//         type: Number,
//         required: true,
//         min: 100,
//         max: 5000,
//     },

//     nearArea: {
//         type: [String],
//         required: true,
//     },

//     facilities: {
//         type: [String],
//         required: true,
//     },

//     slug: {
//         type: String,
//         lowercase: true,
//     },

// });

// function arrayLimit(val) {
//     return val.length === 3;
// }

// export default mongoose.model('Post', PostSchema);

import mongoose from "mongoose";

function arrayLimit(val) {
  return val.length === 3;
}

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },

  hotelLocation: { type: String, required: true },

  description: { type: String, required: true },

  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },

  images: {
    type: [String],
    required: true,
    validate: [arrayLimit, "You must provide exactly 3 images"],
  },

  slug: { type: String, required: true, lowercase: true },

  isAvilable: { type: Boolean, default: true, required: true },

  guest: { type: Number, required: true },

  price: { type: Number, required: true, min: 100, max: 5000 },

  nearArea: { type: [String], required: true },

  facilities: { type: [String], required: true },
});

export default mongoose.model("Post", PostSchema);
