import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import { SAMPLE_MOVIES } from "./data/sampleMovies";

const App = () => {
  const [query, setQuery] = useState("");

  const filteredMovies = SAMPLE_MOVIES.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header />

        <SearchBar query={query} onChange={setQuery} />

        <Routes>
          <Route
            path="/"
            element={
              <main className="main-container">
                <h1>Movie App</h1>
                <section>
                  <MovieList movies={filteredMovies} />
                </section>
              </main>
            }
          />

          <Route path="/about" element={<AboutPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;