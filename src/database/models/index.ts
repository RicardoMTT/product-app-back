const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

import customerModel from "./customer";
import orderModel from "./order";
import ordersDetailsModel from "./order_detalle";

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = {
  sequelize,
  Sequelize,
  Customer: customerModel(sequelize, Sequelize.DataTypes),
  Order: orderModel(sequelize, Sequelize.DataTypes),
  OrdersDetails: ordersDetailsModel(sequelize, Sequelize.DataTypes),
};

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

Object.values(db).forEach((modelName: any) => {
  if (modelName.associate) {
    modelName.associate(db);
  }
});

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

export default db;
