const mongoose = require('mongoose');
const CustomError = require('../utility/customError');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  imageUrl: {
    type: String, // URL or file path for the uploaded image
    required: true,
  },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tags: [String], // Optional tags for each blog
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
});
blogSchema.statics.createNewBlog = async function (data) {
  try {
    if (!data) {
      throw new CustomError("cannot get blog data", 401, "bad request");
    }
    const newBlog = await this.create(data);
    if (!newBlog)
      throw new CustomError("cannot create new blog", 404, "not getting exact error");
    return newBlog;
  } catch (error) {
    throw new CustomError(error.message || "cannot get exact error {blogSchema.createNewBlog}", error.statusCode || 405, "not getting exact error");
  }
}
blogSchema.statics.getOne = async function (id) {
  try {
    if (!id)
      throw new CustomError("cannot get blog-Id", 401, "bad request");
    const blog = await Blog.findById(id);
    if (!blog)
      throw new CustomError("cannot find blog with given id", 404, "cannot find blog");
    else
      return blog;
  } catch (error) {
    throw new CustomError(error.message || "cannot get exact error {blog-model,staticMethod:getOne},", error.statusCode || 401, "error in find One");
  }

}
blogSchema.statics.getallBlog = async function () {
  try {
    const blogs = await Blog.find();
    if (blogs.length == 0)
      throw new CustomError("cannot find blogs", 404, "not find blog");
    else
      return blogs;
  } catch (error) {
    throw new CustomError(error.message || "cannot get exact error {blog-model,staticMethod:getallBlog}", error.statusCode || 401, "error in find all blog");
  }
};
blogSchema.statics.deleteBlog = async function (id) {
  try {
    if (!id)
      throw new CustomError("cannot get blog-Id or userId", 401, "bad request");
    const deletedBlog = await this.findByIdAndDelete(id);
    if (!deletedBlog)
      throw new CustomError("cannot delete blog with given id", 404, "cannot find blog");
    else
      return deletedBlog;
  } catch (error) {
    throw new CustomError(error.message || "cannot get exact error {blog-model,staticMethod:deleteOneById},", error.statusCode || 401, "error in find One");
  }
};
blogSchema.statics.updateById = async function (blogId, data) {
  try {
    const blog = await this.findByIdAndUpdate(blogId, {
      $set: data,
    }, { new: true });
    if (!blog) {
      throw new CustomError(`blog not found with ${blogId}`, 404, "invalid request")
    }
    return blog
  } catch (error) {
    throw new CustomError(error.message || "cannot get exact error {blog-model,staticMethod:updateById}", error.statusCode || 500, error.errorCode || "error in update blog");
  }
};
blogSchema.statics.toggleLike = async function (blogId, userId) {
  try {
    if (!blogId || !userId)
      throw new CustomError("cannot get blog-Id or userId", 401, "bad request");
    const blog = await Blog.findById(blogId);
    if (!blog)
      throw new CustomError(`cannot find blog with id :${blogId}`, 404, "not find blog");
    const isLiked = blog.likes.includes(userId);
    if (isLiked) {
      blog.likes = await blog.likes.filter((id) => id.toString() !== userId);
    } else {
      blog.likes.push(userId);
    }
    await blog.save();
    return blog;
  } catch (error) {
    throw new CustomError(error.message || "cannot get exact error {blog-model,staticMethod:toggleLike}", error.statusCode || 500, error.errorCode || "error in toggle like");
  }
};
blogSchema.statics.addComment = async function (blogId, userId, comment) {
  try {
    if (!blogId || !userId || !comment)
      throw new CustomError("cannot get blog-Id or userId or comment", 401, "bad request");
    const blog = await Blog.findById(blogId);
    if (!blog)
      throw new CustomError(`blog not find by given id :${blogId}`, 404, "not find blog");
    blog.comments.push({ user: userId, text: comment });
    blog.commentCount = blog.comments.length;
    blog.save();
    return blog;
  } catch (error) {
    throw new CustomError(error.message || "cannot get exact error {blog-model,staticMethod:addComment}", error.statusCode || 500, error.errorCode || "error in add comment");
  }
};
// Delete a comment from a blog
blogSchema.statics.deleteComment = async function (blogId, userId, commentId) {
  try {

    if (!blogId || !userId || !commentId)
      throw new CustomError("Required fields are empty", 401, "One of userId, commentId, or blogId is missing");

    // Fetch the blog post
    const blog = await this.findById(blogId);
    if (!blog) throw new CustomError("Blog not found", 404, "Not Found");

    // Debug: Check if comments exist
    if (!blog.comments || blog.comments.length === 0) {
      throw new CustomError("No comments found in this blog", 404, "No Comments");
    }

    // Find the comment index
    const commentIndex = blog.comments.findIndex(
      (comment) => comment._id.toString() === commentId.toString()
    );

    if (commentIndex === -1) {
      throw new CustomError("Comment not found", 404, "Not Found");
    }

    // Check if the user is authorized to delete the comment
    if (blog.comments[commentIndex].user.toString() !== userId) {
      throw new CustomError("Unauthorized to delete this comment", 403, "Forbidden");
    }

    // Remove the comment from the array
    blog.comments.splice(commentIndex, 1);

    // Update the comment count
    blog.commentCount = blog.comments.length;

    // Save the updated blog
    await blog.save();

    return blog;
  } catch (error) {
    throw new CustomError(
      error.message || "Internal Server Error in deleteComment",
      error.statusCode || 500,
      error.errorCode || "Error in deleteComment method"
    );
  }
};

blogSchema.statics.getComments = async function (blogId) {
  try {
    if (!blogId)
      throw new CustomError("cannot get blog-Id", 401, "bad request");
    const blog = await Blog.findById(blogId);
    if (!blog)
      throw new CustomError(`cannot find blog with given id:${blogId}`, 404, "cannot find blog");
    return blog.comments;
  } catch (error) {
    throw new CustomError(error.message || "cannot get exact error . from: blog-model,staticMethod:getComment", error.statusCode || 500, error.errorCode || "error in get comment");
  }
}


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog
