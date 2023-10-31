#!/usr/bin/env php

if [ "$APP_ENV" != "prod" ] ;
then
    # force test env
    export APP_ENV=dev
    ./bin/console doctrine:schema:drop --force
    ./bin/console doctrine:query:sql "BEGIN
                                         EXECUTE IMMEDIATE 'DROP TABLE DOCTRINE_MIGRATION_VERSIONS';
                                      EXCEPTION
                                         WHEN OTHERS THEN
                                            IF SQLCODE != -942 THEN
                                               RAISE;
                                            END IF;
                                      END;"
    ./bin/console doctrine:query:sql "BEGIN
                                           EXECUTE IMMEDIATE 'DROP TABLE messenger_messages';
                                        EXCEPTION
                                           WHEN OTHERS THEN
                                              IF SQLCODE != -942 THEN
                                                 RAISE;
                                              END IF;
                                        END;"
    ./bin/console doctrine:query:sql "BEGIN
                                             EXECUTE IMMEDIATE 'DROP SEQUENCE MESSENGER_MESSAGES_SEQ';
                                         EXCEPTION
                                              WHEN OTHERS THEN
                                              IF SQLCODE != -942 THEN
                                               RAISE;
                                          END IF;
                                      END;"
    ./bin/console doctrine:schema:create
    ./bin/console doctrine:fixtures:load --no-interaction --group=dev

else
	echo "no tests on prod"
fi
