import { useState, useEffect } from 'react';

const TOPICS = {
  twoAndAHalfMen: {
    label: 'Two and a Half Men',
    description: 'A comédia sobre Charlie, Alan e Jake Harper',
    accent: '#f59e0b',
  },
  friends: {
    label: 'Friends',
    description: 'A série clássica de comédia dos anos 90',
    accent: '#d97706',
  },
  got: {
    label: 'Game of Thrones',
    description: 'A saga épica de Westeros',
    accent: '#dc2626',
  },
  theOffice: {
    label: 'The Office',
    description: 'O cotidiano hilário da Dunder Mifflin em Scranton',
    accent: '#64748b',
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
  const [selectedQuestions, setSelectedQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/questions?topic=${topicKey}`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao carregar perguntas');
        return res.json();
      })
      .then((questions) => {
        const shuffled = questions.slice().sort(() => Math.random() - 0.5).slice(0, 5);
        setSelectedQuestions(shuffled);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [topicKey]);

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

  if (loading) {
    return (
      <div className="app-shell">
        <header className="hero">
          <button className="back-button" onClick={onBack}>← Voltar aos temas</button>
          <p className="eyebrow" style={{ color: topic.accent }}>{topic.label}</p>
          <h1>Carregando perguntas...</h1>
        </header>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-shell">
        <header className="hero">
          <button className="back-button" onClick={onBack}>← Voltar aos temas</button>
          <h1>Erro ao carregar</h1>
          <p className="subtitle">{error}</p>
        </header>
      </div>
    );
  }

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
