const results = [
  { event: "Regional Championship", placing: "1st", date: "March 2025" },
  { event: "EsportsOne Open Cup", placing: "2nd", date: "January 2025" },
  { event: "Community Clash Invitational", placing: "1st", date: "November 2024" }
];

export default function ResultsPage() {
  return (
    <section className="page-section">
      <div className="container narrow">
        <p className="eyebrow">Results</p>
        <h1 className="page-title">Recent tournament finishes</h1>
        <div className="stack-list">
          {results.map((result) => (
            <article key={`${result.event}-${result.date}`} className="panel result-row">
              <div>
                <h2>{result.event}</h2>
                <p className="muted">{result.date}</p>
              </div>
              <div className="result-badge">{result.placing}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
