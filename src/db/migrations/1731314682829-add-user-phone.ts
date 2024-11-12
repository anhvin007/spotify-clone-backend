import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUserPhone1731314682829 implements MigrationInterface {
    name = 'AddUserPhone1731314682829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" ADD "phone" character varying NOT NULL DEFAULT ''`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`)
    }
}
