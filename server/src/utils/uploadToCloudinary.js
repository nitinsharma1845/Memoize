import { v2 as clodinary } from "cloudinary";
import fs from "fs/promises";

export const uploadToClodinary = async (localpath) => {
  clodinary.config({
    api_key: process.env.CLOUDINARY_API,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const file = await clodinary.uploader.upload(localpath, {
      resource_type: "auto",
    });
    // console.log(file);
    return file?.url;
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
