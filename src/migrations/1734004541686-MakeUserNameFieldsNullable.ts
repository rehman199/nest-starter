import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeUserNameFieldsNullable1734004541686
  implements MigrationInterface
{
  name = 'MakeUserNameFieldsNullable1734004541686';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "firstName" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastName" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastName" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "firstName" SET NOT NULL`,
    );
  }
}
