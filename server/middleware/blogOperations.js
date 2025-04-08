const Blog = require("../models /blogModel");
const CustomError = require("../utility/customError");
const sendResponse = require("../utility/sendResponse");

//  CRUD OPERATION

async function addBlog(req, res, next) {
    try {

        if (!req.file) {
            throw new CustomError("Image is required", 400, "image issue ")
        }
        const imageUrl = `http://localhost:2025/uploads/${req.file.filename}`; // 
        const { title, content, image, tags } = req.body;
        const newBlog = await Blog.createNewBlog(title, content, req.user._id, imageUrl, tags);
        if (!newBlog)
            throw new CustomError("cannot create new blog", 404, "not getting exact error");
        else {
            res.newBlog = newBlog;
            next();
        }
    } catch (error) {
        if (req.file) {
            deleteImage(req.file.path);
        }
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in blog operation");
    }
}
async function getAllBlogs(req, res, next) {
    try {
        const allBlogs = await Blog.getallBlog();
        if (!allBlogs)
            throw new CustomError("cannot find blogs", 404, "no blogs found");
        res.allBlogs = allBlogs;
        next();
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in blog operation");
    }
}
async function getOneBlog(req, res, next) {
    try {
        const blog = await Blog.getOne(req.params.id);
        if (!blog)
            throw new CustomError("cannot find blog", 404, "not find blog");
        res.blog = blog;
        next();
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in blog operation");
    }
}
async function deleteOneBlog(req, res, next) {
    try {
        const deletedBlog = await Blog.deleteBlog(req.params.id);
        if (!deletedBlog)
            throw new CustomError("cannot delete blog", 404, "not getting exact error");
        else {
            res.deletedBlog = deletedBlog;
            next();
        }
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in blog operation");
    }
}
async function updateOneBlog(req, res, next) {
    try {
        updatedBlog = await Blog.updateById(req.params.id, req.user._id, req.body);
        if (!updatedBlog)
            throw new CustomError("cannot update blog", 404, "not getting exact error");
        else
            res.updatedBlog = updatedBlog;
        next();

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in blog operation");
    }
}
// USER ACTIONS     
async function toggleLike(req, res, next) {
    try {
        const blog = await Blog.toggleLike(req.params.id, req.user._id);
        if (!blog) {
            throw new CustomError("cannot update like", 404, "not getting exact error");
        } else {
            res.Blog = blog
            next();
        }

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in blog operation");
    }
};
async function addComment(req, res, next) {
    try {
        const blogComment = await Blog.addComment(req.params.id, req.user._id, req.body.comment);
        if (!blogComment)
            throw new CustomError("cannot add comment", 404, "not getting exact error");
        else {
            res.Blog = blogComment
            next();
        }

    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in blog operation");
    }
};
async function deleteComment(req, res, next) {
    try {
        const deleteBlogComment = await Blog.deleteComment(req.params.blogId, req.user._id, req.params.commentId);
        if (!deleteBlogComment) {
            throw new CustomError("cannot delete comment", 404, "not getting exact error");
        }
        res.deleteBlogComment = deleteBlogComment;
        next();
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in blog operation");
    }
}

module.exports = { addBlog, deleteOneBlog, getOneBlog, getAllBlogs, updateOneBlog, toggleLike, addComment, deleteComment }