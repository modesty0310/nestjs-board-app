import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../boardstatus.emuml';

export class BoardStatusValidation implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException('잘못된 스테이터스입니다.');
    }
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
