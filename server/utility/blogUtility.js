const Blog = require("../models /blogModel");

async function getImageFileNameById(blogId) {

    try {
        const blog = await Blog.getOne(blogId)
        if (!blog) {
            return { error: true, message: "cannot find blog", fileName: null }
        }
        const imageUrl = blog.imageUrl;
        const filename = await imageUrl.split('/').pop();
        return { error: false, message: "image filename found", fileName: filename }
    } catch (error) {
        return { error: true, message: error.message, fileName: null }
    }

}
module.exports = { getImageFileNameById }