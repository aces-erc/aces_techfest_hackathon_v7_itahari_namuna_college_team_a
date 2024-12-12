import multer from "multer";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "xray") {
            cb(null, "./src/upload/Xray");
        } else if (file.fieldname === "report") {
            cb(null, "./src/upload/Reports");
        } else {
            cb(new Error("Invalid field name"), null);
        }
    },
    filename: function (req, file, cb) {
        const fileExtension = file.originalname.split(".").pop();
        cb(null, `${Date.now()}.${fileExtension}`);
    },
});

export { multer, storage };