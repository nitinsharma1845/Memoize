import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

export const uploadToCloudinary = async (localpath, userId = null) => {
  cloudinary.config({
    api_key: process.env.CLOUDINARY_API,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const options = {
      resource_type: "auto",
      invalidate: true,
      overwrite: true,
      public_id: `avatar_${userId}_${uuidv4()}`
    };

    const file = await cloudinary.uploader.upload(localpath, options);

    return file.secure_url; // always return secure_url with version param
  } catch (error) {
    console.log("Cloudinary Error ::", error);
    throw error;
  } finally {
    try {
      await fs.unlink(localpath);
    } catch (error) {
      console.error("Error deleting temp file:", error);
    }
  }
};
