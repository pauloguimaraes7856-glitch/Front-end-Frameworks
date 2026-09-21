import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { Movie } from "../types";

type Theme = "dark" | "light";

type AppState = {
  favorites: Movie[];
  theme: Theme;
};

type Action =
  | {
      type: "TOGGLE_FAVOURITE";
      movie: Movie;
    }
  | {
      type: "SET_THEME";
      theme: Theme;
    };

type AppContextType = {
  favorites: Movie[];
  theme: Theme;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: number) => boolean;
  toggleTheme: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  favorites: [],
  theme: "dark",
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const alreadyFavorite = state.favorites.some(
        (movie) => movie.id === action.movie.id
      );

      return {
        ...state,
        favorites: alreadyFavorite
          ? state.favorites.filter((movie) => movie.id !== action.movie.id)
          : [...state.favorites, action.movie],
      };
    }

    case "SET_THEME":
      return {
        ...state,
        theme: action.theme,
      };

    default:
      return state;
  }
}

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const savedFavorites = localStorage.getItem("cinegrid_favorites");
    const savedTheme = localStorage.getItem("cinegrid_theme");

    return {
      favorites: savedFavorites ? JSON.parse(savedFavorites) : [],
      theme: savedTheme === "light" ? "light" : "dark",
    };
  });

  useEffect(() => {
    localStorage.setItem(
      "cinegrid_favorites",
      JSON.stringify(state.favorites)
    );
  }, [state.favorites]);

  useEffect(() => {
    localStorage.setItem("cinegrid_theme", state.theme);
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  const toggleFavorite = (movie: Movie) => {
    dispatch({
      type: "TOGGLE_FAVOURITE",
      movie,
    });
  };

  const isFavorite = (movieId: number) => {
    return state.favorites.some((movie) => movie.id === movieId);
  };

  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      theme: state.theme === "dark" ? "light" : "dark",
    });
  };

  return (
    <AppContext.Provider
      value={{
        favorites: state.favorites,
        theme: state.theme,
        toggleFavorite,
        isFavorite,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}