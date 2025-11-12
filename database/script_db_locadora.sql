CREATE DATABASE db_locadora_filme_ds2m_25_2;
USE db_locadora_filme_ds2m_25_2;

CREATE TABLE tbl_filme (
	filme_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	nome VARCHAR(100) NOT NULL,
	sinopse TEXT NULL,
	data_lancamento DATE NULL,
	duracao TIME NOT NULL,
	orcamento DECIMAL(11,2) NOT NULL,
	trailer VARCHAR(200) NULL,
	capa VARCHAR(200) NOT NULL
);

INSERT INTO tbl_filme ( nome, 
						sinopse,
                        data_lancamento, 
                        duracao,
                        orcamento,
                        trailer,
                        capa
)VALUES( 'Demon Slayer: Kimetsu no Yaiba - Castelo Infinito',
		  'Em Demon Slayer: Kimetsu no Yaiba – Castelo Infinito, Tanjiro tem sua vida destruída após sua família ser morta por demônios, restando apenas sua irmã Nezuko, transformada em uma Oni. Determinado a curá-la e vingar seus pais, ele se junta à Tropa dos Caçadores de Demônios. Ao lado de Nezuko, Zenitsu e Inosuke, Tanjiro enfrenta batalhas intensas e treina com os espadachins mais poderosos para a luta final em um misterioso castelo onde o destino de todos será decidido.',
          '2025-09-11',
          '02:36:00',
          '20000000',
          'https://www.youtube.com/watch?v=3UiP4GwWNv0',
          'https://br.web.img3.acsta.net/c_310_420/img/9c/0f/9c0f6e33b4fafe1a3490b3fe4b4d7cce.jpg'
);

INSERT INTO tbl_filme ( nome, 
						sinopse,
                        data_lancamento, 
                        duracao,
                        orcamento,
                        trailer,
                        capa
)VALUES( 'Homem-Aranha: Sem Volta para Casa',
		  'Em Homem-Aranha: Sem Volta para Casa, após ter sua identidade revelada e ver sua vida virar um caos, Peter Parker pede ajuda ao Doutor Estranho para que todos esqueçam quem ele é. Porém, o feitiço dá errado e traz vilões de outros universos para o seu mundo. Agora, Peter precisa enfrentar esses inimigos, corrigir o erro e entender, de uma vez por todas, o verdadeiro peso de ser o Homem-Aranha.',
          '2021-12-16',
          '02:28:00',
          '200000000',
          'https://www.youtube.com/watch?v=3UiP4GwWNv0',
          'https://br.web.img3.acsta.net/c_310_420/img/9c/0f/9c0f6e33b4fafe1a3490b3fe4b4d7cce.jpg'
);

SHOW TABLES;

SElECT * FROM tbl_filme;
DELETE FROM tbl_filme WHERE filme_id = 54;

SElECT filme_id FROM tbl_filme ORDER BY filme_id DESC LIMIT 1;

-- criação da tabela gênero
CREATE TABLE tbl_genero (
	genero_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	nome VARCHAR(100) NOT NULL
);


INSERT INTO tbl_genero (nome)VALUES( 'Romance');
INSERT INTO tbl_genero (nome)VALUES( 'Comédia');
INSERT INTO tbl_genero (nome)VALUES( 'Ficção Científica');
INSERT INTO tbl_genero (nome)VALUES( 'Fantasia');

SElECT * FROM tbl_filme_genero;
delete from tbl_filme_genero where filme_id > 17;

select * from tbl_genero order by genero_id desc;

-- criação da tabela de relacionamento entre filme e gênero
CREATE TABLE tbl_filme_genero (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	filme_id INT NOT NULL,
	genero_id INT NOT NULL,
	FOREIGN KEY (filme_id) REFERENCES tbl_filme (filme_id),
	FOREIGN KEY (genero_id) REFERENCES tbl_genero (genero_id)
);

-- criação da tabela de atores
CREATE TABLE tbl_atores (
	ator_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	nome VARCHAR(150) NOT NULL,
	nome_artistico VARCHAR(150) NULL,
	data_nascimento DATE NULL,
	nacionalidade VARCHAR(100) NULL,
	biografia TEXT NULL,
	foto VARCHAR(255) NULL
);

-- exemplos de atores inseridos
INSERT INTO tbl_atores (
	nome,
	nome_artistico,
	data_nascimento,
	nacionalidade,
	biografia,
	foto
) VALUES
('Tom Holland',
 'Tom Holland',
 '1996-06-01',
 'Britânico',
 'Ator conhecido por interpretar o Homem-Aranha no Universo Cinematográfico da Marvel.',
 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tom_Holland_2018.jpg'
),
('Natsuki Hanae',
 'Natsuki Hanae',
 '1991-06-26',
 'Japonês',
 'Dublador e ator japonês conhecido por dar voz ao personagem Tanjiro Kamado em Demon Slayer.',
 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Natsuki_Hanae_2019.jpg');
 
 select * from tbl_atores;

delete from tbl_filme where filme_id > 17;

DELIMITER $$

CREATE TRIGGER trg_delete_relacoes_filme
BEFORE DELETE ON tbl_filme
FOR EACH ROW
BEGIN
    DELETE FROM tbl_filme_genero WHERE filme_id = OLD.filme_id;
END$$

DELIMITER ;

SHOW TRIGGERS;

 select * from tbl_filme;
  select * from tbl_atores;
CREATE TABLE tbl_filme_ator (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
	filme_id INT NOT NULL,
	ator_id INT NOT NULL,
	FOREIGN KEY (filme_id) REFERENCES tbl_filme (filme_id),
	FOREIGN KEY (ator_id) REFERENCES tbl_atores (ator_id)
);

INSERT INTO tbl_filme_ator (filme_id, ator_id) VALUES
(8, 11), -- Demon Slayer → Natsuki Hanae
(6, 2);

select * from tbl_filme_ator order by id desc;
select * from tbl_filme_ator where id = 4;
select * from tbl_filme_ator;

select tbl_atores.ator_id, tbl_atores.nome
                    from tbl_filme
                        inner join tbl_filme_ator
                            on tbl_filme.filme_id = tbl_filme_ator.filme_id
                        inner join tbl_atores
                            on tbl_atores.ator_id = tbl_filme_ator.ator_id
                    where tbl_filme.filme_id = 8;

select tbl_filme.filme_id, tbl_filme.nome
                    from tbl_filme 
                        inner join tbl_filme_ator
                            on tbl_filme.filme_id = tbl_filme_ator.filme_id
                        inner join tbl_atores
                            on tbl_atores.ator_id = tbl_filme_ator.ator_id
                    where tbl_atores.ator_id = 11;
                    
                    select id from tbl_filme_ator order by id desc limit 1;