import { Request, Response, NextFunction } from "express";
import Consultation from "../models/consultation.model";

export const getAllConsultation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const consultations = await Consultation.find();

    if (consultations && consultations.length > 0) {
      res.status(200).json(consultations);
    } else {
      res.status(404).json({
        message: "No consultations found.",
      });
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      res.status(400).json({
        message: "Invalid details provided.",
      });
    } else {
      res.status(500).json({
        message: "An error occurred while fetching consultations.",
        error: error.message
      });
    }
  }
};

export const getSingleConsultation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await Consultation.findById(req.params.id)
      .select('name email phone topic description tech createdAt');

    if (!data) {
      res.status(404).json({ message: 'Consultation not found' });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const createConsultation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let topic = req.body.topic;
  let description = req.body.description;
  let tech = req.body.tech;

  const data = await Consultation.create({
    name,
    email,
    phone,
    topic,
    description,
    tech
  });

  if (data) {
    res.status(200).json('Success');
  } else {
    res.json('Failed');
  }
};
