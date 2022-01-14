import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoard() {
    return this.boardsService.getAllBoards();
  }

  // @Post('/create')
  // createBoard(@Req() request: Request) {
  //   this.boardsService.createBoards(
  //     request.body.title,
  //     request.body.description,
  //   );
  // }

  @Post('/create')
  createBoard(@Body() board: Board) {
    this.boardsService.createBoards(board.title, board.description);
  }
}
