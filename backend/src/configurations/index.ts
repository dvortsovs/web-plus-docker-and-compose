export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt_secret: process.env.SECRET_JWT,
  jwt_expires: process.env.JWT_EXPIRES,
  db_host: process.env.POSTGRES_HOST,
  db_user: process.env.POSTGRES_USER,
  db_pass: process.env.POSTGRES_PASSWORD,
  db_port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  db_name: process.env.POSTGRES_DB,
});
