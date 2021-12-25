import fs from 'fs/promises'
import { Knex } from 'knex'
import path from 'path'

function createBase(knex: Knex, table: Knex.CreateTableBuilder) {
  table.uuid('_id').primary().defaultTo(knex.raw('gen_random_uuid()'))
  table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
}

export async function up(knex: Knex): Promise<void> {
  // const buffer = await fs.readFile(path.join(__dirname, '..', 'keeper.sql'))

  // await knex.raw(buffer.toString())

  // Table creation
  await knex.schema.createTable('user', table => {
    createBase(knex, table)
    table.string('email', 128).unique().notNullable()
    table.string('name', 255).notNullable()
    table.string('hash', 255).notNullable()
    table.string('salt', 255).notNullable()
    table.boolean('darkMode').notNullable().defaultTo(false)
    table.boolean('listMode').notNullable().defaultTo(false)
  })

  await knex.schema.createTable('note', table => {
    createBase(knex, table)
    table.text('text').notNullable()
    table.boolean('isCompleted').notNullable().defaultTo(false)
    table.uuid('todo_id').notNullable()
  })

  await knex.schema.createTable('todo', table => {
    createBase(knex, table)
    table.string('title', 128).notNullable()
    table.string('color', 10).notNullable().defaultTo('#fafafa')
    table.boolean('isCheckBoxMode').notNullable().defaultTo(false)
    table.uuid('user_id').notNullable()
  })

  await knex.schema.createTable('label', table => {
    createBase(knex, table)
    table.string('name', 128).notNullable()
    table.uuid('user_id').notNullable()
  })

  await knex.schema.createTable('junction', table => {
    createBase(knex, table)
    table.uuid('label_id').notNullable()
    table.uuid('todo_id').notNullable()
  })

  // Adding foreign keys
  await knex.schema.alterTable('junction', table => {
    table
      .foreign('label_id', 'junction_label_id_foreign')
      .references('_id')
      .inTable('label')
      .onDelete('CASCADE')

    table
      .foreign('todo_id', 'junction_todo_id_foreign')
      .references('_id')
      .inTable('todo')
      .onDelete('CASCADE')
  })

  await knex.schema.alterTable('label', table => {
    table
      .foreign('user_id', 'label_user_id_foreign')
      .references('_id')
      .inTable('user')
      .onDelete('CASCADE')
  })

  await knex.schema.alterTable('todo', table => {
    table
      .foreign('user_id')
      .references('_id')
      .inTable('user')
      .onDelete('CASCADE')
  })

  await knex.schema.alterTable('note', table => {
    table
      .foreign('todo_id', 'note_todo_id_foreign')
      .references('_id')
      .inTable('todo')
      .onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema
    .dropTable('user')
    .dropTable('note')
    .dropTable('todo')
    .dropTable('label')
    .dropTable('junction')
}
