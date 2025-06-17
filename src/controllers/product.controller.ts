import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model";

export const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await Product.find();

    if (products && products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({
        message: "No products found.",
      });
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      res.status(400).json({
        message: "Invalid details provided.",
      });
    } else {
      res.status(500).json({
        message: "An error occurred while fetching products.",
        error: error.message
      });
    }
  }
};

export const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id)
      .select('title description price tech image createdAt');

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {title, description, tech, price} = req.body;

  if (!req.file) {
    res.status(400).json({ message: "Image file is required." });
    return;
  }
  let image = req.file.filename;

  const product = await Product.create({
    title,
    description,
    tech,
    price,
    image,
  });

  if (product) {
    res.status(200).json('Success');
  } else {
    res.json('Failed');
  }
};
