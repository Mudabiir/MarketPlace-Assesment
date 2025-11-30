import prisma from "../utils/prisma.js";


import { uploadOnCloudinary } from "../utils/cloudinary.js";

export async function createProduct(req, res) {
  const { name, price } = req.body;
  const sellerId = req.user?.userId;

  try {
    let files = [];

    // Accept both single & multiple files
    if (req.files?.length > 0) {
      files = req.files;
    } else if (req.file) {
      files = [req.file];
    }

    if (files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }


    const cloudinaryUploads = await Promise.all(
      files.map(async (file) => {
        const uploaded = await uploadOnCloudinary(file.path);
        return uploaded?.secure_url || null;
      })
    );

    const imageUrls = cloudinaryUploads.filter((url) => url !== null);

    if (imageUrls.length === 0) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        imageUrls,
        sellerId,
      },
    });


    res.status(201).json(product);

  } catch (err) {
    console.error("Create product error:", err);
    res.status(400).json({ error: err.message || "Bad request" });
  }
}




export async function getProductsOfSeller(req,res) {
    const userId=req.user.userId;    
    const page=parseInt(req.query.page)
    const limit=parseInt(req.query.limit)
    if(!userId){
        return res.status(404).json({ error: "user with id not found" });
    }
    const products=await prisma.product.findMany({where:{sellerId:userId},take:limit,skip:(page-1)*limit})
    return res.status(200).json({ products });
}



export async function getProducts(req,res) {
    const page=parseInt(req.query.page)
    const limit=parseInt(req.query.limit)
    const products=await prisma.product.findMany({take:limit,skip:(page-1)*limit})
    return res.status(200).json({ products });
}