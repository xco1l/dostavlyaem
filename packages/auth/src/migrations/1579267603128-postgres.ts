import {MigrationInterface, QueryRunner} from 'typeorm';

export class postgres1579267603128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "userName" TO "name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "name"  TO "userName"`,
    );
  }
}
