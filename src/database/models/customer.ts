import { Model, Sequelize, DataTypes, Optional } from "sequelize";

type DataType = typeof DataTypes;
// These are all the attributes in the User model
interface CustomerAttributes {
  id: number;
  name: string;
  lastName: string;
  email: string;
  address: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface CustomerCreationAttributes
  extends Optional<CustomerAttributes, "id"> {}

export default (sequelize: Sequelize, DataTypes: DataType) => {
  class Customer
    extends Model<CustomerAttributes, CustomerCreationAttributes>
    implements CustomerAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    public id!: number;
    public name!: string;
    public lastName!: string;
    public email!: string;
    public address!: string;

    static associate(models: any) {
      // define association here
      Customer.hasMany(models.Order, {
        foreignKey: {
          name: "customerId",
          allowNull: false,
        },
      });
    }
  }
  Customer.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "customers",
    }
  );
  return Customer;
};
