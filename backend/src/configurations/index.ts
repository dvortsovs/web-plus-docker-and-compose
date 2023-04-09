export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt_secret: process.env.SECRET_JWT || 'some_secret_key',
  jwt_expires: process.env.JWT_EXPIRES || '12h',
  db_host: process.env.POSTGRES_HOST || 'localhost',
  db_user: process.env.POSTGRES_USER || 'student',
  db_pass: process.env.POSTGRES_PASSWORD || 'student',
  db_port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  db_name: process.env.POSTGRES_DB || 'kupipodariday',
});
