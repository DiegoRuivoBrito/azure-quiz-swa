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
