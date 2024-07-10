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
import { EventsService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { Event } from "src/types/entities/event.entity";
import { Event_Status, Event_Type } from "@prisma/client";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";

@ApiTags("event")
@Controller("event")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: "Create Event" })
  @Post()
  async create(@Body() data: Event) {
    return await this.eventsService.create(eventToCreateEventDto(data));
  }

  @ApiOperation({
    summary: "Get all Events from the specification",
    description:
      "The Specifications are \n 1. get All (leave empty) \n 2. get by fanbaseid \n - All of them are mutually exclusive",
  })
  @Get()
  @ApiQuery({ name: "fanbaseid", required: false })
  async find(@Query("fanbaseid") fanbaseid?: string) {
    if (fanbaseid) {
      // If only fanbaseid is provided, return the result of findManybyEvent()
      return await this.eventsService.findManyByFanbaseId(+fanbaseid);
    } else {
      return await this.eventsService.findAll();
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.eventsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update Event by ID" })
  @Patch(":id")
  async update(@Param("id") id: string, @Body() updatedevent: Event) {
    return await this.eventsService.update(
      +id,
      eventToUpdateEventDto(updatedevent)
    );
  }

  @ApiOperation({ summary: "Delete Event by ID" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.eventsService.remove(+id);
  }

  @ApiOperation({ summary: "Get all Event from followed Fanbase by user UUID" })
  @Get(":uuid/followed-fanbase-event")
  async findFollowedFanbaseEventByUUID(@Param("uuid") uuid: string) {
    return await this.eventsService.findFollowedFanbaseEventByUUID(uuid);
  }
}

// Function to convert Event entity to CreateEventDto
export function eventToCreateEventDto(event: Event): CreateEventDto {
  const fanbase_id = event.fanbaseId;
  delete event.fanbaseId;
  const createEventDto: CreateEventDto = {
    ...event,
    status: Event_Status[event.status], // Convert entity enum to DTO enum
    type: Event_Type[event.type], // Convert entity enum to DTO enum
    Fanbase: { connect: { id: fanbase_id } },
  };
  return createEventDto;
}

// Function to convert Event entity to UpdateEventDto
export function eventToUpdateEventDto(event: Event): UpdateEventDto {
  const fanbase_id = event.fanbaseId;
  delete event.fanbaseId;
  const updateEventDto: UpdateEventDto = {
    ...event,
    status: Event_Status[event.status], // Convert entity enum to DTO enum
    type: Event_Type[event.type], // Convert entity enum to DTO enum
    Fanbase: { connect: { id: fanbase_id } },
  };
  return updateEventDto;
}
