// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   BaseEntity,
//   ManyToMany,
// } from 'typeorm'
// import 'reflect-metadata'
// import { Label as ILabel, Todo as ITodo } from '../graphql/generated'
// import Todo from './todo'

// @Entity()
// export default class Label extends BaseEntity implements ILabel {
//   @PrimaryGeneratedColumn('uuid')
//   _id: string

//   @Column('text')
//   name: string

//   //   @Column({ type: 'text', array: true, default: ['nothing'] })
//   //   @ManyToMany(() => Todo, todo => todo.labels)
//   //   todos: Todo[]
//   constructor(params: Omit<ILabel, '_id'>) {
//     super()
//     this.name = params.name
//   }
// }
