import { Request, Response, NextFunction } from "express";
import axios from 'axios';
import Order from "../models/order.model";

export const getAllOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await Order.find();

    if (orders && orders.length > 0) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({
        message: "No orders found.",
      });
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      res.status(400).json({
        message: "Invalid details provided.",
      });
    } else {
      res.status(500).json({
        message: "An error occurred while fetching orders.",
        error: error.message
      });
    }
  }
};


export const orderProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { customerName, customerPhone, customerEmail, totalAmount, status } = req.body;

    console.log(totalAmount)

    const newOrder = new Order({
      customerName,
      customerPhone,
      customerEmail,
      totalAmount,
      status
    });

    await newOrder.save();

    const bankNumber = '109868658391';
    const accountName = 'DO HUU TU';
    const acqId = 970415;

    const response = await axios.post(
      'https://api.vietqr.io/v2/generate',
      {
        accountNo: bankNumber,
        accountName: accountName,
        acqId: acqId,
        amount: totalAmount + "0",
        addInfo: `Thanh toan don hang ${newOrder._id}`,
        template: 'print'
      },
      {
        headers: {
          'x-client-id': '240dc0ed-37de-4f03-854d-c8abd94453a0',
          'x-api-key': '2bc53799-f7c5-43af-aa67-8752b6f45b4b',
          'Content-Type': 'application/json'
        }
      }
    );

    const qrImage = response.data.data.qrDataURL;

    res.status(201).json({
      message: 'Đơn hàng đã được tạo. Vui lòng thanh toán.',
      order: newOrder,
      qrImage,
      paymentInfo: {
        bankNumber,
        accountName,
        acqId,
        amount: totalAmount,
        note: `Thanh toan don hang ${newOrder._id}`
      }
    });

  } catch (error) {
    next(error);
  }
};

export const orderComplete = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({ error: 'Đơn hàng không tồn tại' });
      return;
    }

    order.status = 'completed';
    await order.save();

    res.json({ message: 'Thanh toán thành công. Đơn hàng đã hoàn tất.', order });
  } catch (error) {
    next(error);
  }
};

