import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { FanbaseinfoService } from "./fanbaseInfo.service";
import { CreateFanbaseinfoDto } from "./dto/create-fanbaseinfo.dto";
import { UpdateFanbaseinfoDto } from "./dto/update-fanbaseinfo.dto";
import { fanbaseInfo } from "../types";
import { ApiTags, ApiBody, ApiOperation } from "@nestjs/swagger";
import { DatabaseException } from "src/common/exceptions";

@ApiTags("fanbase-info")
@Controller("fanbaseInfo")
export class FanbaseinfoController {
  constructor(private readonly fanbaseinfoService: FanbaseinfoService) {}

  @ApiOperation({ summary: "Create a new Fanbase_Info" })
  @Post()
  @ApiBody({ type: fanbaseInfo })
  async create(@Body() data: fanbaseInfo) {
    const fanbaseInfo = await this.fanbaseinfoService.findOne(data.fanbase_id);
    if (fanbaseInfo) {
      throw new DatabaseException("FanbaseInfo is already created", 409);
    }
    return await this.fanbaseinfoService.create(
      fanbaseInfoToCreateFanbaseinfoDto(data)
    );
  }

  @ApiOperation({ summary: "Get all Fanbase_Info" })
  @Get()
  async findAll() {
    return await this.fanbaseinfoService.findAll();
  }

  @ApiOperation({ summary: "Get Fanbase_Info by fanbase_id" })
  @Get(":id")
  async findOne(@Param("id") id: number) {
    return await this.fanbaseinfoService.findOne(+id);
  }

  @ApiOperation({ summary: "Update Fanbase_Info by fanbase_id" })
  @Patch(":id")
  async update(@Param("id") id: number, @Body() fanbaseinfo: fanbaseInfo) {
    return await this.fanbaseinfoService.update(
      +id,
      fanbaseInfoToUpdateFanbaseinfoDto(fanbaseinfo)
    );
  }

  @ApiOperation({ summary: "Delete Fanbase_Info by fanbase_id" })
  @Delete(":id")
  async remove(@Param("id") id: number) {
    return await this.fanbaseinfoService.remove(+id);
  }

  @ApiOperation({
    summary: "Get all Fanbase_Info sorted alphabetically (by name)",
  })
  @Get("all/AtoZ")
  async findAllAToZ() {
    return await this.fanbaseinfoService.findAllAToZ();
  }
}

// Function to convert fanbaseInfo entity to CreateFanbaseinfoDto
export function fanbaseInfoToCreateFanbaseinfoDto(
  fanbaseinfo: fanbaseInfo
): CreateFanbaseinfoDto {
  const id = fanbaseinfo.fanbase_id;
  delete fanbaseinfo.fanbase_id;
  const createDto: CreateFanbaseinfoDto = {
    ...fanbaseinfo,
    Fanbase: {
      connect: {
        id: id,
      },
    },
  };

  return createDto;
}

export function fanbaseInfoToUpdateFanbaseinfoDto(
  fanbaseinfo: fanbaseInfo
): UpdateFanbaseinfoDto {
  const id = fanbaseinfo.fanbase_id;
  delete fanbaseinfo.fanbase_id;
  const updateDto: UpdateFanbaseinfoDto = {
    ...fanbaseinfo,
    Fanbase: {
      connect: {
        id: id,
      },
    },
  };

  return updateDto;
}
