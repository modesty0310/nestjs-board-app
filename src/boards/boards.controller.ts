import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidation } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard() {
    console.log('get');
    return this.boardsService.getAllBoards();
  }

  // @Post('/create')
  // createBoard(@Req() request: Request) {
  //   this.boardsService.createBoards(
  //     request.body.title,
  //     request.body.description,
  //   );
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoards(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }

  @Patch('/:id/status')
  @UsePipes(BoardStatusValidation)
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus,
  ) {
    this.boardsService.updateBoardStatus(id, status);
  }
}
