import { Injectable } from "@nestjs/common";
import { CreateUserinfoDto } from "./dto/create-userinfo.dto";
import { UpdateUserinfoDto } from "./dto/update-userinfo.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserinfoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserinfoDto: CreateUserinfoDto) {
    return this.prisma.user_Info.create({ data: createUserinfoDto });
  }

  findAll() {
    return this.prisma.user_Info.findMany();
  }

  findOneByUUID(uuid: string) {
    return this.prisma.user_Info.findUnique({ where: { user_uuid: uuid } });
  }

  findOneByUsername(username: string) {
    return this.prisma.user_Info.findUnique({ where: { username } });
  }

  update(uuid: string, updateUserinfoDto: UpdateUserinfoDto) {
    return this.prisma.user_Info.update({
      where: { user_uuid: uuid },
      data: updateUserinfoDto,
    });
  }

  remove(uuid: string) {
    return this.prisma.user_Info.delete({ where: { user_uuid: uuid } });
  }
}
