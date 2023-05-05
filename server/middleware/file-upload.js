import multer from "multer";


const MEMI_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

/* File Storage config */

const fileUpload = multer({
    limits:50000,
    storage: multer.diskStorage({
        
        destination: function (req, file, cb){
            cb(null, "./public/assets");
        },
        filename: function (req, file, cb){
            cb(null, file.originalname);
        }
        
    }),
    fileFilter : function (req, file, cb){
        const isValid = !! MEMI_TYPE[file.mimetype];
        let error = isValid ? null : new Error('Invalid mim type');
        cb(error, isValid);
    }
})

export default fileUpload;