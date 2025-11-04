// src/frameworks/database/prisma.service.ts
import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient {
  async connectDB() {
    try {
      await this.$connect();
      console.log("✅ Database connected successfully");
    } catch (error) {
      console.error("❌ Database connection failed:", error);
      throw new Error("Database connection failed");
    }
  }
}
