import multer from "multer";

const storage = multer.memoryStorage();
// upload logic
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5m
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/webp"
        ) {
            cb(null, true)
        } else {
            cb(new Error("Only webp, png, jpeg accepted!"))
        }
    },
});

export default upload