import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(uuid: string) {
    return this.prisma.user.findUnique({ where: { uuid: uuid } });
  }

  findOneWithInfo(uuid: string) {
    return this.prisma.user.findUnique({
      where: { uuid: uuid },
      include: { User_Info: true },
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email: email } });
  }

  update(uuid: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { uuid: uuid },
      data: updateUserDto,
    });
  }

  remove(uuid: string) {
    return this.prisma.user.delete({ where: { uuid: uuid } });
  }
}
