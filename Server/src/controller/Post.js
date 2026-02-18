// import Cloudinary from "../config/Cloudinary.js";

// export const createPostController = async(req, res) => {

//     try {
//         const {
//             title,
//             hotelLocation,
//             description,
//             category,
//             image,
//             isAvilable,
//             guest,
//             price,
//             nearArea,
//             facilities,
//         } = req.body;

//         const files = req.files.images;

//         // validation

//         if (
//             !title ||
//             !hotelLocation ||
//             !description ||
//             !category ||
//             !image ||
//             !guest ||
//             !price ||
//             !nearArea ||
//             !facilities ||
//             !isAvilable
//         ) {
//             return res.status(400).json({
//                 message: "All feilds are required",
//             });
//         }

//         if(!files || files.length !== 3){
//             return res.status(400).json({
//                 message: "You must provide 3 images",
//             })
//         }
//         // upload images to cloudinary

//         const imageUrls = await Promise.all(
//             files.map((file) => (
//                 Cloudinary.uploader
//                 // .upload(file.tempFilePath)
//                 .upload(file.Path)
//                 .then((result) => result.secure_url)
//             ))
//         );

//         const newPost = new postMessage({
//             title,
//             hotelLocation,
//             description,
//             category,
//             isAvilable,
//             guest,
//             nearArea,
//             price,
//             images: imageUrls,
//         });

//         await newPost.save();

//         return res.status(201).json({
//             message: "Post created successfully",
//             post: newPost,
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Something went wrong",
//         })

//         }
//     };

import Cloudinary from "../config/Cloudinary.js";
import Post from "../models/Post.js";
import slugify from "slugify";

export const createPostController = async (req, res) => {
  try {
    const {
      title,
      hotelLocation,
      description,
      category,
      isAvilable,
      guest,
      price,
      nearArea,
      facilities,
    } = req.body;

    // BASIC VALIDATION
    if (
      !title ||
      !hotelLocation ||
      !description ||
      !category ||
      !guest ||
      !price ||
      !nearArea ||
      !facilities ||
      !isAvilable ||
      !req.files
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // FILE CHECK
    const files = req?.files?.images;

    if (!files) {
      return res.status(400).json({
        message: "Images are required",
      });
    }

    const imagesArray = Array.isArray(files) ? files : [files];

    if (imagesArray.length !== 3) {
      return res.status(400).json({
        message: "You must upload exactly 3 images",
      });
    }

    // UPLOAD TO CLOUDINARY
    const imageUrls = await Promise.all(
      imagesArray.map((file) =>
        Cloudinary.uploader
          .upload(file.tempFilePath)
          .then((res) => res.secure_url)
      )
    );

    // SAVE POST
    const newPost = new Post({
      title,
      hotelLocation,
      description,
      category,
      isAvilable,
      guest,
      price,
      nearArea: JSON.parse(nearArea),
      facilities: JSON.parse(facilities),
      images: imageUrls,
      slug: slugify(title, { lower: true }),
    });

    await newPost.save();

    return res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};

export const getPostController = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .select("-images")
      .populate("category");
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting post",
      error: error.message,
    });
  }
};

export const getAllPostsController = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("category")
      .sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting posts",
      error: error.message,
    });
  }
};
