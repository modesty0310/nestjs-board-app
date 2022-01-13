import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid} from 'uuid';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoards(title: string, description: string): Board {
    const board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }
}