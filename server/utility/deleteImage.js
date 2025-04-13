const { log } = require('console');
const fs = require('fs');
const deleteImage = (filepath) => {
    
    fs.unlink(filepath, (err) => {
        if (err) console.error("Error deleting file:", err);
    });

}

module.exports = deleteImage;