import { registerEnumType } from '@nestjs/graphql';

export enum DisplayMode {
  LIST = 'LIST',
  GRID = 'GRID',
}

registerEnumType(DisplayMode, {
  name: 'DisplayMode',
});
