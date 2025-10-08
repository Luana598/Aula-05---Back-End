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

SElECT * FROM tbl_filme;