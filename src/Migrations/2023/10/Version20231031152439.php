<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231031152439 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE document (id INT AUTO_INCREMENT NOT NULL, cree_par_id INT DEFAULT NULL, modifie_par_id INT DEFAULT NULL, nom VARCHAR(512) NOT NULL, path VARCHAR(1024) NOT NULL, brouillon TINYINT(1) NOT NULL, date_creation DATETIME DEFAULT NULL, date_modification DATETIME DEFAULT NULL, discr VARCHAR(255) NOT NULL, INDEX IDX_D8698A76FC29C013 (cree_par_id), INDEX IDX_D8698A76553B2554 (modifie_par_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE document_accueil (id INT AUTO_INCREMENT NOT NULL, document_id INT NOT NULL, cree_par_id INT DEFAULT NULL, modifie_par_id INT DEFAULT NULL, date_creation DATETIME DEFAULT NULL, date_modification DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_A6F6EA62C33F7837 (document_id), INDEX IDX_A6F6EA62FC29C013 (cree_par_id), INDEX IDX_A6F6EA62553B2554 (modifie_par_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message (id INT AUTO_INCREMENT NOT NULL, destinataire INT NOT NULL, cree_par_id INT DEFAULT NULL, modifie_par_id INT DEFAULT NULL, objet VARCHAR(255) NOT NULL, contenu LONGTEXT NOT NULL, favoris TINYINT(1) NOT NULL, lu TINYINT(1) NOT NULL, date_lecture DATETIME DEFAULT NULL, date_envoi DATETIME NOT NULL, supprime TINYINT(1) NOT NULL, date_creation DATETIME DEFAULT NULL, date_modification DATETIME DEFAULT NULL, INDEX IDX_B6BD307FFEA9FF92 (destinataire), INDEX IDX_B6BD307FFC29C013 (cree_par_id), INDEX IDX_B6BD307F553B2554 (modifie_par_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message_document (message_id INT NOT NULL, document_id INT NOT NULL, INDEX IDX_D14F4E67537A1329 (message_id), INDEX IDX_D14F4E67C33F7837 (document_id), PRIMARY KEY(message_id, document_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE document ADD CONSTRAINT FK_D8698A76FC29C013 FOREIGN KEY (cree_par_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE document ADD CONSTRAINT FK_D8698A76553B2554 FOREIGN KEY (modifie_par_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE document_accueil ADD CONSTRAINT FK_A6F6EA62C33F7837 FOREIGN KEY (document_id) REFERENCES document (id)');
        $this->addSql('ALTER TABLE document_accueil ADD CONSTRAINT FK_A6F6EA62FC29C013 FOREIGN KEY (cree_par_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE document_accueil ADD CONSTRAINT FK_A6F6EA62553B2554 FOREIGN KEY (modifie_par_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307FFEA9FF92 FOREIGN KEY (destinataire) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307FFC29C013 FOREIGN KEY (cree_par_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F553B2554 FOREIGN KEY (modifie_par_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE message_document ADD CONSTRAINT FK_D14F4E67537A1329 FOREIGN KEY (message_id) REFERENCES message (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE message_document ADD CONSTRAINT FK_D14F4E67C33F7837 FOREIGN KEY (document_id) REFERENCES document (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE utilisateur DROP civilite, DROP roles, DROP expires_at, DROP confirmation_token, DROP password_requested_at, DROP recevoir_notif_school_email, DROP force_change_password');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE document DROP FOREIGN KEY FK_D8698A76FC29C013');
        $this->addSql('ALTER TABLE document DROP FOREIGN KEY FK_D8698A76553B2554');
        $this->addSql('ALTER TABLE document_accueil DROP FOREIGN KEY FK_A6F6EA62C33F7837');
        $this->addSql('ALTER TABLE document_accueil DROP FOREIGN KEY FK_A6F6EA62FC29C013');
        $this->addSql('ALTER TABLE document_accueil DROP FOREIGN KEY FK_A6F6EA62553B2554');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307FFEA9FF92');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307FFC29C013');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F553B2554');
        $this->addSql('ALTER TABLE message_document DROP FOREIGN KEY FK_D14F4E67537A1329');
        $this->addSql('ALTER TABLE message_document DROP FOREIGN KEY FK_D14F4E67C33F7837');
        $this->addSql('DROP TABLE document');
        $this->addSql('DROP TABLE document_accueil');
        $this->addSql('DROP TABLE message');
        $this->addSql('DROP TABLE message_document');
        $this->addSql('ALTER TABLE utilisateur ADD civilite VARCHAR(255) NOT NULL, ADD roles LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', ADD expires_at DATETIME NOT NULL, ADD confirmation_token VARCHAR(255) DEFAULT NULL, ADD password_requested_at DATETIME DEFAULT NULL, ADD recevoir_notif_school_email TINYINT(1) NOT NULL, ADD force_change_password TINYINT(1) DEFAULT NULL');
    }
}
