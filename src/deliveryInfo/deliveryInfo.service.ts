import { Injectable } from "@nestjs/common";
import { CreateDeliveryinfoDto } from "./dto/create-deliveryInfo.dto";
import { UpdateDeliveryinfoDto } from "./dto/update-deliveryInfo.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DeliveryinfosService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createDeliveryinfoDto: CreateDeliveryinfoDto) {
    return await this.prisma.delivery_Info.create({
      data: createDeliveryinfoDto,
    });
  }

  async findAll(queryData: any) {
    return await this.prisma.delivery_Info.findMany({
      where: {
        ...queryData,
      },
      include: {
        User: {
          select: {
            User_Info: {
              select: {
                user_uuid: true,
                username: true,
              },
            },
          },
        },
        Event: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.delivery_Info.findUnique({
      where: { id: id },
      include: {
        User: {
          select: {
            User_Info: {
              select: {
                user_uuid: true,
                username: true,
              },
            },
          },
        },
        Event: true,
      },
    });
  }

  async findOneByTrackingNo(tracking_no: string) {
    return await this.prisma.delivery_Info.findUnique({
      where: { tracking_no: tracking_no },
    });
  }

  async update(id: number, updateDeliveryinfoDto: UpdateDeliveryinfoDto) {
    return await this.prisma.delivery_Info.update({
      where: { id: id },
      data: updateDeliveryinfoDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.delivery_Info.delete({ where: { id: id } });
  }
}
