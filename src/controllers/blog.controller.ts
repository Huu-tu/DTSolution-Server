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

export const getSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await Blog.findById(req.params.id)
      .select('title paragraph content image type createdAt');

    if (!data) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let title = req.body.title;
  let paragraph = req.body.paragraph;
  let content = req.body.content;
  let type = req.body.type;

  if (!req.file) {
    res.status(400).json({ message: "Image file is required." });
    return;
  }
  let image = req.file.filename;

  const data = await Blog.create({
    title,
    paragraph,
    content,
    type,
    image,
  });

  if (data) {
    res.status(200).json('Success');
  } else {
    res.json('Failed');
  }
};



