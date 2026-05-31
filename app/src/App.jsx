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
  narcos: {
    label: 'Narcos',
    description: 'A ascensão e queda do Cartel de Medellín',
    accent: '#16a34a',
  },
  breakingBad: {
    label: 'Breaking Bad',
    description: 'A transformação de Walter White em Heisenberg',
    accent: '#2563eb',
  },
};

function Home({ onSelect, onViewHistory }) {
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
      <div className="history-link">
        <button className="ghost-button" onClick={onViewHistory}>Ver meu histórico →</button>
      </div>
    </div>
  );
}

function Quiz({ topicKey, onBack, onViewHistory }) {
  const topic = TOPICS[topicKey];
  const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveForm, setSaveForm] = useState({ name: '', email: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: saveForm.name.trim(),
          email: saveForm.email.trim(),
          topic: topicKey,
          topicLabel: topic.label,
          score,
          totalQuestions: selectedQuestions.length,
        }),
      });
      setSaved(true);
    } catch {
      setSaved(true);
    } finally {
      setSaving(false);
    }
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

          {submitted && (
            <div className="save-section">
              {!saved ? (
                <>
                  <p className="save-label">Salvar resultado?</p>
                  <div className="save-fields">
                    <input
                      className="text-input"
                      placeholder="Seu nome"
                      value={saveForm.name}
                      onChange={(e) => setSaveForm((f) => ({ ...f, name: e.target.value }))}
                    />
                    <input
                      className="text-input"
                      type="email"
                      placeholder="Seu email"
                      value={saveForm.email}
                      onChange={(e) => setSaveForm((f) => ({ ...f, email: e.target.value }))}
                    />
                    <button
                      className="submit-button"
                      onClick={handleSave}
                      disabled={saving || !saveForm.name.trim() || !saveForm.email.trim()}
                    >
                      {saving ? 'Salvando...' : 'Salvar'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="saved-confirm">
                  <span>✓ Resultado salvo!</span>
                  <button className="ghost-button" onClick={() => onViewHistory(saveForm.email)}>
                    Ver meu histórico →
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function History({ onBack, initialEmail = '' }) {
  const [email, setEmail] = useState(initialEmail);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const accumulatedByTopic = {};
  const bestByTopic = {};
  if (data) {
    for (const entry of data.history) {
      if (!accumulatedByTopic[entry.topic]) {
        accumulatedByTopic[entry.topic] = {
          label: entry.topicLabel,
          totalCorrect: 0,
          totalQuestions: 0,
          attempts: 0,
          lastPlayed: entry.timestamp,
        };
      }
      accumulatedByTopic[entry.topic].totalCorrect += entry.score;
      accumulatedByTopic[entry.topic].totalQuestions += entry.totalQuestions;
      accumulatedByTopic[entry.topic].attempts += 1;

      const pct = (entry.score / entry.totalQuestions) * 100;
      if (!bestByTopic[entry.topic] || pct > bestByTopic[entry.topic].pct) {
        bestByTopic[entry.topic] = {
          label: entry.topicLabel,
          score: entry.score,
          totalQuestions: entry.totalQuestions,
          pct: Math.round(pct),
        };
      }
    }
  }

  useEffect(() => {
    if (initialEmail) fetchHistory(initialEmail);
  }, [initialEmail]);

  const fetchHistory = (target) => {
    setLoading(true);
    setError(null);
    setData(null);
    fetch(`/api/scores?email=${encodeURIComponent(target.toLowerCase().trim())}`)
      .then((res) => {
        if (res.status === 404) throw new Error('Nenhum resultado encontrado para este email.');
        if (!res.ok) throw new Error('Erro ao buscar histórico.');
        return res.json();
      })
      .then((d) => { setData(d); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (email.trim()) fetchHistory(email.trim());
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <button className="back-button" onClick={onBack}>← Voltar aos temas</button>
        <h1>Meu histórico</h1>
        <p className="subtitle">Informe seu email para ver suas médias e partidas anteriores.</p>
      </header>

      <div className="quiz-card">
        <form onSubmit={handleSearch} className="history-search">
          <input
            className="text-input"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="submit-button" type="submit" disabled={loading || !email.trim()}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {error && <p className="error-msg">{error}</p>}

        {data && (
          <div className="history-data">
            <p className="history-greeting">
              Olá, <strong>{data.name}</strong> — média geral: <strong>{data.overallAverage}%</strong>
            </p>

            <p className="section-title">Média por tema</p>
            <div className="stat-grid">
              {Object.entries(data.averageByTopic).map(([key, stat]) => (
                <div key={key} className="stat-item">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.average}%</span>
                  <span className="stat-attempts">
                    {stat.attempts} {stat.attempts === 1 ? 'partida' : 'partidas'}
                  </span>
                </div>
              ))}
            </div>

            <p className="section-title">Melhor resultado</p>
            <div className="stat-grid">
              {Object.entries(bestByTopic).map(([key, best]) => (
                <div key={key} className="stat-item best-item">
                  <span className="stat-label">{best.label}</span>
                  <span className="stat-value">{best.score}/{best.totalQuestions}</span>
                  <span className="stat-attempts">{best.pct}% — melhor partida</span>
                </div>
              ))}
            </div>

            <p className="section-title">Acumulado por tema</p>
            <div className="history-list">
              {Object.values(accumulatedByTopic).map((acc, i) => (
                <div key={i} className="history-entry">
                  <span className="history-topic">{acc.label}</span>
                  <span className="history-score">{acc.totalCorrect}/{acc.totalQuestions}</span>
                  <span className="history-date">
                    {acc.attempts} {acc.attempts === 1 ? 'partida' : 'partidas'} · última: {new Date(acc.lastPlayed).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>

            <p className="section-title">Partidas individuais</p>
            <div className="history-list">
              {data.history.map((entry, i) => (
                <div key={i} className="history-entry">
                  <span className="history-topic">{entry.topicLabel}</span>
                  <span className="history-score">{entry.score}/{entry.totalQuestions}</span>
                  <span className="history-date">
                    {new Date(entry.timestamp).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('home');
  const [topic, setTopic] = useState(null);
  const [quizKey, setQuizKey] = useState(0);
  const [historyEmail, setHistoryEmail] = useState('');

  const handleSelectTopic = (t) => {
    setTopic(t);
    setQuizKey((k) => k + 1);
    setView('quiz');
  };

  const handleViewHistory = (email = '') => {
    setHistoryEmail(email);
    setView('history');
  };

  if (view === 'quiz') {
    return (
      <Quiz
        key={quizKey}
        topicKey={topic}
        onBack={() => setView('home')}
        onViewHistory={handleViewHistory}
      />
    );
  }

  if (view === 'history') {
    return <History onBack={() => setView('home')} initialEmail={historyEmail} />;
  }

  return <Home onSelect={handleSelectTopic} onViewHistory={() => handleViewHistory()} />;
}
