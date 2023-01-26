import { UploadedFile } from 'express-fileupload';
import { v4 as uuid } from "uuid";
import fsPromises from "fs/promises";
import path from 'path';
import fs from "fs";

// Images folder
const productImagesFolder = "./src/1-assets/images/";


// Save new image: 
async function saveImage(image: UploadedFile): Promise<string> {
    // Create unique image name: 
    const uniqueImageName = createImageName(image.name);
    // Create absolute path: 
    const absolutePath = productImagesFolder + uniqueImageName;
    // Save to disk: 
    await image.mv(absolutePath); // mv = move
    // Return new name: 
    return uniqueImageName;
}


// Update existing image:
async function updateImage(image: UploadedFile, existingImageName: string): Promise<string> {
    // Delete existing image: 
    await deleteImage(existingImageName);
    // Save new image to disk:
    const uniqueImageName = await saveImage(image);
    // Return unique name: 
    return uniqueImageName;
}


// Delete existing image:
async function deleteImage(existingImageName: string): Promise<void> {
    try {
        // If no image sent:
        if (!existingImageName) return;
        // Delete image from disk:
        await fsPromises.unlink(productImagesFolder + existingImageName);
    }
    catch (err: any) {
        console.error(err.message);
    }
}


function createImageName(originalImageName: string): string {
    // Take original extension: 
    const extension = originalImageName.substring(originalImageName.lastIndexOf("."));
    // Create unique name including original extension (v4 = 36 chars uuid):
    const uniqueImageName = uuid() + extension;
    // Return unique name:
    return uniqueImageName;
}


function getAbsolutePath(imageName: string): string {
    // If image exist:
    let absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
    // If image doesn't exist
    if (!fs.existsSync(absolutePath)) {
        absolutePath = path.join(__dirname, "..", "1-assets", "images", "not-found.png");
    }
    return absolutePath;
}


export default {
    saveImage,
    updateImage,
    deleteImage,
    getAbsolutePath
};

