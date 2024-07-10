import { Injectable } from "@nestjs/common";
import { CreateUserEventDto } from "./dto/create-userEvent.dto";
import { UpdateUserEventDto } from "./dto/update-userEvent.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { User_Event_Status } from "@prisma/client";

@Injectable()
export class UserEventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserEventDto: CreateUserEventDto) {
    return await this.prisma.user_Event.create({
      data: createUserEventDto,
    });
  }

  async findAll() {
    return await this.prisma.user_Event.findMany();
  }

  async findOne(userid: string, eventid: number) {
    return await this.prisma.user_Event.findUnique({
      where: {
        user_uuid_event_id: {
          user_uuid: userid,
          event_id: eventid,
        },
      },
    });
  }
  async findManybyUser(userid: string) {
    return await this.prisma.user_Event.findMany({
      where: {
        user_uuid: userid,
      },
    });
  }

  async findManybyEvent(eventid: number) {
    return await this.prisma.user_Event.findMany({
      where: {
        event_id: eventid,
      },
    });
  }

  async update(updateUserEventDto: UpdateUserEventDto) {
    return await this.prisma.user_Event.update({
      where: {
        user_uuid_event_id: {
          user_uuid: updateUserEventDto.User.connect.uuid,
          event_id: updateUserEventDto.Event.connect.id,
        },
      },
      data: updateUserEventDto,
    });
  }

  async remove(userid: string, eventid: number) {
    return await this.prisma.user_Event.delete({
      where: {
        user_uuid_event_id: {
          user_uuid: userid,
          event_id: eventid,
        },
      },
    });
  }

  async countJoinedUsers(eventid: number) {
    const eventIdAsNumber = parseInt(eventid.toString());
    return await this.prisma.user_Event.count({
      where: {
        event_id: eventIdAsNumber,
        status: User_Event_Status.JOINED,
      },
    });
  }

  async getTotalFee(eventid: number) {
    return await this.prisma.user_Event.aggregate({
      where: {
        event_id: eventid,
      },
      _sum: {
        fee: true,
      },
    });
  }

  async getTop5Events() {
    const events = await this.prisma.event.findMany({
      where: {
        OR: [{ status: "ONGOING" }, { status: "DELAYED" }],
      },
      // Also return User_Event
      include: {
        User_Event: {
          where: {
            status: "JOINED",
          },
        },
      },
      orderBy: {
        User_Event: {
          _count: "desc",
        },
      },
    });
    return events.map((event) => {
      // Count the number of user_events and sum the fees
      const userEventStats = event.User_Event.reduce(
        (stats, userEvent) => {
          stats.count++;
          stats.totalFee += userEvent.fee;
          return stats;
        },
        { count: 0, totalFee: 0 }
      );
      delete event.User_Event;
      return {
        ...event,
        userEventStats,
      };
    });
  }
}
