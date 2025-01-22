const { EntitySchema } = require("typeorm");

const Video = new EntitySchema({
  name: "Video",
  tableName: "video",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    video_name: {
      type: "varchar",
    },
    viewcount: {
      type: "int",
    },
    playbacklink: {
      type: "varchar",
    },
    created_date: {
      type: "timestamp",
      createDate: true,
    },
    userId: {
      type: "int",
    },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "userId",
      },
    },
  },
});

module.exports = { Video };
