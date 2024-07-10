import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserFanbaseService } from "src/userFanbase/userFanbase.service";

@Injectable()
export class SearchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userFanbaseService: UserFanbaseService
  ) {}

  async search(userid: string, query: string, isfollowed: boolean) {
    return {
      fanbases: await this.searchFanbase(userid, query, isfollowed),
      events: await this.searchEvent(userid, query, isfollowed),
    };
  }

  async searchFanbase(userid: string, query: string, isfollowed: boolean) {
    let fanbases;
    if (isfollowed) {
      fanbases = await this.prisma.fanbase.findMany({
        include: {
          fanbase_info: true,
        },
        where: {
          fanbase_info: {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          User_Fanbase: {
            some: {
              user_uuid: userid,
            },
          },
        },
      });
    } else {
      fanbases = await this.prisma.fanbase.findMany({
        include: {
          fanbase_info: true,
        },
        where: {
          OR: {
            fanbase_info: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        },
      });
    }
    //count folllowers
    for (let i = 0; i < fanbases.length; i++) {
      fanbases[i]["follower"] =
        await this.userFanbaseService.CountFanbaseFollwerByFanbaseID(
          fanbases[i].id
        );
    }
    //search for admin
    for (let i = 0; i < fanbases.length; i++) {
      const admin = await this.userFanbaseService.findAll({
        fanbase_id: fanbases[i].id,
        role: "ADMIN",
      });
      fanbases[i]["admin_uuid"] = admin[0]["user_uuid"];
    }
    return fanbases;
  }

  async searchEvent(userid: string, query: string, isfollowed: boolean) {
    let events;
    if (isfollowed) {
      events = await this.prisma.event.findMany({
        where: {
          title: {
            contains: query,
            mode: "insensitive",
          },
          Fanbase: {
            User_Fanbase: {
              some: {
                user_uuid: userid,
              },
            },
          },
        },
        include: {
          User_Event: true,
          Fanbase: {
            include: {
              fanbase_info: {
                select: {
                  name: true,
                  img_url: true,
                  twitter_url: true,
                  facebook_url: true,
                  instagram_url: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      events = await this.prisma.event.findMany({
        where: {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        include: {
          User_Event: true,
          Fanbase: {
            include: {
              fanbase_info: {
                select: {
                  name: true,
                  img_url: true,
                  twitter_url: true,
                  facebook_url: true,
                  instagram_url: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
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
}
