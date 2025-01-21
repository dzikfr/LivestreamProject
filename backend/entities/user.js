const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
    streamlink: {
      type: "varchar",
      default: "",
    },
    streamkey: {
      type: "varchar",
      default: "",
    },
  },
});

module.exports = { User };
