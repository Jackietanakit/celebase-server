import {
  Event_Status,
  Event_Type,
  PrismaClient,
  User_Role,
} from "@prisma/client";
import { CreateEventDto } from "src/event/dto/create-event.dto";

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const dev1 = await prisma.user.upsert({
    where: { uuid: "ee4e4193-0c14-4227-89cf-c111435de647" },
    update: {
      password: "qwerqwer",
      email: "jackie@celebase.com",
      isVerified: true,
      verificationCode: null,
    },
    create: {
      uuid: "this-is-uuid-for-user-1",
      password: "Sqwert",
      email: "user1@gmail.com",
      isVerified: false,
      role: User_Role.USER,
      verificationCode: null,
    },
  });
  const user2 = await prisma.user.upsert({
    where: { uuid: "this-is-uuid-for-user-2" },
    update: {
      password: "yuiop",
      email: "user2@gmail.com",
      isVerified: false,
      verificationCode: null,
    },
    create: {
      uuid: "this-is-uuid-for-user-2",
      password: "yuiop",
      email: "user2@gmail.com",
      role: User_Role.USER,
      isVerified: false,
      verificationCode: null,
    },
  });
  const user_fanbase1 = await prisma.user_Fanbase.upsert({
    where: {
      user_uuid_fanbase_id: {
        user_uuid: "this-is-uuid-for-user-1",
        fanbase_id: 0,
      },
    },
    update: {},
    create: {
      User: { connect: { uuid: "this-is-uuid-for-user-1" } },
      Fanbase: { connect: { id: 0 } },
    },
  });
  const fanbase1 = await prisma.fanbase.upsert({
    where: { id: 0 },
    update: {
      fbusername: "PhuwinSexyTime",
    },
    create: {
      id: 0,
      fbusername: "PhuwinSexyTime",
    },
  });
  const eventData: CreateEventDto = {
    title: "Phuwin farting session",
    start: new Date("2023-08-15T12:00:00Z"),
    location: "Everywhere",
    description: "Phuwin's Group farting session starts at 3pm",
    img_url: "https://example.com/summer-festival.jpg",
    cover_img_url: "https://example.com/summer-festival-cover.jpg",
    status: Event_Status.ONGOING,
    type: Event_Type.FREE,
    max_capacity: 500,
    max_fee: 0,
    Fanbase: {
      connect: {
        id: 0, // ID of an existing Fanbase record
      },
    },
  };
  console.log(dev1, user2, user_fanbase1, fanbase1, eventData);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
