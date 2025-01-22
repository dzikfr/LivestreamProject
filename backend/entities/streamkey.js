const { EntitySchema } = require("typeorm");

const Streamkey = new EntitySchema({
  name: "Streamkey",
  tableName: "streamkey",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    key: {
      type: "varchar",
    },
    userId: {
      type: "int",
      nullable: true,
      default: null,
    },
  },
  relations: {
    user: {
      target: "User",
      type: "one-to-one",
      joinColumn: {
        name: "userId",
      },
    },
  },
});

module.exports = { Streamkey };
