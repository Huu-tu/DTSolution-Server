import { Request, Response, NextFunction } from "express";
import Service from "../models/service.model";

export const getAllService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blogs = await Service.find();

    if (blogs && blogs.length > 0) {
      res.status(200).json(blogs);
    } else {
      res.status(404).json({
        message: "No services found.",
      });
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      res.status(400).json({
        message: "Invalid details provided.",
      });
    } else {
      res.status(500).json({
        message: "An error occurred while fetching services.",
        error: error.message
      });
    }
  }
};

export const getSingleService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await Service.findById(req.params.id)
      .select('title description tech image type createdAt');

    if (!data) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let title = req.body.title;
  let description = req.body.description;
  let tech = req.body.tech;
  let type = req.body.type;
  let image = req.file.filename;

  const data = await Service.create({
    title,
    description,
    tech,
    type,
    image,
  });

  if (data) {
    res.status(200).json('Success');
  } else {
    res.json('Failed');
  }
};
