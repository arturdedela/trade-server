
function getConfig() {
  if (process.env.NODE_ENV !== 'production') {
    return {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "trade-broker",
      password: "trade-broker",
      database: "trade",
      entities: [`dist/**/**.entity{.ts,.js}`],
      synchronize: true,
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
