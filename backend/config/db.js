const { DataSource } = require("typeorm");
const { User } = require("../entities/user");
const dotenv = require("dotenv");
const path = require("path"); // Add this line since you're using path
const { Log } = require("../entities/log");
const { Streamkey } = require("../entities/streamkey");
const { Video } = require("../entities/video");

dotenv.config({ path: path.join(__dirname, "../.env") });

const apiDataSource = new DataSource({
  type: "postgres",
  host: process.env.SUPABASE_HOST,
  port: 5432,
  username: process.env.SUPABASE_USERNAME,
  password: process.env.SUPABASE_PASS,
  database: process.env.SUPABASE_DBNAME,
  synchronize: true,
  logging: true,
  entities: [User, Log, Streamkey, Video],
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = { apiDataSource };
