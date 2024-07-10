import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { FanbaseService } from "./fanbase.service";
import { CreateFanbaseDto } from "./dto/create-fanbase.dto";
import { UpdateFanbaseDto } from "./dto/update-fanbase.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { Fanbase } from "src/types/entities/fanbase.entity";
import { UserFanbaseService } from "src/userFanbase/userFanbase.service";
import { DatabaseException } from "src/common/exceptions";

@ApiTags("fanbase")
@Controller("fanbase")
export class FanbaseController {
  constructor(
    private readonly fanbaseService: FanbaseService,
    private readonly userFanbaseService: UserFanbaseService
  ) {}

  @ApiOperation({ summary: "Create Fanbase" })
  @Post()
  async create(@Body() data: Fanbase) {
    const fanbase = await this.fanbaseService.findOneByFbusername(
      data.fbusername
    );
    if (fanbase) {
      throw new DatabaseException("Fanbase username is already taken", 409);
    }

    return await this.fanbaseService.create(fanbaseToCreateFanbaseDto(data));
  }

  @ApiOperation({ summary: "Get all Fanbase" })
  @Get()
  async findAll() {
    const fanbases = await this.fanbaseService.findAll();
    for (let i = 0; i < fanbases.length; i++) {
      const admin = await this.userFanbaseService.findAll({
        fanbase_id: fanbases[i].id,
        role: "ADMIN",
      });
      fanbases[i]["admin_uuid"] = admin[0]["user_uuid"];
    }
    return fanbases;
  }

  @ApiOperation({ summary: "Get Fanbase by fanbase_id" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const admin = await this.userFanbaseService.findAll({
      fanbase_id: +id,
      role: "ADMIN",
    });
    const fanbase = await this.fanbaseService.findOne(+id);
    if (admin) fanbase["admin_uuid"] = admin[0]["user_uuid"];
    return fanbase;
  }

  @ApiOperation({ summary: "Update Fanbase by fanbase_id" })
  @Patch(":id")
  async update(@Param("id") id: string, @Body() data: Fanbase) {
    const fanbase = await this.fanbaseService.findOneByFbusername(
      data.fbusername
    );
    if (fanbase) {
      throw new DatabaseException("Fanbase username is already taken", 409);
    }
    return await this.fanbaseService.update(
      +id,
      fanbaseToCreateFanbaseDto(data)
    );
  }

  @ApiOperation({ summary: "Delete Fanbase by fanbase_id" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.fanbaseService.remove(+id);
  }

  @ApiOperation({ summary: "Get all Fanbase A to Z (by fbusername)" })
  @Get("all/AtoZ")
  async findAllAToZ() {
    return await this.fanbaseService.findAllAToZ();
  }
}

// Function to convert Fanbase entity to CreateFanbaseDto
export function fanbaseToCreateFanbaseDto(fanbase: Fanbase): CreateFanbaseDto {
  const createFanbaseDto: CreateFanbaseDto = {
    ...fanbase,
  };
  return createFanbaseDto;
}

// Function to convert Fanbase entity to UpdateFanbaseDto
export function fanbaseToUpdateFanbaseDto(fanbase: Fanbase): UpdateFanbaseDto {
  const updateFanbaseDto: UpdateFanbaseDto = {
    fbusername: fanbase.fbusername,
    isVerified: fanbase.isVerified,
  };
  return updateFanbaseDto;
}
