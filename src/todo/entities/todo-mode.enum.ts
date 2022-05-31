import { registerEnumType } from '@nestjs/graphql';

export enum TodoMode {
  SIMPLE = 'SIMPLE',
  CHECKBOX = 'CHECKBOX',
}

registerEnumType(TodoMode, {
  name: 'TodoMode',
});
