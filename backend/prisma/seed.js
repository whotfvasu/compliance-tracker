import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {

  await prisma.task.deleteMany();
  await prisma.client.deleteMany();

  const client1 = await prisma.client.create({
    data: {
      name: "Acme Corp",
      country: "USA",
      entityType: "LLC",
    },
  });

  const client2 = await prisma.client.create({
    data: {
      name: "TechStart Inc",
      country: "Canada",
      entityType: "Corporation",
    },
  });

  await prisma.task.createMany({
    data: [
      {
        title: "Q1 Tax Filing",
        description: "File quarterly taxes",
        category: "Tax",
        dueDate: new Date("2025-04-15"),
        status: "Pending",
        priority: "High",
        clientId: client1.id,
      },
      {
        title: "Annual Audit",
        description: "Conduct annual financial audit",
        category: "Audit",
        dueDate: new Date("2025-03-30"),
        status: "Pending",
        priority: "High",
        clientId: client1.id,
      },
      {
        title: "Compliance Report",
        description: "Submit regulatory compliance report",
        category: "Compliance",
        dueDate: new Date("2025-02-28"),
        status: "Completed",
        priority: "Medium",
        clientId: client1.id,
      },
    ],
  });

  await prisma.task.createMany({
    data: [
      {
        title: "SOX Compliance",
        description: "Sarbanes-Oxley compliance review",
        category: "Compliance",
        dueDate: new Date("2025-04-01"),
        status: "In Progress",
        priority: "High",
        clientId: client2.id,
      },
      {
        title: "License Renewal",
        description: "Renew business licenses",
        category: "License",
        dueDate: new Date("2025-05-15"),
        status: "Pending",
        priority: "Medium",
        clientId: client2.id,
      },
    ],
  });

  console.log("Seeding complete ⏿");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
