import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserProfile1630136783079 implements MigrationInterface {
    name = 'addUserProfile1630136783079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`test\`.\`countries\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`industries\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`languages\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`user_profile\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`user_id\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`linked_in\` varchar(255) NULL, \`rate\` varchar(255) NOT NULL, \`hours_per_week\` int NOT NULL, \`avatar\` varchar(255) NULL, \`headline\` varchar(255) NOT NULL, \`bio\` varchar(1023) NOT NULL, \`country_id\` varchar(255) NOT NULL, \`yose\` int NOT NULL, \`sale_channel\` varchar(255) NULL, \`sale_skill\` varchar(255) NULL, \`work_history\` varchar(1023) NULL, \`userId\` char(36) NULL, \`countryId\` char(36) NULL, UNIQUE INDEX \`REL_51cb79b5555effaf7d69ba1cff\` (\`userId\`), UNIQUE INDEX \`REL_a690a479d346f573559b787394\` (\`countryId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`user_profile_languages_languages\` (\`userProfileId\` char(36) NOT NULL, \`languagesId\` char(36) NOT NULL, INDEX \`IDX_8b7e47f5397d25e2bf532e742c\` (\`userProfileId\`), INDEX \`IDX_19291cb3900d552588f71182ae\` (\`languagesId\`), PRIMARY KEY (\`userProfileId\`, \`languagesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`user_profile_industries_industries\` (\`userProfileId\` char(36) NOT NULL, \`industriesId\` char(36) NOT NULL, INDEX \`IDX_805364f24ba30b17b0f4906a13\` (\`userProfileId\`), INDEX \`IDX_1d35d48482799f159dcc8fa81d\` (\`industriesId\`), PRIMARY KEY (\`userProfileId\`, \`industriesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` ADD \`type\` enum ('USER', 'HIRER') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` ADD \`first_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` ADD \`last_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` ADD CONSTRAINT \`FK_51cb79b5555effaf7d69ba1cff9\` FOREIGN KEY (\`userId\`) REFERENCES \`test\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` ADD CONSTRAINT \`FK_a690a479d346f573559b7873941\` FOREIGN KEY (\`countryId\`) REFERENCES \`test\`.\`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_languages_languages\` ADD CONSTRAINT \`FK_8b7e47f5397d25e2bf532e742c3\` FOREIGN KEY (\`userProfileId\`) REFERENCES \`test\`.\`user_profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_languages_languages\` ADD CONSTRAINT \`FK_19291cb3900d552588f71182ae6\` FOREIGN KEY (\`languagesId\`) REFERENCES \`test\`.\`languages\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_industries_industries\` ADD CONSTRAINT \`FK_805364f24ba30b17b0f4906a132\` FOREIGN KEY (\`userProfileId\`) REFERENCES \`test\`.\`user_profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_industries_industries\` ADD CONSTRAINT \`FK_1d35d48482799f159dcc8fa81dc\` FOREIGN KEY (\`industriesId\`) REFERENCES \`test\`.\`industries\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_industries_industries\` DROP FOREIGN KEY \`FK_1d35d48482799f159dcc8fa81dc\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_industries_industries\` DROP FOREIGN KEY \`FK_805364f24ba30b17b0f4906a132\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_languages_languages\` DROP FOREIGN KEY \`FK_19291cb3900d552588f71182ae6\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_languages_languages\` DROP FOREIGN KEY \`FK_8b7e47f5397d25e2bf532e742c3\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` DROP FOREIGN KEY \`FK_a690a479d346f573559b7873941\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` DROP FOREIGN KEY \`FK_51cb79b5555effaf7d69ba1cff9\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` DROP COLUMN \`last_name\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` DROP COLUMN \`first_name\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` ADD \`isActive\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_1d35d48482799f159dcc8fa81d\` ON \`test\`.\`user_profile_industries_industries\``);
        await queryRunner.query(`DROP INDEX \`IDX_805364f24ba30b17b0f4906a13\` ON \`test\`.\`user_profile_industries_industries\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`user_profile_industries_industries\``);
        await queryRunner.query(`DROP INDEX \`IDX_19291cb3900d552588f71182ae\` ON \`test\`.\`user_profile_languages_languages\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b7e47f5397d25e2bf532e742c\` ON \`test\`.\`user_profile_languages_languages\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`user_profile_languages_languages\``);
        await queryRunner.query(`DROP INDEX \`REL_a690a479d346f573559b787394\` ON \`test\`.\`user_profile\``);
        await queryRunner.query(`DROP INDEX \`REL_51cb79b5555effaf7d69ba1cff\` ON \`test\`.\`user_profile\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`user_profile\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`languages\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`industries\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`countries\``);
    }

}
