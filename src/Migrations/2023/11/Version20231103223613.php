<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231103223613 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE categorie (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, text VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categorie_professeur (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE cours ADD categorie_id INT NOT NULL, ADD image VARCHAR(255) NOT NULL, ADD updated_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE cours ADD CONSTRAINT FK_FDCA8C9CBCF5E72D FOREIGN KEY (categorie_id) REFERENCES categorie (id)');
        $this->addSql('CREATE INDEX IDX_FDCA8C9CBCF5E72D ON cours (categorie_id)');
        $this->addSql('ALTER TABLE professeur ADD cours_id INT NOT NULL, ADD categorie_professeur_id INT NOT NULL');
        $this->addSql('ALTER TABLE professeur ADD CONSTRAINT FK_17A552997ECF78B0 FOREIGN KEY (cours_id) REFERENCES cours (id)');
        $this->addSql('ALTER TABLE professeur ADD CONSTRAINT FK_17A55299B97DCFA3 FOREIGN KEY (categorie_professeur_id) REFERENCES categorie_professeur (id)');
        $this->addSql('CREATE INDEX IDX_17A552997ECF78B0 ON professeur (cours_id)');
        $this->addSql('CREATE INDEX IDX_17A55299B97DCFA3 ON professeur (categorie_professeur_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cours DROP FOREIGN KEY FK_FDCA8C9CBCF5E72D');
        $this->addSql('ALTER TABLE professeur DROP FOREIGN KEY FK_17A55299B97DCFA3');
        $this->addSql('DROP TABLE categorie');
        $this->addSql('DROP TABLE categorie_professeur');
        $this->addSql('DROP INDEX IDX_FDCA8C9CBCF5E72D ON cours');
        $this->addSql('ALTER TABLE cours DROP categorie_id, DROP image, DROP updated_at');
        $this->addSql('ALTER TABLE professeur DROP FOREIGN KEY FK_17A552997ECF78B0');
        $this->addSql('DROP INDEX IDX_17A552997ECF78B0 ON professeur');
        $this->addSql('DROP INDEX IDX_17A55299B97DCFA3 ON professeur');
        $this->addSql('ALTER TABLE professeur DROP cours_id, DROP categorie_professeur_id');
    }
}
