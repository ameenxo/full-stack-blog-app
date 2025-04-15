const Blog = require("../models /blogModel");
const CustomError = require("../utility/customError");
const deleteImage = require("../utility/deleteImage");
const sendResponse = require("../utility/sendResponse");

async function deleteBlogImage(req, res, next) {
    try {
        if (req.isFileFound && req.oldImageFile) {
            const oldImageUrl = req.oldImageFile;
            await deleteImage(oldImageUrl);
            next();
        }
        next();
    } catch (error) {
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in getUserProfile Middleware");
    }

}
async function updateBlog(req, res, next) {
    try {
        const updateObject = req.body;
        if (req.isFileFound) {
            const blog = await Blog.getOne(req.params.id);
            if (!blog) {
                throw new CustomError("cannot find blog", 404, "not find blog");
            }
            const oldImageUrl = blog.image;
            const oldFilename = await oldImageUrl.split('/').pop();
            req.oldImageFile = oldFilename;


            updateObject.imageUrl = `http://localhost:2025/images/${req.file.filename}`;
        }
        const updatedBlog = await Blog.updateById(req.params.id, updateObject);
        if (!updatedBlog) {
            throw new CustomError("cannot update blog", 404, "not getting exact error");
        }
        res.data = updatedBlog;
        next();
    } catch (error) {
        if (req.file) {
            deleteImage(req.file.path)
        }
        return sendResponse(res, error.statusCode || 500, true, error.message || "cannot get exact error. error in getUserProfile Middleware");

    }
}
module.exports = { deleteBlogImage, updateBlog }