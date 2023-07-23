import SDK from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();
import multer from 'multer';
const S3Client = new SDK.S3({
  region: process.env.AWS_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
  },
});

export const upload = multer({
  limits: 1024 * 1024 * 5,
  fileFilter: function (req, file, next) {
    if (
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/svg'
    ) {
      next(null, Boolean);
    } else {
      next('Multer Error : File type not supported', false);
    }
  },
});

export const uploadToS3 = (fileData, imagePath) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: imagePath,
      Body: fileData,
    };
    S3Client.upload(params, (err, data) => {
      if (err) {
        console.log('Error in uploadToS3 function :' + err.message);
        reject(err.message);
      }
      return resolve(data);
    });
  });
};
