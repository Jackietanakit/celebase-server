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
import { UserEventService } from "./userEvent.service";
import { CreateUserEventDto } from "./dto/create-userEvent.dto";
import { UpdateUserEventDto } from "./dto/update-userEvent.dto";
import { UserEvent } from "src/types/entities/userEvent.entity";
import { User_Event_Status } from "@prisma/client";
import { ApiQuery, ApiTags, ApiOperation } from "@nestjs/swagger";
@ApiTags("user-event")
@Controller("user-event")
export class UserEventController {
  constructor(private readonly userEventService: UserEventService) {}

  @ApiOperation({ summary: "Get the number of users joined Event by event_id" })
  @Get(":eventid/count-joined-users")
  countJoinedUsers(@Param("eventid") eventid: number) {
    return this.userEventService.countJoinedUsers(eventid);
  }

  @Get("top-5-events")
  getTop5OngoingEvents() {
    return this.userEventService.getTop5Events();
  }

  @ApiOperation({ summary: "Create User_Event" })
  @Post()
  create(@Body() userevent: UserEvent) {
    return this.userEventService.create(
      userEventToCreateUserEventDto(userevent)
    );
  }

  @ApiOperation({
    summary: "Returns all User_Event (Query by uuid or event_id or both)",
  })
  @Get()
  @ApiQuery({ name: "userid", required: false })
  @ApiQuery({ name: "eventid", required: false })
  find(@Query("userid") userid?: string, @Query("eventid") eventid?: string) {
    if (userid && eventid) {
      // If both userid and eventid are provided, return the result of findOne()
      return this.userEventService.findOne(userid, +eventid);
    } else if (userid) {
      // If only userid is provided, return the result of findManybyUser()
      return this.userEventService.findManybyUser(userid);
    } else if (eventid) {
      // If only eventid is provided, return the result of findManybyEvent()
      return this.userEventService.findManybyEvent(+eventid);
    } else {
      // If neither userid nor eventid are provided, return the result of findAll()
      return this.userEventService.findAll();
    }
  }

  @ApiOperation({
    summary: "Update User_Event by uuid and event_id",
    description: "Note : Userid and eventid is required in the body",
  })
  @Patch()
  update(@Body() updateduserevent: UserEvent) {
    return this.userEventService.update(
      userEventToUpdateUserEventDto(updateduserevent)
    );
  }

  @ApiOperation({ summary: "Delete User_Event by uuid and event_id" })
  @Delete()
  remove(@Query("userid") userid: string, @Query("eventid") eventid: string) {
    return this.userEventService.remove(userid, +eventid);
  }

  @ApiOperation({ summary: "Get current total fee by event_id" })
  @Get(":eventid/total-fee")
  getTotalFee(@Param("eventid") eventid: string) {
    return this.userEventService.getTotalFee(+eventid);
  }
}

// Function to convert UserEvent entity to CreateUserEventDto
export function userEventToCreateUserEventDto(
  userEvent: UserEvent
): CreateUserEventDto {
  const createUserEventDto: CreateUserEventDto = {
    fee: userEvent.fee,
    status: User_Event_Status[userEvent.status],
    User: { connect: { uuid: userEvent.uuid } },
    Event: { connect: { id: userEvent.eventId } },
  };
  return createUserEventDto;
}

// Function to convert UserEvent entity to UpdateUserEventDto
export function userEventToUpdateUserEventDto(
  userEvent: UserEvent
): UpdateUserEventDto {
  const updateUserEventDto: UpdateUserEventDto = {
    fee: userEvent.fee,
    status: User_Event_Status[userEvent.status],
    User: { connect: { uuid: userEvent.uuid } },
    Event: { connect: { id: userEvent.eventId } },
  };
  return updateUserEventDto;
}
