const { EntitySchema } = require("typeorm");

const Log = new EntitySchema({
  name: "Log",
  tableName: "log",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
    },
    activity: {
      type: "varchar",
    },
    detail: {
      type: "varchar",
      default: "",
    },
    created_date: {
      type: "timestamp",
      createDate: true,
    },
  },
});

module.exports = { Log };
