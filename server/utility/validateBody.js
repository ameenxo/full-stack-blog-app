function validateBody(body, schema, AllFieldRequire) {
    const errors = {}
    if (Object.keys(body).length === 0) {
        return { valid: false, error: true, message: "no body provided " }
    }
    if (AllFieldRequire) {
        Object.keys(schema).forEach((field) => {
            if (!body[field]) {
                errors[field] = `${field} is required`;
            } else if (schema[field] === 'string' && typeof body[field] !== 'string') {
                errors[field] = `${field} must be a string`;
            }
        });
        Object.keys(body).forEach((field) => {
            if (!schema[field]) {
                errors[field] = `${field} is not a valid field`;
            }
        });
    }
    else {
        Object.keys(body).forEach((field) => {
            if (schema[field]) {
                if (schema[field] === 'string' && typeof body[field] !== 'string') {
                    errors[field] = `${field} must be a string`;
                }
            } else {
                errors[field] = `${field} is not a valid field`;
            }
        });
    }
    if (Object.keys(errors).length > 0) {
        return {
            valid: false,
            error: true,
            message: Object.values(errors).join(', '),
        };
    }
    return { valid: true, error: false, message: 'Validation successful' };
};
function validateImageFile(req, required) {
    if (required && !req.file) {
        return { imageFound: false, error: true, message: 'Image file is required' };
    }
    if (req.file) {
        return { imageFound: true, error: false, message: 'Image file found' };
    }
    return { imageFound: false, error: false, message: 'No image file provided' };

}
module.exports = { validateBody, validateImageFile };