<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231121203807 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE cours_document (cours_id INT NOT NULL, document_id INT NOT NULL, INDEX IDX_1FFD24AB7ECF78B0 (cours_id), INDEX IDX_1FFD24ABC33F7837 (document_id), PRIMARY KEY(cours_id, document_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE cours_document ADD CONSTRAINT FK_1FFD24AB7ECF78B0 FOREIGN KEY (cours_id) REFERENCES cours (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cours_document ADD CONSTRAINT FK_1FFD24ABC33F7837 FOREIGN KEY (document_id) REFERENCES document (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cours ADD cours_reference_id INT DEFAULT NULL, ADD document_arrete_id INT DEFAULT NULL, ADD transmis_par_id INT DEFAULT NULL, ADD accuse_par_id INT DEFAULT NULL, ADD cree_par_id INT DEFAULT NULL, ADD modifie_par_id INT DEFAULT NULL, ADD type_ouverture TINYINT(1) NOT NULL, ADD type_modificatif TINYINT(1) NOT NULL, ADD type_cours TINYINT(1) NOT NULL, ADD statut VARCHAR(255) NOT NULL, ADD date_transmission DATETIME DEFAULT NULL, ADD date_creation DATETIME DEFAULT NULL, ADD date_modification DATETIME DEFAULT NULL, CHANGE date_debut date_debut DATETIME DEFAULT NULL, CHANGE updated_at date_accuse_reception DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE cours ADD CONSTRAINT FK_FDCA8C9C1B0D78A FOREIGN KEY (cours_reference_id) REFERENCES cours (id)');
        $this->addSql('ALTER TABLE cours ADD CONSTRAINT FK_FDCA8C9CEB383DF2 FOREIGN KEY (document_arrete_id) REFERENCES document (id)');
        $this->addSql('ALTER TABLE cours ADD CONSTRAINT FK_FDCA8C9CF1E9D3E4 FOREIGN KEY (transmis_par_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE cours ADD CONSTRAINT FK_FDCA8C9C2975AADC FOREIGN KEY (accuse_par_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE cours ADD CONSTRAINT FK_FDCA8C9CFC29C013 FOREIGN KEY (cree_par_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE cours ADD CONSTRAINT FK_FDCA8C9C553B2554 FOREIGN KEY (modifie_par_id) REFERENCES utilisateur (id)');
        $this->addSql('CREATE INDEX IDX_FDCA8C9C1B0D78A ON cours (cours_reference_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_FDCA8C9CEB383DF2 ON cours (document_arrete_id)');
        $this->addSql('CREATE INDEX IDX_FDCA8C9CF1E9D3E4 ON cours (transmis_par_id)');
        $this->addSql('CREATE INDEX IDX_FDCA8C9C2975AADC ON cours (accuse_par_id)');
        $this->addSql('CREATE INDEX IDX_FDCA8C9CFC29C013 ON cours (cree_par_id)');
        $this->addSql('CREATE INDEX IDX_FDCA8C9C553B2554 ON cours (modifie_par_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cours_document DROP FOREIGN KEY FK_1FFD24AB7ECF78B0');
        $this->addSql('ALTER TABLE cours_document DROP FOREIGN KEY FK_1FFD24ABC33F7837');
        $this->addSql('DROP TABLE cours_document');
        $this->addSql('ALTER TABLE cours DROP FOREIGN KEY FK_FDCA8C9C1B0D78A');
        $this->addSql('ALTER TABLE cours DROP FOREIGN KEY FK_FDCA8C9CEB383DF2');
        $this->addSql('ALTER TABLE cours DROP FOREIGN KEY FK_FDCA8C9CF1E9D3E4');
        $this->addSql('ALTER TABLE cours DROP FOREIGN KEY FK_FDCA8C9C2975AADC');
        $this->addSql('ALTER TABLE cours DROP FOREIGN KEY FK_FDCA8C9CFC29C013');
        $this->addSql('ALTER TABLE cours DROP FOREIGN KEY FK_FDCA8C9C553B2554');
        $this->addSql('DROP INDEX IDX_FDCA8C9C1B0D78A ON cours');
        $this->addSql('DROP INDEX UNIQ_FDCA8C9CEB383DF2 ON cours');
        $this->addSql('DROP INDEX IDX_FDCA8C9CF1E9D3E4 ON cours');
        $this->addSql('DROP INDEX IDX_FDCA8C9C2975AADC ON cours');
        $this->addSql('DROP INDEX IDX_FDCA8C9CFC29C013 ON cours');
        $this->addSql('DROP INDEX IDX_FDCA8C9C553B2554 ON cours');
        $this->addSql('ALTER TABLE cours ADD updated_at DATETIME DEFAULT NULL, DROP cours_reference_id, DROP document_arrete_id, DROP transmis_par_id, DROP accuse_par_id, DROP cree_par_id, DROP modifie_par_id, DROP type_ouverture, DROP type_modificatif, DROP type_cours, DROP statut, DROP date_accuse_reception, DROP date_transmission, DROP date_creation, DROP date_modification, CHANGE date_debut date_debut DATETIME NOT NULL');
    }
}
