import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  Param,
} from "@nestjs/common";
import { UserFanbaseService } from "./userFanbase.service";
import { CreateUserFanbaseDto } from "./dto/create-userFanbase.dto";
import { UpdateUserFanbaseDto } from "./dto/update-userFanbase.dto";
import { UserFanbase } from "src/types/entities/userFanbase.entity";
import { Fanbase, User_Fanbase_Role } from "@prisma/client";
import { ApiQuery, ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("user-fanbase")
@Controller("user-fanbase")
export class UserFanbaseController {
  constructor(private readonly userFanbaseService: UserFanbaseService) {}

  @ApiOperation({
    summary: "Return the followed Fanbase_Info for the given user UUID.",
  })
  @Get(":uuid/followedfanbase")
  async findFanbaseInfoByUserUuid(@Param("uuid") uuid: string) {
    return await this.userFanbaseService.findFollowedFanbaseInfoByUuid(uuid);
  }

  @ApiOperation({ summary: "Creates new User_Fanbase" })
  @Post()
  create(@Body() userfanbase: UserFanbase) {
    return this.userFanbaseService.create(
      userFanbaseToCreateUserFanbaseDto(userfanbase)
    );
  }

  @ApiOperation({
    summary: "Returns all User_Fanbase (Query by uuid or fanbase_id or both)",
  })
  @Get()
  @ApiQuery({ name: "userid", required: false })
  @ApiQuery({ name: "fanbaseid", required: false })
  @ApiQuery({ name: "role", required: false })
  findAll(
    @Query("userid") userId?: string,
    @Query("fanbaseid") fanbaseId?: string,
    @Query("role") role?: User_Fanbase_Role
  ) {
    const queryData = {};
    if (userId) {
      queryData["user_uuid"] = userId;
    }
    if (fanbaseId) {
      queryData["fanbase_id"] = +fanbaseId;
    }
    if (role) {
      queryData["role"] = role;
    }
    return this.userFanbaseService.findAll(queryData);
  }

  @Patch()
  @ApiOperation({
    summary: "Update User_Fanbase by uuid and fanbase_id",
    description: "Note : Userid and fanbaseid is required in the body",
  })
  update(@Body() updatedUserFanbase: UserFanbase) {
    return this.userFanbaseService.update(
      userFanbaseToUpdateUserFanbaseDto(updatedUserFanbase)
    );
  }

  @Delete()
  @ApiOperation({ summary: "Delete User_Fanbase by uuid and fanbase_id" })
  remove(
    @Query("userid") userId: string,
    @Query("fanbaseid") fanbaseId: string
  ) {
    return this.userFanbaseService.remove(userId, +fanbaseId);
  }

  @ApiOperation({
    summary:
      "Get Fanbase_Info sort by number of followers (from most to least)",
  })
  @Get("fanbase-info/byfollowers")
  async getFanbaseInfoByFollowers(): Promise<Fanbase[]> {
    return this.userFanbaseService.getFanbaseInfoByFollowers();
  }
}

export function userFanbaseToCreateUserFanbaseDto(
  userFanbase: UserFanbase
): CreateUserFanbaseDto {
  const createUserFanbaseDto: CreateUserFanbaseDto = {
    User: { connect: { uuid: userFanbase.uuid } },
    Fanbase: { connect: { id: userFanbase.fanbaseId } },
    role: User_Fanbase_Role[userFanbase.role],
  };
  return createUserFanbaseDto;
}

export function userFanbaseToUpdateUserFanbaseDto(
  userFanbase: UserFanbase
): UpdateUserFanbaseDto {
  const updateUserFanbaseDto: UpdateUserFanbaseDto = {
    role: User_Fanbase_Role[userFanbase.role],
    User: { connect: { uuid: userFanbase.uuid } },
    Fanbase: { connect: { id: userFanbase.fanbaseId } },
  };
  return updateUserFanbaseDto;
}
