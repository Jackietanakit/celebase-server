import { Injectable } from "@nestjs/common";
import { CreateFanbaseinfoDto } from "./dto/create-fanbaseinfo.dto";
import { UpdateFanbaseinfoDto } from "./dto/update-fanbaseinfo.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FanbaseinfoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFanbaseinfoDto: CreateFanbaseinfoDto) {
    return this.prisma.fanbase_Info.create({ data: createFanbaseinfoDto });
  }

  findAll() {
    return this.prisma.fanbase_Info.findMany();
  }

  findOne(fanbaseId: number) {
    return this.prisma.fanbase_Info.findUnique({
      where: { fanbase_id: fanbaseId },
    });
  }

  update(fanbaseId: number, updateFanbaseinfoDto: UpdateFanbaseinfoDto) {
    return this.prisma.fanbase_Info.update({
      where: { fanbase_id: fanbaseId },
      data: updateFanbaseinfoDto,
    });
  }

  remove(fanbaseId: number) {
    return this.prisma.fanbase_Info.delete({
      where: { fanbase_id: fanbaseId },
    });
  }

  findAllAToZ() {
    return this.prisma.fanbase_Info.findMany({
      include: {
        Fanbase: true,
      },
      orderBy: {
        name: 'asc'
      }
    });
  }
}
