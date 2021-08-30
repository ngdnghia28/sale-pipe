import {MigrationInterface, QueryRunner} from "typeorm";

export class addRolesTablle1630296165165 implements MigrationInterface {
    name = 'addRolesTablle1630296165165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`test\`.\`roles\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`users_roles\` (\`usersId\` char(36) NOT NULL, \`rolesId\` char(36) NOT NULL, INDEX \`IDX_deeb1fe94ce2d111a6695a2880\` (\`usersId\`), INDEX \`IDX_21db462422f1f97519a29041da\` (\`rolesId\`), PRIMARY KEY (\`usersId\`, \`rolesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users_roles\` ADD CONSTRAINT \`FK_deeb1fe94ce2d111a6695a2880e\` FOREIGN KEY (\`usersId\`) REFERENCES \`test\`.\`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users_roles\` ADD CONSTRAINT \`FK_21db462422f1f97519a29041da0\` FOREIGN KEY (\`rolesId\`) REFERENCES \`test\`.\`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`users_roles\` DROP FOREIGN KEY \`FK_21db462422f1f97519a29041da0\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users_roles\` DROP FOREIGN KEY \`FK_deeb1fe94ce2d111a6695a2880e\``);
        await queryRunner.query(`DROP INDEX \`IDX_21db462422f1f97519a29041da\` ON \`test\`.\`users_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_deeb1fe94ce2d111a6695a2880\` ON \`test\`.\`users_roles\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`users_roles\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`roles\``);
    }

}
