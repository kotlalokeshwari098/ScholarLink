// This file is kept for backward compatibility
// The application now uses Prisma ORM for database operations
// See prismaClient.js for the Prisma client setup

import prisma from "../prismaClient.js";

console.log("Database connection: Using Prisma ORM");

// For backward compatibility, export prisma as pool
export default prisma;
