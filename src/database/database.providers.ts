import {createConnection} from "typeorm";


export const databaseProviders = [
    {
        provide: "DbConnectionToken",
        useFactory: async () => await createConnection({
            type: "postgres",
            host: "db",
            port: parseInt(process.env.POSTGRES_PORT, 10),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD
        })
    }
];