import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEarthquake1740434053175 implements MigrationInterface {
  name = 'AddEarthquake1740434053175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "earthquake" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "location" character varying(255) NOT NULL, "magnitude" double precision, "date" TIMESTAMP, CONSTRAINT "PK_a0e19a3fc6bdeeab552e1ceba90" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "idx_name" ON "earthquake" ("location") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_name"`);
    await queryRunner.query(`DROP TABLE "earthquake"`);
  }
}
