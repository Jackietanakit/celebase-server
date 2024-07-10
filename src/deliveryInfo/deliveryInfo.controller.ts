import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { DeliveryinfosService } from "./deliveryInfo.service";
import { CreateDeliveryinfoDto } from "./dto/create-deliveryInfo.dto";
import { UpdateDeliveryinfoDto } from "./dto/update-deliveryInfo.dto";
import { DeliveryInfo } from "../types";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { DatabaseException } from "src/common/exceptions";

@ApiTags("delivery-info")
@Controller("deliveryinfos")
export class DeliveryinfosController {
  constructor(private readonly deliveryinfosService: DeliveryinfosService) {}

  @ApiOperation({ summary: "Create a new Deliveryinfo" })
  @Post()
  async create(@Body() data: DeliveryInfo) {
    const deliveryInfo = await this.deliveryinfosService.findOneByTrackingNo(
      data.tracking_no
    );
    if (deliveryInfo) {
      throw new DatabaseException("Tracking No is already in use", 409);
    }
    return this.deliveryinfosService.create(
      deliveryinfoToCreateDeliveryinfoDto(data)
    );
  }

  @ApiOperation({
    summary: "Get Deliveryinfos",
    description:
      "There are 3 ways to get the data \n 1. userid \n 2. fanbaseid \n 3.none(return all)",
  })
  @Get()
  @ApiQuery({ name: "userid", required: false })
  @ApiQuery({ name: "eventid", required: false })
  async findDeliveryInfo(
    @Query("userid") userId?: string,
    @Query("eventid") eventId?: string
  ) {
    const queryData = {};
    if (userId) {
      queryData["user_uuid"] = userId;
    }
    if (eventId) {
      queryData["event_id"] = +eventId;
    }
    return await this.deliveryinfosService.findAll(queryData);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.deliveryinfosService.findOne(+id);
  }

  @ApiOperation({ summary: "Update Deliveryinfo by deliveryid" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateddeliveryinfo: DeliveryInfo
  ) {
    return await this.deliveryinfosService.update(
      +id,
      deliveryinfoToUpdateDeliveryinfoDto(updateddeliveryinfo)
    );
  }

  @ApiOperation({ summary: "Delete Deliveryinfo by deliveryid" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.deliveryinfosService.remove(+id);
  }
}

// Function to convert Deliveryinfo entity to CreateDeliveryinfoDto
export function deliveryinfoToCreateDeliveryinfoDto(
  deliveryinfo: DeliveryInfo
): CreateDeliveryinfoDto {
  const createDeliveryinfoDto: CreateDeliveryinfoDto = {
    tracking_no: deliveryinfo.tracking_no,
    item_name: deliveryinfo.item_name,
    date_sent: deliveryinfo.date_sent,
    delivery_type: deliveryinfo.delivery_type,
    date_received: deliveryinfo.date_received,
    User: { connect: { uuid: deliveryinfo.uuid } },
    Event: { connect: { id: deliveryinfo.event_id } },
  };
  return createDeliveryinfoDto;
}

// Function to convert Deliveryinfo entity to UpdateDeliveryinfoDto
export function deliveryinfoToUpdateDeliveryinfoDto(
  deliveryinfo: DeliveryInfo
): UpdateDeliveryinfoDto {
  const updateDeliveryinfoDto: UpdateDeliveryinfoDto = {
    date_sent: deliveryinfo.date_sent,
    date_received: deliveryinfo.date_received,
    User: { connect: { uuid: deliveryinfo.uuid } },
    Event: { connect: { id: deliveryinfo.event_id } },
  };
  return updateDeliveryinfoDto;
}
