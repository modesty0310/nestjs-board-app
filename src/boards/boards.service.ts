import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boardstatus.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    await this.boardRepository.delete(id);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    console.log(board);
    board.status = status;
    await board.save();
    return board;
  }
}
