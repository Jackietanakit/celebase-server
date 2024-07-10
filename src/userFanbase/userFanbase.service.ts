import { Injectable } from "@nestjs/common";
import { CreateUserFanbaseDto } from "./dto/create-userFanbase.dto";
import { UpdateUserFanbaseDto } from "./dto/update-userFanbase.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Fanbase, User_Fanbase_Role } from "@prisma/client";

@Injectable()
export class UserFanbaseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserFanbaseDto: CreateUserFanbaseDto) {
    return await this.prisma.user_Fanbase.create({
      data: createUserFanbaseDto,
    });
  }

  async findAll(queryData: any) {
    if (queryData) {
      return await this.prisma.user_Fanbase.findMany({
        where: { ...queryData },
      });
    }
    return await this.prisma.user_Fanbase.findMany();
  }

  async findOne(userId: string, eventId: number) {
    return await this.prisma.user_Fanbase.findUnique({
      where: {
        user_uuid_fanbase_id: {
          user_uuid: userId,
          fanbase_id: eventId,
        },
      },
    });
  }

  async findManybyUser(userId: string) {
    return await this.prisma.user_Fanbase.findMany({
      where: {
        user_uuid: userId,
      },
    });
  }

  async findManybyFanbase(fanbaseId: number) {
    return await this.prisma.user_Fanbase.findMany({
      where: {
        fanbase_id: fanbaseId,
      },
    });
  }

  async update(updateUserFanbaseDto: UpdateUserFanbaseDto) {
    return await this.prisma.user_Fanbase.update({
      where: {
        user_uuid_fanbase_id: {
          user_uuid: updateUserFanbaseDto.User.connect.uuid,
          fanbase_id: updateUserFanbaseDto.Fanbase.connect.id,
        },
      },
      data: updateUserFanbaseDto,
    });
  }

  async remove(userId: string, eventId: number) {
    return await this.prisma.user_Fanbase.delete({
      where: {
        user_uuid_fanbase_id: {
          user_uuid: userId,
          fanbase_id: eventId,
        },
      },
    });
  }

  async getFanbaseInfoByFollowers(): Promise<Fanbase[]> {
    const fanbases = await this.prisma.fanbase.findMany({
      include: {
        fanbase_info: true,
      },
    });
    const fanbaseFollowerCounts = await this.CountsFanbaseFollower();
    fanbases.sort(
      (a, b) =>
        (fanbaseFollowerCounts.get(b.id) || 0) -
        (fanbaseFollowerCounts.get(a.id) || 0)
    );
    return fanbases;
  }

  async CountsFanbaseFollower(): Promise<Map<number, number>> {
    const fanbaseFollowers = await this.prisma.user_Fanbase.groupBy({
      by: ["fanbase_id"],
      where: {
        role: User_Fanbase_Role.FOLLOWER,
      },
      _count: {
        fanbase_id: true,
      },
    });
    return new Map(
      fanbaseFollowers.map((f) => [f.fanbase_id, f._count.fanbase_id])
    );
  }

  async CountFanbaseFollwerByFanbaseID(id: number): Promise<number> {
    const count = await this.prisma.user_Fanbase.count({
      where: {
        fanbase_id: id,
      },
    });
    return count;
  }

  async findFollowedFanbaseInfoByUuid(uuid: string): Promise<any> {
    const followedFanbase = await this.prisma.user_Fanbase.findMany({
      where: {
        user_uuid: uuid,
        role: "FOLLOWER",
      },
    });
    const promises = followedFanbase.map(async (fanbase) => {
      return await this.prisma.fanbase_Info.findUnique({
        where: {
          fanbase_id: fanbase.fanbase_id,
        },
      });
    });
    const data = await Promise.all(promises);
    return data;
  }
}
