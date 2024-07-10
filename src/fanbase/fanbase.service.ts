import { Injectable } from "@nestjs/common";
import { CreateFanbaseDto } from "./dto/create-fanbase.dto";
import { UpdateFanbaseDto } from "./dto/update-fanbase.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UserFanbaseService } from "src/userFanbase/userFanbase.service";

@Injectable()
export class FanbaseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userFanbaseService: UserFanbaseService
  ) {}

  async create(createFanbaseDto: CreateFanbaseDto) {
    return await this.prisma.fanbase.create({ data: createFanbaseDto });
  }

  async findOne(id: number) {
    const fanbase = await this.prisma.fanbase.findUnique({ where: { id } });
    fanbase["follower"] =
      await this.userFanbaseService.CountFanbaseFollwerByFanbaseID(id);
    return fanbase;
  }

  async findOneByFbusername(fbusername: string) {
    return await this.prisma.fanbase.findUnique({
      where: { fbusername },
    });
  }

  async findAll() {
    const fanbases = await this.prisma.fanbase.findMany();
    for (let i = 0; i < fanbases.length; i++) {
      fanbases[i]["follower"] =
        await this.userFanbaseService.CountFanbaseFollwerByFanbaseID(
          fanbases[i].id
        );
    }
    return fanbases;
  }

  async update(id: number, updateFanbaseDto: UpdateFanbaseDto) {
    return await this.prisma.fanbase.update({
      where: { id },
      data: updateFanbaseDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.fanbase.delete({ where: { id } });
  }

  async findAllAToZ() {
    return await this.prisma.fanbase.findMany({
      include: {
        fanbase_info: true,
      },
      orderBy: {
        fbusername: "asc",
      },
    });
  }
}
