import { useMemo, useState } from 'react';

const TOPICS = {
  terraform: {
    label: 'Terraform',
    description: 'Infraestrutura como código com HashiCorp',
    accent: '#7c3aed',
    questions: [
      { question: 'O que o Terraform usa para mapear recursos no provedor?', options: ['State file', 'HCL file', 'Plan file', 'Backend', 'Module'], correct: 0 },
      { question: 'Qual comando inicializa um diretório Terraform e baixa providers?', options: ['terraform deploy', 'terraform init', 'terraform plan', 'terraform refresh', 'terraform validate'], correct: 1 },
      { question: 'Onde o Terraform guarda o estado dos recursos criados?', options: ['No provider', 'No state file', 'No backend remoto', 'Na variável', 'No arquivo de log'], correct: 1 },
      { question: 'Qual bloco define uma infraestrutura reutilizável no Terraform?', options: ['resource', 'data', 'module', 'provider', 'output'], correct: 2 },
      { question: 'Qual dos seguintes não é um tipo nativo de variável do Terraform?', options: ['string', 'number', 'boolean', 'object', 'function'], correct: 4 },
      { question: 'Como você aplica as mudanças planejadas pelo Terraform?', options: ['terraform plan', 'terraform validate', 'terraform init', 'terraform apply', 'terraform destroy'], correct: 3 },
      { question: 'Qual parâmetro define o provider a ser usado?', options: ['type', 'source', 'provider', 'backend', 'resource'], correct: 1 },
      { question: 'O que faz o comando `terraform plan`?', options: ['Cria recursos', 'Valida variáveis', 'Mostra mudanças esperadas', 'Apaga o estado', 'Registra provider'], correct: 2 },
      { question: 'Qual recurso é usado para acessar dados externos sem criar novo recurso?', options: ['resource', 'module', 'backend', 'data', 'output'], correct: 3 },
      { question: 'Qual bloco descreve quais saídas devem ser mostradas?', options: ['input', 'variable', 'output', 'provider', 'locals'], correct: 2 },
      { question: 'Como você evita expor uma senha em Terraform?', options: ['Usando backend local', 'Definindo variável como sensitive', 'Colocando no provider', 'Usando only_if', 'Criando recurso secreto'], correct: 1 },
      { question: 'O que faz `terraform destroy`?', options: ['Destrói recursos gerenciados', 'Aplica novas mudanças', 'Exibe o plano', 'Valida a configuração', 'Atualiza o estado'], correct: 0 },
      { question: 'Qual bloco do Terraform define o nome do recurso?', options: ['resource', 'provider', 'output', 'variable', 'data'], correct: 0 },
      { question: 'O que é HCL no contexto do Terraform?', options: ['Uma linguagem de programação', 'Um formato de configuração', 'Um provider', 'Um provedor de nuvem', 'Um tipo de recurso'], correct: 1 },
      { question: 'Qual comando atualiza o arquivo `.terraform.lock.hcl`?', options: ['terraform providers lock', 'terraform init', 'terraform fmt', 'terraform refresh', 'terraform show'], correct: 0 },
      { question: 'Para que serve um backend remoto no Terraform?', options: ['Armazenar logs', 'Guardar estado compartilhado', 'Executar provider', 'Criar variáveis', 'Mostrar outputs'], correct: 1 },
      { question: 'Como você define uma variável com valor padrão?', options: ['default = value', 'value = default', 'type = string', 'required = true', 'source = var'], correct: 0 },
      { question: 'O que é um provider no Terraform?', options: ['Um recurso de nuvem', 'Um plugin que fala com APIs', 'Um tipo de variável', 'Um backend remoto', 'Uma saída do app'], correct: 1 },
      { question: 'Onde você documenta o uso de uma variável?', options: ['in output', 'in backend', 'in description', 'in module', 'in provider'], correct: 2 },
      { question: 'Qual comando verifica se a configuração está sintaticamente correta?', options: ['terraform init', 'terraform apply', 'terraform validate', 'terraform plan', 'terraform graph'], correct: 2 },
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
  azure: {
    label: 'Azure',
    description: 'Plataforma de nuvem da Microsoft',
    accent: '#0ea5e9',
    questions: [
      { question: 'O que é o Azure Resource Manager (ARM)?', options: ['Um banco de dados gerenciado', 'A camada de gerenciamento do Azure', 'Um serviço de container', 'Um provedor de DNS', 'Um serviço de IA'], correct: 1 },
      { question: 'Qual serviço do Azure equivale ao S3 da AWS para armazenamento de objetos?', options: ['Azure Files', 'Azure Queue', 'Azure Blob Storage', 'Azure Table Storage', 'Azure Disk'], correct: 2 },
      { question: 'O que é um Resource Group no Azure?', options: ['Um tipo de VM', 'Um contêiner lógico que agrupa recursos relacionados', 'Um serviço de banco de dados', 'Uma rede virtual', 'Um plano de cobrança'], correct: 1 },
      { question: 'Qual serviço do Azure gerencia identidade e autenticação?', options: ['Azure Monitor', 'Microsoft Entra ID', 'Azure Policy', 'Azure DevOps', 'Azure Sentinel'], correct: 1 },
      { question: 'O que faz o Azure Container Apps?', options: ['Hospeda VMs Windows', 'Executa containers com autoscaling serverless', 'Armazena imagens Docker', 'Monitora aplicações', 'Gerencia certificados'], correct: 1 },
      { question: 'Qual serviço do Azure gerencia segredos e chaves de criptografia?', options: ['Azure Security Center', 'Azure Key Vault', 'Azure Defender', 'Azure Sentinel', 'Azure Policy'], correct: 1 },
      { question: 'O que é o Azure DevOps?', options: ['Um serviço de IA', 'Um conjunto de ferramentas para CI/CD e gestão de projetos', 'Um banco de dados NoSQL', 'Um serviço de monitoramento', 'Uma CDN'], correct: 1 },
      { question: 'O que é o Azure Kubernetes Service (AKS)?', options: ['Um serviço de banco de dados', 'Um Kubernetes gerenciado na nuvem', 'Um serviço de mensageria', 'Um firewall', 'Uma VPN'], correct: 1 },
      { question: 'Qual serviço do Azure monitora métricas e cria alertas?', options: ['Azure Sentinel', 'Azure Advisor', 'Azure Monitor', 'Azure Policy', 'Azure Cost Management'], correct: 2 },
      { question: 'O que é o Azure Log Analytics?', options: ['Um serviço de armazenamento de objetos', 'Uma ferramenta para consultar e analisar logs', 'Um serviço de CI/CD', 'Um banco de dados relacional', 'Uma CDN'], correct: 1 },
      { question: 'O que significa SLA no contexto do Azure?', options: ['Software License Agreement', 'Service Level Agreement', 'Security Layer Authorization', 'Serverless Lambda Architecture', 'System Log Audit'], correct: 1 },
      { question: 'O que é o Azure Virtual Network (VNet)?', options: ['Uma CDN global', 'Uma rede privada isolada na nuvem', 'Um serviço de DNS', 'Um load balancer', 'Um firewall gerenciado'], correct: 1 },
      { question: 'Qual serviço do Azure distribui tráfego entre instâncias?', options: ['Azure DNS', 'Azure CDN', 'Azure Load Balancer', 'Azure Firewall', 'Azure VPN Gateway'], correct: 2 },
      { question: 'O que diferencia IaaS, PaaS e SaaS?', options: ['São nomes de regiões do Azure', 'São modelos de serviço em nuvem', 'São tipos de subscrição', 'São categorias de preço', 'São ferramentas de monitoramento'], correct: 1 },
      { question: 'O que é o Azure Blob Storage tier "Archive"?', options: ['O mais rápido para acesso frequente', 'O mais barato, para dados raramente acessados', 'O padrão para produção', 'Para backup diário', 'Para streaming de vídeo'], correct: 1 },
      { question: 'O que é uma Subscription no Azure?', options: ['Um tipo de recurso', 'Uma unidade de cobrança e controle de acesso', 'Um plano de suporte', 'Um tipo de rede virtual', 'Um serviço de IA'], correct: 1 },
      { question: 'O que faz o Azure Policy?', options: ['Configura firewall de rede', 'Define e aplica regras de conformidade nos recursos', 'Monitora custos em tempo real', 'Gerencia identidades de usuários', 'Distribui tráfego de rede'], correct: 1 },
      { question: 'Qual é o serviço de banco de dados PostgreSQL gerenciado no Azure?', options: ['Azure SQL Database', 'Azure Cosmos DB', 'Azure Database for PostgreSQL', 'Azure Synapse Analytics', 'Azure Table Storage'], correct: 2 },
      { question: 'O que é o Azure Functions?', options: ['Um serviço de containers', 'Computação serverless orientada a eventos', 'Um banco de dados NoSQL', 'Um serviço de filas', 'Um orquestrador de containers'], correct: 1 },
      { question: 'O que é uma Availability Zone no Azure?', options: ['Uma região geográfica completa', 'Um datacenter isolado dentro de uma região', 'Um grupo de recursos', 'Uma VNet privada', 'Um serviço de backup'], correct: 1 },
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

  const selectedQuestions = useMemo(() => {
    return topic.questions.slice().sort(() => Math.random() - 0.5).slice(0, 5);
  }, []);

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
