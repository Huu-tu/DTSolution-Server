import { Request, Response, NextFunction } from "express";
import QRCode from 'qrcode';
import Order from "../models/order.model";
import Product from "../models/product.model";

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
    const { customerName, customerPhone, customerEmail, totalAmount } = req.body;

    // let totalAmount = 0;
    // const orderItems = [];

    // for (const item of items) {
    //   const product = await Product.findById(item.product);
    //   if (!product) {
    //     res.status(404).json({ error: 'Sản phẩm không tồn tại' });
    //     return;
    //   }
    //
    //   totalAmount += product.price * item.quantity;
    //   orderItems.push({
    //     product: product._id,
    //     quantity: item.quantity
    //   });
    // }

    const newOrder = new Order({
      customerName,
      customerPhone,
      customerEmail,
      items: totalAmount,
      totalAmount
    });

    await newOrder.save();

    const paymentInfo = {
      bankNumber: '109665391',
      bankName: 'Viettinbank',
      accountName: 'DO HUU TU',
      amount: totalAmount,
      note: `Thanh toan don hang ${newOrder._id}`
    };

    const qrContent = `STK: ${paymentInfo.bankNumber}
    Ngân hàng: ${paymentInfo.bankName}
    Chủ TK: ${paymentInfo.accountName}
    Số tiền: ${paymentInfo.amount}
    Nội dung: ${paymentInfo.note}`;

    const qrImage = await QRCode.toDataURL(qrContent);

    res.status(201).json({
      message: 'Đơn hàng đã được tạo. Vui lòng thanh toán.',
      order: newOrder,
      qrImage,
      paymentInfo
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

