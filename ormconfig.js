module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "david00154",
  database: "podtube_db",
  synchronize: true,
  logging: true,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
