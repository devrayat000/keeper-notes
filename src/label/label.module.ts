import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelResolver } from './label.resolver';
import { Prisma } from 'src/prisma';

@Module({
  providers: [LabelResolver, LabelService, Prisma],
})
export class LabelModule {}
