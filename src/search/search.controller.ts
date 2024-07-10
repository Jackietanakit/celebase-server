import { Controller, Get, Request, UseGuards, Query } from "@nestjs/common";
import { SearchService } from "./search.service";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { RoleGuard } from "src/common/guards/roles.guard";

@ApiTags("search")
@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOperation({
    summary: "Search fanbases and events from the query",
    description:
      "use /search?query=[query]&isfollow=[true/false]. The header should always contain userid data",
  })
  @Get()
  @UseGuards(RoleGuard)
  @ApiQuery({ name: "query", required: false })
  @ApiQuery({ name: "isfollowed", required: false })
  @ApiQuery({ name: "type", required: false })
  async search(
    @Query("query") query: string,
    @Query("isfollowed") isfollowed: string,
    @Query("type") type: string,
    @Request() req
  ) {
    let isfollow = false;
    if (isfollowed == "true") {
      isfollow = true;
    }
    if (type == "fanbase") {
      return await this.searchService.searchFanbase(
        req.user.uuid,
        query,
        isfollow
      );
    } else if (type == "event") {
      return await this.searchService.searchEvent(
        req.user.uuid,
        query,
        isfollow
      );
    }
    return await this.searchService.search(req.user.uuid, query, isfollow);
  }
}
