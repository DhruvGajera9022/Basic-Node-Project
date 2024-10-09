const multer = require("multer");


// Image upload setup
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "assets/img/userImages/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    },
});
const upload = multer({
    storage: storage,
}).single("image"); // Single file upload for image



module.exports = {
    upload,
}