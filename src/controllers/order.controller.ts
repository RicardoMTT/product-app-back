import { Request, Response } from "express";
import { Transaction } from "sequelize/dist";
import db from "../database/models";

export const save = async (req: Request, res: Response) => {
  try {
    const { customer, order_details } = req.body;
    console.log("xd", customer, order_details);
    await db.sequelize.transaction(async (t: Transaction) => {
      return db.Customer.create(customer, { transaction: t }).then(
        async (customer) => {
          console.log(customer);
          const { id } = customer;
          // Para crear tanto order como orderDetails
          console.log(id);

          db.Order.create(
            { customerId: id, details: order_details },
            {
              include: {
                model: db.OrdersDetails,
                as: "details",
              },
            }
          );
        }
      );
    });
    return res.status(200).json({
      status: true,
    });
  } catch (error) {
    console.log("ERROR", error);

    return res.status(500).json({
      status: false,
    });
  }
};
