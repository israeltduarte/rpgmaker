INSERT INTO itrole (id, name) VALUES ('RM_ROLE_' || gen_random_uuid(), 'ROLE_USER');
INSERT INTO itrole (id, name) VALUES ('RM_ROLE_' || gen_random_uuid(), 'ROLE_ADMIN');

INSERT INTO ituser (id, name, last_name, email, username, password, updated, created) VALUES ('ITUser_' || gen_random_uuid(), 'Gabrielle', 'Almeida', 'gabriellerar@gmail.com', 'gabriellerar', 'vento123', now(), now());
INSERT INTO ituser (id, name, last_name, email, username, password, updated, created) VALUES ('ITUser_' || gen_random_uuid(), 'Israel', 'Duarte', 'israeltduarte@gmail.com', 'israeltduarte', 'vento123', now(), now());

INSERT INTO itusers_itroles (ituser_id, itrole_id) VALUES ((SELECT id FROM ituser WHERE username = 'israeltduarte'), (SELECT id FROM itrole WHERE name = 'ROLE_USER'));
INSERT INTO itusers_itroles (ituser_id, itrole_id) VALUES ((SELECT id FROM ituser WHERE username = 'gabriellerar'), (SELECT id FROM itrole WHERE name = 'ROLE_ADMIN'));



