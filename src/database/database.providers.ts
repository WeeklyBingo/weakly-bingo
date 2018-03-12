import {createConnection} from "typeorm";

export const databaseProviders = [
    {
        provide: "DbConnectionToken",
        useFactory: async () => await createConnection({
            type: "postgres",
            host: process.env.POSTGRES_HOST || "db",
            port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
            username: process.env.POSTGRES_USERNAME || "postgres",
            password: process.env.POSTGRES_PASSWORD || "postgres",
        }),
    },
];