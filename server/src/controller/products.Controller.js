import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  getProductsByCatId,
  getProductsByName,
  updateProduct,
} from "../model/products.Model.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
// in success => send message AND data,
// in error => send message only
export const createProductController = async (req, res) => {
  try {
    let { name, price, stock, catId, description } = req.body;
    const { id, role } = req.user;

    // 1. Verify a file was actually caught by your multer parser
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file." });
    }

    // 2. UNCOMMENTED CLOUDINARY UPLOAD: Pass the buffer to Cloudinary to generate a real URL string
    let image_url = "";
    let image_public_id = "";

    try {
      const imageCloudinary = await uploadToCloudinary(req.file.buffer);
      image_url = imageCloudinary.secure_url;
      image_public_id = imageCloudinary.public_id; // Fixed typo: publid_id -> public_id
    } catch (uploadError) {
      console.error("Cloudinary upload failure:", uploadError);
      return res.status(500).json({ message: "Image upload failed. Please try again." });
    }

    let status = role === "admin" ? "approved" : "pending";

    price = Number(price);
    stock = Math.round(Number(stock));

    // 3. FIXED ASSIGNMENTS: Save the actual generated string data variables
    const product = await createProduct({
      name,
      price,
      stock,
      image_url: image_url,        // Now saving a secure remote string url ("https://...")
      image_public_id: image_public_id, // Saving the real unique asset reference ID string
      catId,
      createdBy: id,
      status,
      description,
    });

    if (!product) {
      return res.status(400).json({
        message: "Something went wrong while creating new products, please try again",
      });
    }

    return res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Controller core crash error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProducts();
    // [{}, {}, {}]
    if (products.length === 0) {
      return res.status(200).json({ message: "No products Yet", products: [] });
    }
    return res.status(200).json({ message: "fetch products", products });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);


    // {}
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    return res.status(200).json({ message: "fetch product", product });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
export const getProductsByCatIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await getProductsByCatId(id);



    if (products.length === 0) {
      return res
        .status(200)
        .json({ message: "no cproducts for this category yet", products: [] });
    }
    return res.status(200).json({ message: "fetch product", products });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
export const getProductsByNameController = async (req, res) => {
  try {
    const { name, page } = req.query;
    const products = await getProductsByName(name, page);
    // [{}, {}, {}]
    if (products.length === 0) {
      const allproducts = await getAllProducts();
      return res.status(200).json({ message: "found", allproducts });
    }
    return res.status(200).json({ message: "fetch product", products });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
export const deleteProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await deleteProductById(id);
    // {}
    if (!product) {
      return res.status(404).json({ message: "product not found to delet" });
    }
    return res.status(200).json({ message: "deleted product" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const updateProductByIdController = async (req, res) => {
  try {
    const { id, role } = req.user;
    const productId = req.params;
    const { name, price, stock, image, description, catId } = req.body;

    let status;
    if (role === "admin") {
      status = "approved";
    } else {
      status = "pending";
    }

    const theProdcuts = await getProductById(productId);
    if (!theProdcuts) {
      return res.status(404).json({ message: "product not found" });
    }
    const newProduc = {
      name: name || theProdcuts.name,
      price: price || theProdcuts.price,
      stock: stock || theProdcuts.stock,
      image: image || theProdcuts.image,
      description: description || theProdcuts.description,
      catId: catId || theProdcuts.catId,
      updatedBy: id,
      status: status,
    };
    const updated = await updateProduct(
      productId,
      name,
      price,
      stock,
      image,
      description,
      catId,
      updatedBy,
      status,
    );
    if (!updated) {
      return res.status(400).json({
        message:
          "something went wrong while updated new products, please try again",
      });
    }
    return res.status(200).json({ message: "updated successfully", updated });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
