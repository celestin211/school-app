<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231121193043 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE contact (id INT AUTO_INCREMENT NOT NULL, professeur_id INT DEFAULT NULL, cree_par_id INT DEFAULT NULL, modifie_par_id INT DEFAULT NULL, nom VARCHAR(255) DEFAULT NULL, fonction VARCHAR(255) DEFAULT NULL, telephone VARCHAR(50) DEFAULT NULL, email VARCHAR(255) NOT NULL, notifier TINYINT(1) NOT NULL, date_creation DATETIME DEFAULT NULL, date_modification DATETIME DEFAULT NULL, INDEX IDX_4C62E638BAB22EE9 (professeur_id), INDEX IDX_4C62E638FC29C013 (cree_par_id), INDEX IDX_4C62E638553B2554 (modifie_par_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE contact ADD CONSTRAINT FK_4C62E638BAB22EE9 FOREIGN KEY (professeur_id) REFERENCES professeur (id)');
        $this->addSql('ALTER TABLE contact ADD CONSTRAINT FK_4C62E638FC29C013 FOREIGN KEY (cree_par_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE contact ADD CONSTRAINT FK_4C62E638553B2554 FOREIGN KEY (modifie_par_id) REFERENCES utilisateur (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE contact DROP FOREIGN KEY FK_4C62E638BAB22EE9');
        $this->addSql('ALTER TABLE contact DROP FOREIGN KEY FK_4C62E638FC29C013');
        $this->addSql('ALTER TABLE contact DROP FOREIGN KEY FK_4C62E638553B2554');
        $this->addSql('DROP TABLE contact');
    }
}
