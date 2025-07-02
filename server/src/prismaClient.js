import { PrismaClient } from "./generated/prisma/client.js";
const prisma=new PrismaClient();


export default prisma;


// Imports the Prisma client.
// Creates an instance of Prisma (new PrismaClient()), which is your interface to run queries on your database.
// Exports that instance so you can use it throughout your project (in routes, services, etc.).