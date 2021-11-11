// // import { model, Schema, PopulatedDoc, Document } from 'mongoose'
// // import { Todo } from '../graphql/generated'
// // import { ILabel } from './label'

// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   BaseEntity,
//   CreateDateColumn,
//   ManyToMany,
//   JoinTable,
// } from 'typeorm'
// import 'reflect-metadata'
// import {
//   Label as ILabel,
//   Todo as ITodo,
//   Note as INote,
// } from '../graphql/generated'
// import Label from './label'

// @Entity()
// export default class Todo extends BaseEntity implements ITodo {
//   @PrimaryGeneratedColumn('uuid')
//   _id: string

//   @Column('text')
//   title: string

//   @Column({ type: 'text', array: true, default: [] })
//   notes: INote[] = []

//   //   @Column({ type: 'text', array: true, default: [] })
//   @ManyToMany(() => Label)
//   @JoinTable()
//   labels: Label[]

//   @Column('text', { default: '#fafafa' })
//   color: string = '#fafafa'

//   @Column('boolean', { default: false })
//   isChechBoxMode: boolean = false

//   @CreateDateColumn()
//   createdAt: string

//   constructor(params: Omit<ITodo, '_id' | 'createdAt' | 'labels'>) {
//     super()
//     this.title = params.title
//     this.notes = params.notes
//     this.color = params.color
//     this.isChechBoxMode = params.isChechBoxMode
//   }
// }
