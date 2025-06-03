import { Request, Response, NextFunction } from "express";
import Blog from "../models/blog.model";

export const getAllBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blogs = await Blog.find();

    if (blogs && blogs.length > 0) {
      res.status(200).json(blogs);
    } else {
      res.status(404).json({
        message: "No blogs found.",
      });
    }
  } catch (error: any) {
    console.error('Error in getAllBlog:', error);
    if (error.isJoi === true) {
      res.status(400).json({
        message: "Invalid details provided.",
      });
    } else {
      res.status(500).json({
        message: "An error occurred while fetching blogs.",
        error: error.message
      });
    }
  }
};

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  console.log(req.body)
};



