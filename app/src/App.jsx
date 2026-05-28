import { useState } from 'react';

const TOPICS = {
  twoAndAHalfMen: {
    label: 'Two and a Half Men',
    description: 'A comédia sobre Charlie, Alan e Jake Harper',
    accent: '#f59e0b',
    questions: [
      { question: 'Qual é a profissão de Charlie Harper?', options: ['Médico', 'Compositor de jingles', 'Advogado', 'Professor', 'Arquiteto'], correct: 1 },
      { question: 'Qual é o nome do irmão de Charlie Harper?', options: ['Jake', 'Walden', 'Alan', 'Herb', 'Berta'], correct: 2 },
      { question: 'Qual é o nome do filho de Alan Harper?', options: ['Charlie', 'Walden', 'Herb', 'Jake', 'Larry'], correct: 3 },
      { question: 'Onde fica a casa de Charlie Harper?', options: ['Santa Monica', 'Beverly Hills', 'Malibu', 'Venice Beach', 'Calabasas'], correct: 2 },
      { question: 'Qual é o nome da empregada da casa de Charlie?', options: ['Evelyn', 'Judith', 'Chelsea', 'Berta', 'Lyndsey'], correct: 3 },
      { question: 'Qual é a profissão de Alan Harper?', options: ['Dentista', 'Médico', 'Quiropraxista', 'Fisioterapeuta', 'Psicólogo'], correct: 2 },
      { question: 'Qual é o nome da mãe de Charlie e Alan?', options: ['Judith', 'Berta', 'Chelsea', 'Evelyn', 'Lyndsey'], correct: 3 },
      { question: 'Qual atriz interpreta a mãe Evelyn Harper?', options: ['Conchata Ferrell', 'Marin Hinkle', 'Holland Taylor', 'Melanie Lynskey', 'Jennifer Taylor'], correct: 2 },
      { question: 'Qual ator interpretou Charlie Harper?', options: ['Ashton Kutcher', 'Jon Cryer', 'Angus T. Jones', 'Charlie Sheen', 'John Stamos'], correct: 3 },
      { question: 'Qual personagem substitui Charlie Harper na série?', options: ['Alan Harper', 'Jake Harper', 'Herb Melnick', 'Walden Schmidt', 'Larry'], correct: 3 },
      { question: 'Qual ator interpreta Walden Schmidt?', options: ['Charlie Sheen', 'Jon Cryer', 'Ashton Kutcher', 'Ryan Stiles', 'John Stamos'], correct: 2 },
      { question: 'Com quem Alan Harper era casado antes da série começar?', options: ['Chelsea', 'Berta', 'Evelyn', 'Lyndsey', 'Judith'], correct: 4 },
      { question: 'Em qual canal americano a série foi exibida?', options: ['NBC', 'ABC', 'CBS', 'FOX', 'HBO'], correct: 2 },
      { question: 'Quantas temporadas tem Two and a Half Men?', options: ['8', '9', '10', '11', '12'], correct: 4 },
      { question: 'Qual ator interpretou Alan Harper?', options: ['Charlie Sheen', 'Jon Cryer', 'Angus T. Jones', 'Ashton Kutcher', 'Ryan Stiles'], correct: 1 },
      { question: 'O que Jake faz ao crescer na série?', options: ['Vira médico', 'Se torna músico', 'Entra para o exército', 'Vai para a faculdade', 'Abre um negócio'], correct: 2 },
      { question: 'Qual era o principal vício de Charlie Harper?', options: ['Cigarro', 'Jogo', 'Drogas', 'Álcool', 'Comida'], correct: 3 },
      { question: 'Quem criou a série Two and a Half Men?', options: ['Shonda Rhimes', 'David Chase', 'Chuck Lorre', 'Matt Groening', 'Seth MacFarlane'], correct: 2 },
      { question: 'Qual é a ex-esposa de Alan com quem ele tem conflitos constantes?', options: ['Chelsea', 'Evelyn', 'Lyndsey', 'Judith', 'Berta'], correct: 3 },
      { question: 'Qual atriz interpretou Berta, a empregada?', options: ['Holland Taylor', 'Conchata Ferrell', 'Marin Hinkle', 'Melanie Lynskey', 'April Bowlby'], correct: 1 },
      { question: 'O que acontece com Charlie Harper no início da 9ª temporada?', options: ['Vai para a prisão', 'Morre atropelado por um trem em Paris', 'Emigra para o Japão', 'Entra em reabilitação', 'Desaparece misteriosamente'], correct: 1 },
      { question: 'Qual atriz interpretou Judith Harper, ex-esposa de Alan?', options: ['Holland Taylor', 'Conchata Ferrell', 'Marin Hinkle', 'April Bowlby', 'Melanie Lynskey'], correct: 2 },
      { question: 'Qual é a profissão de Herb Melnick, segundo marido de Judith?', options: ['Dentista', 'Advogado', 'Médico', 'Policial', 'Engenheiro'], correct: 2 },
      { question: 'Como Walden Schmidt ficou bilionário?', options: ['Herdou da família', 'Ganhou na loteria', 'Vendeu uma empresa de tecnologia', 'É ator famoso', 'Investiu em imóveis'], correct: 2 },
      { question: 'Qual era o nome da namorada de Charlie que quase se casou com ele?', options: ['Kandi', 'Lyndsey', 'Chelsea', 'Melissa', 'Gloria'], correct: 2 },
      { question: 'Qual atriz interpretou Kandi, namorada de Alan?', options: ['Marin Hinkle', 'Holland Taylor', 'Melanie Lynskey', 'April Bowlby', 'Jennifer Taylor'], correct: 3 },
      { question: 'Quem é o pai biológico de Jake Harper?', options: ['Charlie Harper', 'Herb Melnick', 'Alan Harper', 'Walden Schmidt', 'Larry'], correct: 2 },
      { question: 'Qual personagem descobre ser filha biológica de Charlie Harper?', options: ['Lyndsey', 'Chelsea', 'Jenny', 'Missi', 'Zoey'], correct: 2 },
      { question: 'Em que temporada Walden Schmidt entra na série como personagem principal?', options: ['7ª', '8ª', '9ª', '10ª', '11ª'], correct: 2 },
      { question: 'Qual instrumento Charlie Harper toca em casa com frequência?', options: ['Guitarra', 'Bateria', 'Piano', 'Violino', 'Saxofone'], correct: 2 },
      { question: 'Qual personagem é constantemente ridicularizado e explorado financeiramente pelos outros?', options: ['Charlie Harper', 'Jake Harper', 'Walden Schmidt', 'Alan Harper', 'Herb Melnick'], correct: 3 },
      { question: 'Qual é o nome da ex-esposa de Walden Schmidt?', options: ['Chelsea', 'Lyndsey', 'Bridget', 'Kandi', 'Melissa'], correct: 2 },
      { question: 'Como Alan Harper evita pagar aluguel ao longo de quase toda a série?', options: ['Paga com serviços de quiropraxia', 'Mora de graça na casa de Charlie e depois de Walden', 'Aluga um quarto barato no bairro', 'Mora com a mãe Evelyn', 'Vive em seu consultório'], correct: 1 },
      { question: 'Qual é o nome da namorada de Alan com quem ele tem um longo relacionamento após o divórcio?', options: ['Kandi', 'Chelsea', 'Lyndsey', 'Melissa', 'Bridget'], correct: 2 },
      { question: 'Qual é a profissão de Walden Schmidt antes de vender sua empresa?', options: ['Chef', 'Músico', 'Desenvolvedor de software', 'Médico', 'Advogado'], correct: 2 },
      { question: 'Qual é a relação familiar entre Charlie e Alan Harper?', options: ['São primos', 'São meio-irmãos', 'São irmãos', 'São amigos de infância', 'São colegas de faculdade'], correct: 2 },
      { question: 'Qual foi o principal motivo da saída de Charlie Sheen da série?', options: ['Problemas de saúde graves', 'Queria focar em filmes', 'Conflitos públicos com o produtor Chuck Lorre', 'Salário abaixo do esperado', 'Pedido voluntário para sair'], correct: 2 },
      { question: 'Qual ator interpreta Jake Harper, o "meio homem" do título?', options: ['Jon Cryer', 'Charlie Sheen', 'Ashton Kutcher', 'Angus T. Jones', 'Ryan Stiles'], correct: 3 },
      { question: 'O que acontece no episódio final da série com um personagem surpresa?', options: ['Alan ganha na loteria', 'Jake volta do exército formado', 'Charlie aparece na porta e é esmagado por um piano', 'Walden e Alan adotam uma criança', 'Berta revela um segredo sobre Charlie'], correct: 2 },
      { question: 'Qual personagem frequentemente aparece de surpresa e sem convite na casa de Charlie e Walden?', options: ['Evelyn Harper', 'Judith Harper', 'Lyndsey', 'Chelsea', 'Kandi'], correct: 0 },
    ],
  },
  friends: {
    label: 'Friends',
    description: 'A série clássica de comédia dos anos 90',
    accent: '#d97706',
    questions: [
      { question: 'Qual é o sobrenome de Rachel?', options: ['Green', 'Bing', 'Geller', 'Buffay', 'Tribbiani'], correct: 0 },
      { question: 'Qual personagem é paleontólogo e professor universitário?', options: ['Chandler', 'Joey', 'Ross', 'Monica', 'Phoebe'], correct: 2 },
      { question: 'Qual é o nome do café frequentado pelo grupo?', options: ['Friends Cafe', 'The Brew', 'Central Perk', 'Coffee House', "Java Joe's"], correct: 2 },
      { question: 'Quem canta "Smelly Cat"?', options: ['Monica', 'Rachel', 'Phoebe', 'Carol', 'Janice'], correct: 2 },
      { question: 'Qual o nome do macaco de Ross?', options: ['Bubbles', 'Marcel', 'Coco', 'Kiko', 'Chester'], correct: 1 },
      { question: 'Qual é a profissão de Monica Geller?', options: ['Médica', 'Advogada', 'Chef', 'Atriz', 'Professora'], correct: 2 },
      { question: 'Quantas vezes Ross foi divorciado até o final da série?', options: ['1', '2', '3', '4', '5'], correct: 2 },
      { question: 'Qual atriz interpreta Monica Geller?', options: ['Jennifer Aniston', 'Lisa Kudrow', 'Courteney Cox', 'Marta Kauffman', 'Maggie Wheeler'], correct: 2 },
      { question: 'Com quem Monica se casa na série?', options: ['Joey', 'Ross', 'Richard', 'Chandler', 'Mike'], correct: 3 },
      { question: 'Qual o nome da filha de Ross e Rachel?', options: ['Anna', 'Emma', 'Sophie', 'Lily', 'Claire'], correct: 1 },
      { question: 'Quem tem uma irmã gêmea chamada Ursula?', options: ['Monica', 'Rachel', 'Phoebe', 'Joey', 'Chandler'], correct: 2 },
      { question: 'Qual personagem trabalhou como ator em soap operas?', options: ['Chandler', 'Joey', 'Ross', 'Mike', 'Gunther'], correct: 1 },
      { question: 'Em qual cidade a série Friends se passa?', options: ['Los Angeles', 'Chicago', 'Nova York', 'Boston', 'Miami'], correct: 2 },
      { question: 'Quantas temporadas tem Friends?', options: ['8', '9', '10', '11', '12'], correct: 2 },
      { question: 'Qual o nome do marido de Phoebe no final da série?', options: ['David', 'Mike', 'Gary', 'Eric', 'Charlie'], correct: 1 },
      { question: 'Qual ator interpreta Chandler Bing?', options: ['Matt LeBlanc', 'Matthew Perry', 'David Schwimmer', 'Cole Sprouse', 'James Michael Tyler'], correct: 1 },
      { question: 'Qual personagem fugiu do próprio casamento no episódio piloto?', options: ['Monica', 'Rachel', 'Phoebe', 'Carol', 'Emily'], correct: 1 },
      { question: 'Qual ator interpreta Joey Tribbiani?', options: ['Matthew Perry', 'Matt LeBlanc', 'David Schwimmer', 'James Michael Tyler', 'Cole Sprouse'], correct: 1 },
      { question: 'Qual é a profissão de Phoebe Buffay?', options: ['Médica', 'Advogada', 'Massagista', 'Cantora profissional', 'Professora'], correct: 2 },
      { question: 'Com qual personagem Rachel termina a série romanticamente?', options: ['Joey', 'Tag', 'Ross', 'Gunther', 'Barry'], correct: 2 },
      { question: 'Qual é o nome do primeiro noivo de Rachel, de quem ela foge no episódio piloto?', options: ['Ross Geller', 'Joey Tribbiani', 'Barry Farber', 'Paolo', 'Tag Jones'], correct: 2 },
      { question: 'Qual ator interpreta Ross Geller?', options: ['Matt LeBlanc', 'Matthew Perry', 'David Schwimmer', 'James Michael Tyler', 'Cole Sprouse'], correct: 2 },
      { question: 'Qual é o nome do personagem de Joey em "Days of Our Lives"?', options: ['Mike Hannigan', 'Drake Ramoray', 'Joseph Tribbiani', 'Hans Ramoray', 'Victor Kiriakis'], correct: 1 },
      { question: 'Qual é a frase icônica de Ross ao tentar carregar um sofá pelas escadas?', options: ['Could this BE any harder?', 'We were on a break!', 'PIVOT!', "How you doin'?", 'Oh my God!'], correct: 2 },
      { question: "Qual é a frase icônica de Joey ao paquerar alguém?", options: ['Could this BE any more fun?', "How you doin'?", 'We were on a break!', 'Pivot!', 'Oh my God!'], correct: 1 },
      { question: 'Qual atriz interpreta Phoebe Buffay?', options: ['Jennifer Aniston', 'Courteney Cox', 'Lisa Kudrow', 'Maggie Wheeler', 'Helen Baxendale'], correct: 2 },
      { question: 'Qual atriz interpreta Rachel Green?', options: ['Courteney Cox', 'Lisa Kudrow', 'Jennifer Aniston', 'Maggie Wheeler', 'Helen Baxendale'], correct: 2 },
      { question: 'Em qual emissora americana Friends foi transmitido originalmente?', options: ['CBS', 'ABC', 'NBC', 'FOX', 'HBO'], correct: 2 },
      { question: 'Em qual empresa famosa Rachel Green trabalha como compradora de moda?', options: ['Gucci', 'Prada', 'Ralph Lauren', 'Calvin Klein', "Bloomingdale's"], correct: 2 },
      { question: 'Qual personagem é conhecida pela voz irritante e pela frase "Oh my God"?', options: ['Emily', 'Carol', 'Ursula', 'Janice', 'Mona'], correct: 3 },
      { question: 'Qual é o nome da ex-esposa de Ross que descobre ser lésbica?', options: ['Emily', 'Rachel', 'Carol', 'Susan', 'Mona'], correct: 2 },
      { question: 'Quantos filhos Ross tem ao final da série?', options: ['1', '2', '3', '4', '0'], correct: 1 },
      { question: 'Qual foi a primeira profissão de Rachel quando ela começa a vida independente em Nova York?', options: ['Estilista', 'Recepcionista', 'Garçonete no Central Perk', 'Professora', 'Chef assistente'], correct: 2 },
      { question: 'Qual é o nome do namorado cientista de Phoebe que vai trabalhar em Minsk?', options: ['Eric', 'Gary', 'David', 'Frank Jr.', 'Roger'], correct: 2 },
      { question: 'Qual personagem tem medo de comprometimento, um tema central em seu arco na série?', options: ['Ross', 'Joey', 'Monica', 'Chandler', 'Phoebe'], correct: 3 },
      { question: 'Em qual temporada nasce a filha de Ross e Rachel, Emma?', options: ['6ª', '7ª', '8ª', '9ª', '10ª'], correct: 2 },
      { question: 'Quem criou a série Friends junto com Marta Kauffman?', options: ['Chuck Lorre', 'David Crane', 'Greg Daniels', 'JJ Abrams', 'Seth MacFarlane'], correct: 1 },
      { question: 'Qual personagem de Friends teve um spin-off com seu nome?', options: ['Ross', 'Monica', 'Phoebe', 'Joey', 'Chandler'], correct: 3 },
      { question: 'Qual é a frase icônica de Ross sobre o fim do seu relacionamento com Rachel?', options: ['Could this BE any more complicated?', 'We were on a break!', 'She is my lobster!', 'I got off the plane!', 'Seven!'], correct: 1 },
      { question: 'O que Rachel decide no final da série ao ter que escolher entre Paris e Ross?', options: ['Vai para Paris e encerra o relacionamento', 'Fica em Nova York e fica com Ross', 'Vai para Paris mas promete voltar', 'Rejeita Ross e aceita o emprego', 'Aceita proposta de casamento de Joey'], correct: 1 },
    ],
  },
  got: {
    label: 'Game of Thrones',
    description: 'A saga épica de Westeros',
    accent: '#dc2626',
    questions: [
      { question: 'Qual é o lema da Casa Stark?', options: ['Ouça-me rugir', 'O inverno está chegando', 'Fogo e Sangue', 'Crescemos forte', 'Nós não semeamos'], correct: 1 },
      { question: 'Quem senta no Trono de Ferro ao final da série?', options: ['Jon Snow', 'Daenerys', 'Sansa Stark', 'Bran Stark', 'Tyrion Lannister'], correct: 3 },
      { question: 'Qual é o nome do lobo-gigante de Jon Snow?', options: ['Grey Wind', 'Ghost', 'Nymeria', 'Lady', 'Summer'], correct: 1 },
      { question: 'Quem mata o Rei da Noite?', options: ['Jon Snow', 'Daenerys', 'Arya Stark', 'Bran Stark', 'Theon Greyjoy'], correct: 2 },
      { question: 'Qual personagem diz "Dracarys" para seus dragões?', options: ['Jon Snow', 'Cersei', 'Daenerys', 'Melisandre', 'Tyrion'], correct: 2 },
      { question: 'Qual é o nome verdadeiro de Jon Snow?', options: ['Rhaegar Targaryen', 'Aegon Targaryen', 'Viserys Targaryen', 'Daeron Targaryen', 'Aemon Targaryen'], correct: 1 },
      { question: 'Em qual cidade fica o Trono de Ferro?', options: ['Winterfell', 'Porto Real', 'Pedra do Dragão', 'Casterly Rock', 'Braavos'], correct: 1 },
      { question: 'Qual é o nome da espada de Arya Stark?', options: ['Gelo', 'Agulha', 'Longclaw', 'Coração de Leão', 'Guarda-viúvas'], correct: 1 },
      { question: 'Quantos dragões Daenerys possui?', options: ['1', '2', '3', '4', '5'], correct: 2 },
      { question: 'Qual personagem usa o codinome "Ninguém" ao se treinar?', options: ['Sansa Stark', 'Arya Stark', 'Cersei', 'Margaery', 'Melisandre'], correct: 1 },
      { question: 'Quem escreveu os livros que inspiraram Game of Thrones?', options: ['J.R.R. Tolkien', 'George R. R. Martin', 'Terry Pratchett', 'Brandon Sanderson', 'Patrick Rothfuss'], correct: 1 },
      { question: 'Quem mata Joffrey Baratheon?', options: ['Tyrion Lannister', 'Sansa Stark', 'Olenna Tyrell', 'Arya Stark', 'Daenerys'], correct: 2 },
      { question: 'Qual é o nome da espada Valyrian de Jon Snow?', options: ['Gelo', 'Agulha', 'Longclaw', 'Coração de Leão', 'Guarda-viúvas'], correct: 2 },
      { question: 'O que é a Guarda da Noite?', options: ['Um grupo de assassinos', 'Uma ordem que defende a Muralha', 'Os guardas pessoais do rei', 'Um exército Targaryen', 'Os cavaleiros de Casterly Rock'], correct: 1 },
      { question: 'Quem mata Ramsay Bolton?', options: ['Jon Snow', 'Arya Stark', 'Sansa Stark', 'Rickon Stark', 'Brienne of Tarth'], correct: 2 },
      { question: 'Qual frase é informalmente associada à Casa Lannister?', options: ['O inverno está chegando', 'Fogo e Sangue', 'Um Lannister sempre paga suas dívidas', 'Nós não semeamos', 'Crescemos forte'], correct: 2 },
      { question: 'Qual dragão o Rei da Noite mata e ressuscita?', options: ['Drogon', 'Rhaegal', 'Viserion', 'Balerion', 'Meraxes'], correct: 2 },
      { question: 'Quem é o pai biológico de Jon Snow?', options: ['Ned Stark', 'Robert Baratheon', 'Rhaegar Targaryen', 'Tywin Lannister', 'Stannis Baratheon'], correct: 2 },
      { question: 'Qual personagem segurou a porta para salvar Bran?', options: ['Bran', 'Hodor', 'Sam', 'Jojen', 'Meera'], correct: 1 },
      { question: 'Como é chamado o grupo de assassinos treinados em Braavos?', options: ['Sparrows', 'Homens sem Rosto', 'Imaculados', 'Dothraki', 'Maesters'], correct: 1 },
      { question: 'Qual é o nome do pai adotivo de Jon Snow?', options: ['Tywin Lannister', 'Robert Baratheon', 'Ned Stark', 'Stannis Baratheon', 'Mance Rayder'], correct: 2 },
      { question: 'Qual é o lema da Casa Targaryen?', options: ['O inverno está chegando', 'Fogo e Sangue', 'Ouça-me rugir', 'Nós não semeamos', 'Crescemos forte'], correct: 1 },
      { question: 'Qual é o lema da Casa Lannister?', options: ['Crescemos forte', 'Fogo e Sangue', 'Ouça-me rugir', 'O inverno está chegando', 'Nós não semeamos'], correct: 2 },
      { question: 'Qual personagem é conhecido como "A Montanha" (The Mountain)?', options: ['Jaime Lannister', 'Sandor Clegane', 'Gregor Clegane', 'Bronn', 'Tormund'], correct: 2 },
      { question: 'Qual personagem é conhecido como "O Cão" (The Hound)?', options: ['Gregor Clegane', 'Sandor Clegane', 'Jaime Lannister', 'Bronn', 'Podrick'], correct: 1 },
      { question: 'Qual é o nome da série de livros que inspirou Game of Thrones?', options: ['O Senhor dos Anéis', 'As Crônicas de Gelo e Fogo', 'A Roda do Tempo', 'O Nome do Vento', 'Eragon'], correct: 1 },
      { question: 'Qual é o nome do pai de Cersei, Jaime e Tyrion Lannister?', options: ['Robert Baratheon', 'Kevan Lannister', 'Tywin Lannister', 'Stannis Baratheon', 'Lancel Lannister'], correct: 2 },
      { question: 'Qual personagem Lannister é apelidado de "Imp" ou "Meio Homem"?', options: ['Cersei', 'Jaime', 'Tyrion', 'Lancel', 'Kevan'], correct: 2 },
      { question: 'Em qual região de Westeros fica Winterfell, sede da Casa Stark?', options: ['Sul de Westeros', 'Ilhas do Ferro', 'Norte de Westeros', 'Riverlands', 'Vale de Arryn'], correct: 2 },
      { question: 'Qual é o nome do maior e principal dragão de Daenerys?', options: ['Viserion', 'Rhaegal', 'Drogon', 'Balerion', 'Meraxes'], correct: 2 },
      { question: 'Quem é conhecida como a "Rainha dos Espinhos" (Queen of Thorns)?', options: ['Cersei Lannister', 'Margaery Tyrell', 'Olenna Tyrell', 'Melisandre', 'Catelyn Stark'], correct: 2 },
      { question: 'O que são os Caminhantes Brancos (White Walkers)?', options: ['Soldados de Daenerys', 'Criaturas de gelo que ameaçam toda a humanidade', 'Espiões da Coroa', 'Monges da Fé dos Sete', 'Mercenários das Ilhas do Ferro'], correct: 1 },
      { question: 'Qual personagem é o conselheiro eunuco mestre em espionagem, conhecido como "A Aranha"?', options: ['Petyr Baelish', 'Qyburn', 'Grand Maester Pycelle', 'Varys', 'Davos Seaworth'], correct: 3 },
      { question: 'Qual evento trágico é chamado de "Casamento Vermelho"?', options: ['O casamento de Joffrey Baratheon', 'O casamento de Daenerys com Khal Drogo', 'O massacre de Robb Stark e aliados durante uma celebração', 'O casamento de Tyrion com Sansa', 'O casamento de Robb com Talisa'], correct: 2 },
      { question: 'Qual é o nome do continente principal onde se passa a maior parte da série?', options: ['Essos', 'Sothoryos', 'Westeros', 'Valyria', 'Braavos'], correct: 2 },
      { question: "Qual deus é adorado por Melisandre, a Sacerdotisa Vermelha?", options: ['Os Sete', 'O Deus de Muitas Faces', "O Senhor da Luz (R'hllor)", 'Os Antigos Deuses', 'O Deus Afogado'], correct: 2 },
      { question: 'Qual personagem é chamado de "Littlefinger" (Dedo Mindinho)?', options: ['Varys', 'Qyburn', 'Petyr Baelish', 'Grand Maester Pycelle', 'Davos Seaworth'], correct: 2 },
      { question: 'Qual foi o rei que governava os Sete Reinos logo antes dos eventos da série?', options: ['Joffrey Baratheon', 'Stannis Baratheon', 'Robert Baratheon', 'Renly Baratheon', 'Aerys Targaryen'], correct: 2 },
      { question: 'Qual é a moeda de ouro oficial usada em Westeros?', options: ['Ouro Lannister', 'Dragão de Ouro', 'Corvo de Prata', 'Stag de Ouro', 'Groat de Ferro'], correct: 1 },
      { question: 'O que Arya Stark decide fazer ao final da série?', options: ['Fica em Winterfell como Lady Stark', 'Casa com Gendry e vai para Pedra da Tempestade', 'Explora o mundo além dos mapas conhecidos', 'Vai governar Braavos', 'Torna-se a nova Rainha do Norte'], correct: 2 },
    ],
  },
  theOffice: {
    label: 'The Office',
    description: 'O cotidiano hilário da Dunder Mifflin em Scranton',
    accent: '#64748b',
    questions: [
      { question: 'Qual é o nome do gerente regional interpretado por Steve Carell?', options: ['Dwight Schrute', 'Jim Halpert', 'Michael Scott', 'Andy Bernard', 'Ryan Howard'], correct: 2 },
      { question: 'Em qual cidade fica a filial da Dunder Mifflin na série?', options: ['Nova York', 'Philadelphia', 'Scranton', 'Pittsburgh', 'Allentown'], correct: 2 },
      { question: 'Qual é o produto vendido pela Dunder Mifflin?', options: ['Impressoras', 'Computadores', 'Móveis de escritório', 'Papel', 'Software'], correct: 3 },
      { question: 'Com quem Jim Halpert se casa na série?', options: ['Kelly Kapoor', 'Angela Martin', 'Meredith Palmer', 'Pam Beesly', 'Jan Levinson'], correct: 3 },
      { question: 'Qual ator interpreta Dwight Schrute?', options: ['John Krasinski', 'Ed Helms', 'Rainn Wilson', 'Craig Robinson', 'BJ Novak'], correct: 2 },
      { question: 'Qual é a famosa frase de duplo sentido que Michael Scott repete constantemente?', options: ["That's what she said", 'I declare bankruptcy', 'Bears beets battlestar', 'Assistant to the manager', 'Identity theft is not a joke'], correct: 0 },
      { question: 'O que Dwight Schrute possui fora do trabalho?', options: ['Uma vinícola', 'Um haras', 'Uma fazenda de beterraba', 'Um restaurante', 'Uma loja de armas'], correct: 2 },
      { question: 'Quantas temporadas tem The Office (versão americana)?', options: ['7', '8', '9', '10', '11'], correct: 2 },
      { question: 'Em qual país foi produzida a versão original de The Office?', options: ['Austrália', 'Canadá', 'Reino Unido', 'Alemanha', 'França'], correct: 2 },
      { question: 'Qual é o cargo oficial de Dwight Schrute?', options: ['Gerente Regional', 'Gerente Regional Assistente', 'Assistente do Gerente Regional', 'Diretor de Vendas', 'Supervisor de Vendas'], correct: 2 },
      { question: 'Qual atriz interpreta Pam Beesly?', options: ['Mindy Kaling', 'Angela Kinsey', 'Ellie Kemper', 'Jenna Fischer', 'Kate Flannery'], correct: 3 },
      { question: 'Qual personagem é obcecada por gatos e trabalha como contadora?', options: ['Kevin Malone', 'Oscar Martinez', 'Angela Martin', 'Phyllis Vance', 'Meredith Palmer'], correct: 2 },
      { question: 'Quem se torna gerente regional após Michael Scott sair?', options: ['Jim Halpert', 'Dwight Schrute', 'Andy Bernard', 'Robert California', 'Deangelo Vickers'], correct: 2 },
      { question: 'Em qual formato de filmagem a série é produzida?', options: ['Drama clássico', 'Mockumentary', 'Sitcom com plateia', 'Animação', 'Reality show'], correct: 1 },
      { question: 'Qual ator interpreta Jim Halpert?', options: ['Steve Carell', 'Rainn Wilson', 'Ed Helms', 'John Krasinski', 'BJ Novak'], correct: 3 },
      { question: 'Qual personagem começa como estagiário e chega a ser VP na empresa?', options: ['Jim Halpert', 'Andy Bernard', 'Ryan Howard', 'Darryl Philbin', 'Toby Flenderson'], correct: 2 },
      { question: 'Quem é o responsável de RH que Michael Scott odeia?', options: ['Kevin Malone', 'Oscar Martinez', 'Toby Flenderson', 'Stanley Hudson', 'Creed Bratton'], correct: 2 },
      { question: 'Qual é o nome do executivo corporativo da Dunder Mifflin que aparece com frequência?', options: ['Robert California', 'David Wallace', 'Charles Miner', 'Ryan Howard', 'Jo Bennett'], correct: 1 },
      { question: 'Quem adaptou The Office para a versão americana?', options: ['Ricky Gervais', 'Greg Daniels', 'Michael Schur', 'Chuck Lorre', 'JJ Abrams'], correct: 1 },
      { question: 'Em qual episódio Michael Scott retorna brevemente à série?', options: ['Finale da 8ª temporada', 'Finale da 9ª temporada', 'Premiere da 9ª temporada', 'Episódio de Halloween', 'Episódio de Natal'], correct: 1 },
      { question: 'Em qual estado americano fica a cidade de Scranton?', options: ['Nova Jersey', 'Nova York', 'Ohio', 'Pensilvânia', 'Connecticut'], correct: 3 },
      { question: 'Qual empresa compra a Dunder Mifflin durante a série?', options: ['Staples', 'Office Depot', 'Sabre', 'Walmart', 'Amazon'], correct: 2 },
      { question: 'Qual ator interpreta Andy Bernard?', options: ['John Krasinski', 'Rainn Wilson', 'Ed Helms', 'Craig Robinson', 'BJ Novak'], correct: 2 },
      { question: 'Qual personagem gerencia o armazém e depois é promovido para o escritório?', options: ['Kevin Malone', 'Oscar Martinez', 'Stanley Hudson', 'Darryl Philbin', 'Creed Bratton'], correct: 3 },
      { question: 'Qual personagem contador tem sua sexualidade revelada ao longo da série?', options: ['Kevin Malone', 'Oscar Martinez', 'Creed Bratton', 'Toby Flenderson', 'Ryan Howard'], correct: 1 },
      { question: 'Qual personagem é famoso por seu passado misterioso e comportamento excêntrico?', options: ['Kevin Malone', 'Meredith Palmer', 'Creed Bratton', 'Stanley Hudson', 'Phyllis Vance'], correct: 2 },
      { question: 'O que Jim Halpert frequentemente faz para demonstrar ironia para o espectador?', options: ['Grita para a câmera', 'Dança sozinho no escritório', 'Olha diretamente para a câmera com expressão irônica', 'Manda bilhetes para a produção', 'Faz gestos exagerados para os colegas'], correct: 2 },
      { question: 'Qual personagem tem um relacionamento secreto e longo com Angela Martin?', options: ['Jim Halpert', 'Andy Bernard', 'Dwight Schrute', 'Ryan Howard', 'Kevin Malone'], correct: 2 },
      { question: 'Em qual temporada Steve Carell deixou de ser regular em The Office?', options: ['5ª', '6ª', '7ª', '8ª', '9ª'], correct: 2 },
      { question: 'Qual personagem é conhecida por comportamento irresponsável e histórias absurdas?', options: ['Angela Martin', 'Kelly Kapoor', 'Meredith Palmer', 'Phyllis Vance', 'Erin Hannon'], correct: 2 },
      { question: 'Qual personagem é obcecada por celebridades e trabalha no atendimento ao cliente?', options: ['Pam Beesly', 'Kelly Kapoor', 'Erin Hannon', 'Angela Martin', 'Meredith Palmer'], correct: 1 },
      { question: 'Qual ator interpreta Ryan Howard, o estagiário?', options: ['Ed Helms', 'Craig Robinson', 'BJ Novak', 'Ellie Kemper', 'John Krasinski'], correct: 2 },
      { question: 'Qual ator interpreta Kevin Malone?', options: ['Craig Robinson', 'Oscar Nunez', 'Brian Baumgartner', 'Ed Helms', 'Ellie Kemper'], correct: 2 },
      { question: 'Qual personagem substitui Pam na recepção quando ela tenta seguir carreira artística?', options: ['Kelly Kapoor', 'Angela Martin', 'Meredith Palmer', 'Erin Hannon', 'Phyllis Vance'], correct: 3 },
      { question: 'Qual é o nome do prêmio interno criado por Michael Scott para homenagear os funcionários?', options: ['Office Awards', 'Dundie Awards', 'Scranton Awards', 'Mifflin Awards', 'Paper Awards'], correct: 1 },
      { question: 'Qual é o nome da empresa criada por Michael Scott ao deixar a Dunder Mifflin?', options: ["Scott's Paper Co", 'Michael Scott Paper Company', 'The Michael Company', 'Better Paper Inc', 'Mifflin Rivals'], correct: 1 },
      { question: 'Qual personagem tenta constantemente criar startups e projetos paralelos?', options: ['Jim Halpert', 'Andy Bernard', 'Dwight Schrute', 'Ryan Howard', 'Creed Bratton'], correct: 3 },
      { question: 'Qual personagem realiza seu sonho de ser artista ao final da série?', options: ['Kelly Kapoor', 'Angela Martin', 'Pam Beesly', 'Erin Hannon', 'Meredith Palmer'], correct: 2 },
      { question: 'Qual ator interpreta Oscar Martinez?', options: ['Craig Robinson', 'Oscar Nunez', 'Brian Baumgartner', 'BJ Novak', 'Ellie Kemper'], correct: 1 },
      { question: 'Qual ator interpreta Toby Flenderson, o gerente de RH?', options: ['Craig Robinson', 'BJ Novak', 'Paul Lieberstein', 'Brian Baumgartner', 'Ed Helms'], correct: 2 },
    ],
  },
};

