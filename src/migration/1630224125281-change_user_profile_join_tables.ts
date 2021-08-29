import {MigrationInterface, QueryRunner} from "typeorm";

export class changeUserProfileJoinTables1630224125281 implements MigrationInterface {
    name = 'changeUserProfileJoinTables1630224125281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` DROP FOREIGN KEY \`FK_a690a479d346f573559b7873941\``);
        await queryRunner.query(`DROP INDEX \`REL_a690a479d346f573559b787394\` ON \`test\`.\`user_profile\``);
        await queryRunner.query(`CREATE TABLE \`test\`.\`user_profiles_languages\` (\`userProfileId\` char(36) NOT NULL, \`languagesId\` char(36) NOT NULL, INDEX \`IDX_2469d0dd8bf3bce74671fbffda\` (\`userProfileId\`), INDEX \`IDX_a88d4365dc7841de0ba6fead76\` (\`languagesId\`), PRIMARY KEY (\`userProfileId\`, \`languagesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`user_profiles_industries\` (\`userProfileId\` char(36) NOT NULL, \`industriesId\` char(36) NOT NULL, INDEX \`IDX_3a4e13014504c6f5ebf9e18719\` (\`userProfileId\`), INDEX \`IDX_6c0febd49f7d20450fce923a3d\` (\`industriesId\`), PRIMARY KEY (\`userProfileId\`, \`industriesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` DROP COLUMN \`countryId\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` DROP COLUMN \`country_id\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` ADD \`country_id\` char(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` ADD UNIQUE INDEX \`IDX_b22e1945e7067d187bf47689eb\` (\`country_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b22e1945e7067d187bf47689eb\` ON \`test\`.\`user_profile\` (\`country_id\`)`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` ADD CONSTRAINT \`FK_b22e1945e7067d187bf47689eb6\` FOREIGN KEY (\`country_id\`) REFERENCES \`test\`.\`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profiles_languages\` ADD CONSTRAINT \`FK_2469d0dd8bf3bce74671fbffdae\` FOREIGN KEY (\`userProfileId\`) REFERENCES \`test\`.\`user_profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profiles_languages\` ADD CONSTRAINT \`FK_a88d4365dc7841de0ba6fead763\` FOREIGN KEY (\`languagesId\`) REFERENCES \`test\`.\`languages\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profiles_industries\` ADD CONSTRAINT \`FK_3a4e13014504c6f5ebf9e187199\` FOREIGN KEY (\`userProfileId\`) REFERENCES \`test\`.\`user_profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profiles_industries\` ADD CONSTRAINT \`FK_6c0febd49f7d20450fce923a3d8\` FOREIGN KEY (\`industriesId\`) REFERENCES \`test\`.\`industries\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profiles_industries\` DROP FOREIGN KEY \`FK_6c0febd49f7d20450fce923a3d8\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profiles_industries\` DROP FOREIGN KEY \`FK_3a4e13014504c6f5ebf9e187199\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profiles_languages\` DROP FOREIGN KEY \`FK_a88d4365dc7841de0ba6fead763\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profiles_languages\` DROP FOREIGN KEY \`FK_2469d0dd8bf3bce74671fbffdae\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` DROP FOREIGN KEY \`FK_b22e1945e7067d187bf47689eb6\``);
        await queryRunner.query(`DROP INDEX \`REL_b22e1945e7067d187bf47689eb\` ON \`test\`.\`user_profile\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` DROP INDEX \`IDX_b22e1945e7067d187bf47689eb\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` DROP COLUMN \`country_id\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` ADD \`country_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` ADD \`countryId\` char(36) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_6c0febd49f7d20450fce923a3d\` ON \`test\`.\`user_profiles_industries\``);
        await queryRunner.query(`DROP INDEX \`IDX_3a4e13014504c6f5ebf9e18719\` ON \`test\`.\`user_profiles_industries\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`user_profiles_industries\``);
        await queryRunner.query(`DROP INDEX \`IDX_a88d4365dc7841de0ba6fead76\` ON \`test\`.\`user_profiles_languages\``);
        await queryRunner.query(`DROP INDEX \`IDX_2469d0dd8bf3bce74671fbffda\` ON \`test\`.\`user_profiles_languages\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`user_profiles_languages\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a690a479d346f573559b787394\` ON \`test\`.\`user_profile\` (\`countryId\`)`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`user_profile\` ADD CONSTRAINT \`FK_a690a479d346f573559b7873941\` FOREIGN KEY (\`countryId\`) REFERENCES \`test\`.\`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
