import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddAvatarFieldToUser1611411096993 implements MigrationInterface {

    // criamos um campo avatar na collection user
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'avatar',
            type: 'varchar',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user', 'avatar')
    }

}
