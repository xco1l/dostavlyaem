const config = {
  name: 'Postgre',
  connector: 'postgresql',
  url: `postgres://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASS ||
    'postgres'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT ||
    5432}/${process.env.DB_NAME || 'postgres'}`,
  host: `${process.env.DB_HOST}` || 'localhost',
  port: `${process.env.DB_PORT}` || 5432,
  user: `${process.env.DB_USER}` || 'postgres',
  password: `${process.env.DB_PASS}` || 'postgres',
  database: `${process.env.DB_NAME}` || 'postgres',
  ssl: false,
};

export default config;
