import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UserinfoService } from "./userinfo.service";
import { CreateUserinfoDto } from "./dto/create-userinfo.dto";
import { UpdateUserinfoDto } from "./dto/update-userinfo.dto";
import { userInfo } from "../types";
import { Gender } from "@prisma/client";
import { ApiTags, ApiBody, ApiOperation } from "@nestjs/swagger";
import { DatabaseException } from "src/common/exceptions";

@ApiTags("user-info")
@Controller("userInfo")
export class UserinfoController {
  constructor(private readonly userinfoService: UserinfoService) {}

  @ApiOperation({ summary: "Create a new userinfo" })
  @Post()
  @ApiBody({ type: userInfo })
  async create(@Body() userinfoData: userInfo) {
    const userInfoByUUID = await this.userinfoService.findOneByUUID(
      userinfoData.user_uuid
    );
    if (userInfoByUUID) {
      throw new DatabaseException("UserInfo is already created", 409);
    }

    const userInfoByUsername = await this.userinfoService.findOneByUsername(
      userinfoData.username
    );
    if (userInfoByUsername) {
      throw new DatabaseException("Username already taken", 409);
    }

    return this.userinfoService.create(
      userInfoToCreateUserinfoDto(userinfoData)
    );
  }

  @ApiOperation({ summary: "Get all userinfos" })
  @Get()
  async findAll() {
    return await this.userinfoService.findAll();
  }

  @ApiOperation({ summary: "Get userinfo by userid" })
  @Get(":uuid")
  async findOne(@Param("uuid") uuid: string) {
    return await this.userinfoService.findOneByUUID(uuid);
  }

  @ApiOperation({ summary: "Update userinfo by userid" })
  @Patch(":uuid")
  async update(@Param("uuid") uuid: string, @Body() userinfo: userInfo) {
    return await this.userinfoService.update(
      uuid,
      userInfoToUpdateUserinfoDto(uuid, userinfo)
    );
  }

  @ApiOperation({ summary: "Delete userinfo by userid" })
  @Delete(":uuid")
  async remove(@Param("uuid") uuid: string) {
    return await this.userinfoService.remove(uuid);
  }
}

// Function to convert userInfo entity to CreateUserinfoDto
export function userInfoToCreateUserinfoDto(
  userinfo: userInfo
): CreateUserinfoDto {
  const uuid = userinfo.user_uuid;
  delete userinfo.user_uuid;
  const createDto: CreateUserinfoDto = {
    ...userinfo,
    gender: Gender[userinfo.gender],
    User: {
      connect: {
        uuid: uuid,
      },
    },
  };
  return createDto;
}

export function userInfoToUpdateUserinfoDto(
  uuid: string,
  userinfo: userInfo
): UpdateUserinfoDto {
  const updateDto: UpdateUserinfoDto = {
    ...userinfo,
    gender: Gender[userinfo.gender],
    User: {
      connect: {
        uuid: uuid,
      },
    },
  };
  return updateDto;
}
