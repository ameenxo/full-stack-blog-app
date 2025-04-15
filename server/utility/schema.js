const userRegisterSchema = {
    username: 'string',
    email: 'string',
    password: 'string',
    fullName: 'string',
};
const userLoginSchema = {
    emailOrUsername: 'string',
    password: 'string',
};
const userUpdateProfileSchema = {
    fullName: 'string',
    bio: 'string',
    country: 'string',
};
const blogCreateSchema = {
    title: 'string',
    content: 'string',
    tags: 'array',
};
const blogCommentSchema = {
    comment: 'string',
}
module.exports = {
    userRegisterSchema,
    userLoginSchema,
    userUpdateProfileSchema,
    blogCreateSchema,
    blogCommentSchema,
}