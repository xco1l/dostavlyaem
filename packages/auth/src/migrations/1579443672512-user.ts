import {MigrationInterface, QueryRunner} from 'typeorm';

export class user1579443672512 implements MigrationInterface {
  name = 'user1579443672512';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "userName" character varying NOT NULL, "avatar" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, "confirmed" boolean NOT NULL DEFAULT false, "confirmHash" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "user"`, undefined);
  }
}
