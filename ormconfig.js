
function getConfig() {
  if (process.env.NODE_ENV !== 'production') {
    return {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "exchange",
      password: "exchange",
      database: "exchange",
      entities: [`dist/**/**.entity{.ts,.js}`],
      synchronize: true,
      logging: true,
    }
  }

  return {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [`dist/**/**.entity{.ts,.js}`],
    synchronize: true,
  }
}

module.exports = getConfig();
