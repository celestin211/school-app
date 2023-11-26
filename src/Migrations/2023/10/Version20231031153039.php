<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231031153039 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE utilisateur ADD cree_par_id INT DEFAULT NULL, ADD modifie_par_id INT DEFAULT NULL, ADD civilite VARCHAR(255) NOT NULL, ADD nb_connexion_KO INT DEFAULT NULL, ADD email_canonical VARCHAR(70) DEFAULT NULL, ADD username_canonical VARCHAR(255) DEFAULT NULL, ADD roles JSON NOT NULL, ADD salt VARCHAR(255) DEFAULT NULL, ADD locked TINYINT(1) NOT NULL, ADD enabled TINYINT(1) NOT NULL, ADD expired TINYINT(1) NOT NULL, ADD expires_at DATETIME DEFAULT NULL, ADD confirmation_token VARCHAR(255) DEFAULT NULL, ADD password_requested_at DATETIME DEFAULT NULL, ADD recevoir_notifications_school TINYINT(1) NOT NULL, ADD force_change_password TINYINT(1) DEFAULT NULL, ADD date_creation DATETIME DEFAULT NULL, ADD date_modification DATETIME DEFAULT NULL, CHANGE email email VARCHAR(70) NOT NULL');
        $this->addSql('ALTER TABLE utilisateur ADD CONSTRAINT FK_1D1C63B3FC29C013 FOREIGN KEY (cree_par_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE utilisateur ADD CONSTRAINT FK_1D1C63B3553B2554 FOREIGN KEY (modifie_par_id) REFERENCES utilisateur (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1D1C63B3E7927C74 ON utilisateur (email)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1D1C63B3A0D96FBF ON utilisateur (email_canonical)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1D1C63B392FC23A8 ON utilisateur (username_canonical)');
        $this->addSql('CREATE INDEX IDX_1D1C63B3FC29C013 ON utilisateur (cree_par_id)');
        $this->addSql('CREATE INDEX IDX_1D1C63B3553B2554 ON utilisateur (modifie_par_id)');
        $this->addSql('CREATE FULLTEXT INDEX IDX_1D1C63B36C6E55B5A625945B ON utilisateur (nom, prenom)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE utilisateur DROP FOREIGN KEY FK_1D1C63B3FC29C013');
        $this->addSql('ALTER TABLE utilisateur DROP FOREIGN KEY FK_1D1C63B3553B2554');
        $this->addSql('DROP INDEX UNIQ_1D1C63B3E7927C74 ON utilisateur');
        $this->addSql('DROP INDEX UNIQ_1D1C63B3A0D96FBF ON utilisateur');
        $this->addSql('DROP INDEX UNIQ_1D1C63B392FC23A8 ON utilisateur');
        $this->addSql('DROP INDEX IDX_1D1C63B3FC29C013 ON utilisateur');
        $this->addSql('DROP INDEX IDX_1D1C63B3553B2554 ON utilisateur');
        $this->addSql('DROP INDEX IDX_1D1C63B36C6E55B5A625945B ON utilisateur');
        $this->addSql('ALTER TABLE utilisateur DROP cree_par_id, DROP modifie_par_id, DROP civilite, DROP nb_connexion_KO, DROP email_canonical, DROP username_canonical, DROP roles, DROP salt, DROP locked, DROP enabled, DROP expired, DROP expires_at, DROP confirmation_token, DROP password_requested_at, DROP recevoir_notifications_school, DROP force_change_password, DROP date_creation, DROP date_modification, CHANGE email email VARCHAR(255) NOT NULL');
    }
}
