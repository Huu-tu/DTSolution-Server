import { Request, Response, NextFunction } from "express";
import Solution from "../models/solution.model";

export const getAllSolution = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const solutions = await Solution.find();

    if (solutions && solutions.length > 0) {
      res.status(200).json(solutions);
    } else {
      res.status(404).json({
        message: "No solutions found.",
      });
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      res.status(400).json({
        message: "Invalid details provided.",
      });
    } else {
      res.status(500).json({
        message: "An error occurred while fetching solutions.",
        error: error.message
      });
    }
  }
};


export const getSingleSolution = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const singleSolution = await Solution.findById(req.params.id)
      .select('title description company image tech createdAt');

    if (!singleSolution) {
      res.status(404).json({ message: 'Solution not found' });
      return;
    }

    res.status(200).json(singleSolution);
  } catch (error) {
    next(error);
  }
};

export const createSolution = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let title = req.body.title;
  let description = req.body.description;
  let company = req.body.company;
  let tech = req.body.tech;

  if (!req.file) {
    res.status(400).json({ message: "Image file is required." });
    return;
  }
  let image = req.file.filename;

  const solution = await Solution.create({
    title,
    description,
    company,
    tech,
    image,
  });

  if (solution) {
    res.status(200).json('Success');
  } else {
    res.json('Failed');
  }
};