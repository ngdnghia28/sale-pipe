import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserProfile1630136783079 implements MigrationInterface {
    name = 'addUserProfile1630136783079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`test\`.\`countries\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`industries\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`languages\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`user_profile\` (\`id\` char(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`version\` int NOT NULL, \`user_id\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`linked_in\` varchar(255) NULL, \`rate\` varchar(255) NOT NULL, \`hours_per_week\` int NOT NULL, \`avatar\` varchar(255) NULL, \`headline\` varchar(255) NOT NULL, \`bio\` varchar(1023) NOT NULL, \`country_id\` varchar(255) NOT NULL, \`yose\` int NOT NULL, \`sale_channel\` varchar(255) NULL, \`sale_skill\` varchar(255) NULL, \`work_history\` varchar(1023) NULL, \`userId\` char(36) NULL, \`countryId\` char(36) NULL, UNIQUE INDEX \`REL_51cb79b5555effaf7d69ba1cff\` (\`userId\`), UNIQUE INDEX \`REL_a690a479d346f573559b787394\` (\`countryId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`user_profile_languages_language\` (\`userProfileId\` char(36) NOT NULL, \`languageId\` char(36) NOT NULL, INDEX \`IDX_0ea927799d9042e758999c698e\` (\`userProfileId\`), INDEX \`IDX_8e5a560296cf061df2311819c2\` (\`languageId\`), PRIMARY KEY (\`userProfileId\`, \`languageId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`user_profile_industries_industry\` (\`userProfileId\` char(36) NOT NULL, \`industryId\` char(36) NOT NULL, INDEX \`IDX_76a230309cfa6926e141aa9877\` (\`userProfileId\`), INDEX \`IDX_e4af70c60735b16ecaf712b076\` (\`industryId\`), PRIMARY KEY (\`userProfileId\`, \`industryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` ADD \`type\` enum ('USER', 'HIRER') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` ADD \`first_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` ADD \`last_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` ADD \`is_active\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` ADD CONSTRAINT \`FK_51cb79b5555effaf7d69ba1cff9\` FOREIGN KEY (\`userId\`) REFERENCES \`test\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` ADD CONSTRAINT \`FK_a690a479d346f573559b7873941\` FOREIGN KEY (\`countryId\`) REFERENCES \`test\`.\`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_languages_language\` ADD CONSTRAINT \`FK_0ea927799d9042e758999c698ef\` FOREIGN KEY (\`userProfileId\`) REFERENCES \`test\`.\`user_profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_languages_language\` ADD CONSTRAINT \`FK_8e5a560296cf061df2311819c2f\` FOREIGN KEY (\`languageId\`) REFERENCES \`test\`.\`languages\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_industries_industry\` ADD CONSTRAINT \`FK_76a230309cfa6926e141aa9877f\` FOREIGN KEY (\`userProfileId\`) REFERENCES \`test\`.\`user_profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_industries_industry\` ADD CONSTRAINT \`FK_e4af70c60735b16ecaf712b076d\` FOREIGN KEY (\`industryId\`) REFERENCES \`test\`.\`industries\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_industries_industry\` DROP FOREIGN KEY \`FK_e4af70c60735b16ecaf712b076d\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_industries_industry\` DROP FOREIGN KEY \`FK_76a230309cfa6926e141aa9877f\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_languages_language\` DROP FOREIGN KEY \`FK_8e5a560296cf061df2311819c2f\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile_languages_language\` DROP FOREIGN KEY \`FK_0ea927799d9042e758999c698ef\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` DROP FOREIGN KEY \`FK_a690a479d346f573559b7873941\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` DROP FOREIGN KEY \`FK_51cb79b5555effaf7d69ba1cff9\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` DROP COLUMN \`is_active\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` DROP COLUMN \`last_name\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` DROP COLUMN \`first_name\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`users\` ADD \`isActive\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`DROP INDEX \`IDX_e4af70c60735b16ecaf712b076\` ON \`test\`.\`user_profile_industries_industry\``);
        await queryRunner.query(`DROP INDEX \`IDX_76a230309cfa6926e141aa9877\` ON \`test\`.\`user_profile_industries_industry\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`user_profile_industries_industry\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e5a560296cf061df2311819c2\` ON \`test\`.\`user_profile_languages_language\``);
        await queryRunner.query(`DROP INDEX \`IDX_0ea927799d9042e758999c698e\` ON \`test\`.\`user_profile_languages_language\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`user_profile_languages_language\``);
        await queryRunner.query(`DROP INDEX \`REL_a690a479d346f573559b787394\` ON \`test\`.\`user_profile\``);
        await queryRunner.query(`DROP INDEX \`REL_51cb79b5555effaf7d69ba1cff\` ON \`test\`.\`user_profile\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`user_profile\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`languages\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`industries\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`countries\``);
    }

}
