export function About() {
  const goToGithub = () => {
    window.open(
      "https://github.com/lolek27/reddit-movie-buff-recsys",
      "_blank"
    );
  };
  return (
    <div className="about" onClick={goToGithub}>
      About Reddit Movie Buff
    </div>
  );
}
