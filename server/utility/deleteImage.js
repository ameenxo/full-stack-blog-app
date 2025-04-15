const { log } = require('console');
const fs = require('fs');
const path = require('path');
const deleteImage = (filename) => {

    if (filename === "default.jpg") return;

    fs.unlink(path.join(__dirname, '../images', filename), (err) => {
        if (err) console.error("Error deleting file:", err);
    });

}

module.exports = deleteImage;