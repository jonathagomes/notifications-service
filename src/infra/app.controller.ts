import { Controller, Get, Post, Body } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { randomUUID } from "node:crypto";
import { CreateNotificationBody } from "./create-notification-body";

@Controller("notifications") // http://localhost:3000/notifications/...
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get() // @Get("hello") http://localhost:3000/notifications/hello
  list() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;

    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }
}