function Home({ onSelect }) {
  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">Quiz</p>
        <h1>Escolha um tema</h1>
        <p className="subtitle">
          Selecione um dos temas abaixo para iniciar o quiz com 5 perguntas aleatórias.
        </p>
      </header>
      <div className="topic-grid">
        {Object.entries(TOPICS).map(([key, topic]) => (
          <button
            key={key}
            className="topic-card"
            style={{ '--accent': topic.accent }}
            onClick={() => onSelect(key)}
          >
            <span className="topic-label">{topic.label}</span>
            <span className="topic-desc">{topic.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Quiz({ topicKey, onBack }) {
  const topic = TOPICS[topicKey];
  const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const [selectedQuestions] = useState(() =>
    topic.questions.slice().sort(() => Math.random() - 0.5).slice(0, 5)
  );

  const handleOptionChange = (questionIndex, optionIndex) => {
    if (submitted) return;
    setSelectedOptions((current) => {
      const next = [...current];
      next[questionIndex] = optionIndex;
      return next;
    });
  };

  const handleSubmit = () => {
    const finalScore = selectedQuestions.reduce((acc, question, index) => {
      return acc + (selectedOptions[index] === question.correct ? 1 : 0);
    }, 0);
    setScore(finalScore);
    setSubmitted(true);
  };

  const unanswered = selectedOptions.some((option) => option === null);

  return (
    <div className="app-shell">
      <header className="hero">
        <button className="back-button" onClick={onBack}>← Voltar aos temas</button>
        <p className="eyebrow" style={{ color: topic.accent }}>{topic.label}</p>
        <h1>Teste seus conhecimentos</h1>
        <p className="subtitle">
          Responda 5 perguntas aleatórias. Depois de enviar, você verá sua nota final e as respostas corretas.
        </p>
      </header>
      <main className="card-grid">
        <section className="quiz-card">
          {selectedQuestions.map((question, questionIndex) => (
            <article key={questionIndex} className="question-card">
              <div className="question-header">
                <span>Pergunta {questionIndex + 1}</span>
                <p>{question.question}</p>
              </div>
              <div className="answers-list">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedOptions[questionIndex] === optionIndex;
                  const isCorrectAnswer = submitted && question.correct === optionIndex;
                  return (
                    <label
                      key={optionIndex}
                      className={`answer-option ${isSelected ? 'selected' : ''} ${isCorrectAnswer ? 'correct' : ''}`}
                    >
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        value={optionIndex}
                        checked={isSelected}
                        disabled={submitted}
                        onChange={() => handleOptionChange(questionIndex, optionIndex)}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </article>
          ))}
          <div className="actions-row">
            <button className="submit-button" onClick={handleSubmit} disabled={unanswered || submitted}>
              Confirmar respostas
            </button>
            {submitted && (
              <div className="result-box">
                Sua nota: <strong>{score} / 5</strong>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  const [topic, setTopic] = useState(null);
  const [quizKey, setQuizKey] = useState(0);

  const handleSelect = (t) => {
    setTopic(t);
    setQuizKey((k) => k + 1);
  };

  if (!topic) return <Home onSelect={handleSelect} />;
  return <Quiz key={quizKey} topicKey={topic} onBack={() => setTopic(null)} />;
}
