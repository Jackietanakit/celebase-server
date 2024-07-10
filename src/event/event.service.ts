import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { custom_sort } from "src/common/utils/sort-by-date";
import { DatabaseException } from "src/common/exceptions";

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    return await this.prisma.event.create({ data: createEventDto });
  }

  async findAll() {
    const events = await this.prisma.event.findMany({
      include: {
        User_Event: true,
        Fanbase: {
          include: {
            fanbase_info: true,
          },
        },
      },
    });

    if (!events) {
      throw new DatabaseException("Events not found", 404);
    }

    const promises = events.map((event) => {
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
    return promises;
  }

  async findOne(id: number) {
    const event = await this.prisma.event.findUnique({
      where: { id: Number(id) },
      include: {
        User_Event: true,
        Fanbase: {
          include: {
            fanbase_info: true,
          },
        },
      },
    });
    if (!event) {
      throw new DatabaseException("Event not found", 404);
    }
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
  }

  async findManyByFanbaseId(fanbase_id: number) {
    const events = await this.prisma.event.findMany({
      where: { fanbase_id: fanbase_id },
      include: {
        User_Event: true,
        Fanbase: {
          include: {
            fanbase_info: true,
          },
        },
      },
    });

    if (!events) {
      throw new DatabaseException("Events not found", 404);
    }
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

  async update(id: number, updateEventDto: UpdateEventDto) {
    return await this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.event.delete({ where: { id } });
  }

  async findFollowedFanbaseEventByUUID(uuid: string) {
    const followedFanbase = await this.prisma.user_Fanbase.findMany({
      where: {
        user_uuid: uuid,
        role: "FOLLOWER",
      },
      include: {
        Fanbase: {
          include: {
            Event: {
              include: {
                Fanbase: {
                  include: {
                    fanbase_info: true,
                  },
                },
                User_Event: true,
              },
            },
          },
        },
      },
    });
    if (!followedFanbase) {
      throw new DatabaseException("Followed fanbase not found", 404);
    }
    const temp = followedFanbase.map((user_fanbase) => {
      return user_fanbase.Fanbase.Event.map((event) => {
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
    });
    const data = temp.flat().sort(custom_sort);
    return data;
  }
}
