import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "src/types/entities/user.entity";
import { User_Role } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { RoleGuard } from "src/common/guards/roles.guard";
import { DatabaseException } from "src/common/exceptions";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  @ApiOperation({ summary: "Create a new user" })
  @Post()
  async create(@Body() userData: User) {
    const user = await this.userService.findOneByEmail(userData.email);
    if (user) {
      throw new DatabaseException("Email already exists", 409);
    }

    const data = {
      ...userData,
      uuid: uuidv4(),
      password: await this.hashPassword(userData.password),
      role: User_Role.USER,
      isVerified: false,
    };

    return this.userService.create(userToCreateUserDto(data));
  }

  @ApiOperation({ summary: "Get all users" })
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: "Get my personal info" })
  @Get("me")
  @UseGuards(RoleGuard)
  async findMe(@Request() req) {
    const data = await this.userService.findOneWithInfo(req.user.uuid);

    return data;
  }

  @ApiOperation({ summary: "Get user from userid" })
  @Get(":uuid")
  async findOne(@Param("uuid") uuid: string) {
    return await this.userService.findOne(uuid);
  }

  @ApiOperation({ summary: "Update user from userid" })
  @Patch(":uuid")
  async update(@Param("uuid") uuid: string, @Body() updateUser: User) {
    return await this.userService.update(uuid, userToCreateUserDto(updateUser));
  }

  @ApiOperation({ summary: "Delete a user by userid" })
  @Delete(":uuid")
  async remove(@Param("uuid") uuid: string) {
    return await this.userService.remove(uuid);
  }
}

// Function to convert User entity to CreateUserDto
export function userToCreateUserDto(user: User): CreateUserDto {
  const createUserDto: CreateUserDto = {
    ...user,
    role: User_Role[user.role],
  };
  return createUserDto;
}

// Function to convert User entity to UpdateUserDto
export function userToUpdateUserDto(user: User): UpdateUserDto {
  const updateUserDto: UpdateUserDto = {
    ...user,
    role: User_Role[user.role],
  };
  return updateUserDto;
}
