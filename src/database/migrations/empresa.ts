import Knex from 'knex';

export async function up (knex : Knex) {
    return knex.schema.createTable('empresa', table => {
        table.string('numero').primary();
        table.string('cep').notNullable();
        table.string('name').notNullable();
    });
}

export async function down(knex : Knex) {
    return knex.schema.dropTable('empresa');
}