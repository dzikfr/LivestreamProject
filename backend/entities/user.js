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
    },
    streamkey: {
      type: "varchar",
    },
  },
});

module.exports = { User };
