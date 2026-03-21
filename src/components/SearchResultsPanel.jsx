import styled from "styled-components";
import PropTypes from "prop-types";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { getImageUrl } from "../api";

export const SearchResultsPanel = ({
  query,
  minCharacters,
  isLoading,
  results,
  error,
  emptyText,
  hint,
  onSelectMovie,
}) => {
  const hasQuery = query.trim().length > 0;
  const canSearch = query.trim().length >= minCharacters;

  if (!hasQuery) {
    return null;
  }

  return (
    <Panel>
      <PanelHeader>
        <SearchOutlined />
        <span>Search</span>
      </PanelHeader>

      {!canSearch ? <PanelText>{hint}</PanelText> : null}
      {canSearch && isLoading ? (
        <PanelText>
          <LoadingOutlined />
          Searching TMDB...
        </PanelText>
      ) : null}
      {canSearch && !isLoading && error ? <PanelText>{error}</PanelText> : null}
      {canSearch && !isLoading && !error && results.length === 0 ? <PanelText>{emptyText}</PanelText> : null}

      {canSearch && !isLoading && !error && results.length > 0 ? (
        <ResultsList>
          {results.map((movie) => (
            <ResultButton key={movie.id} onClick={() => onSelectMovie(movie)}>
              <Poster
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(4, 24, 38, 0.08) 0%, rgba(4, 24, 38, 0.32) 100%), url(${getImageUrl(movie.poster_path || movie.backdrop_path)})`,
                }}
              />
              <ResultBody>
                <ResultTitle>{movie.title}</ResultTitle>
                <ResultMeta>
                  <span>{movie.release_date?.slice(0, 4) || "TBA"}</span>
                  <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "NR"}</span>
                </ResultMeta>
              </ResultBody>
            </ResultButton>
          ))}
        </ResultsList>
      ) : null}
    </Panel>
  );
};

SearchResultsPanel.propTypes = {
  query: PropTypes.string.isRequired,
  minCharacters: PropTypes.number,
  isLoading: PropTypes.bool,
  results: PropTypes.array,
  error: PropTypes.string,
  emptyText: PropTypes.string,
  hint: PropTypes.string,
  onSelectMovie: PropTypes.func,
};

const Panel = styled.div`
  display: grid;
  gap: 1.2rem;
  padding: 1.6rem;
  max-height: min(46rem, 65vh);
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: rgba(8, 34, 51, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: ${({ theme }) => theme.shadow.soft};

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: ${({ theme }) => theme.radii.pill};
  }
`;

const PanelHeader = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.text.primary};
  font-size: 1.35rem;
  font-weight: 700;
`;

const PanelText = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.text.secondary};
  font-size: 1.3rem;
`;

const ResultsList = styled.div`
  display: grid;
  gap: 1rem;
`;

const ResultButton = styled.button`
  display: grid;
  grid-template-columns: 5.6rem minmax(0, 1fr);
  gap: 1rem;
  align-items: center;
  width: 100%;
  padding: 0.8rem;
  border-radius: ${({ theme }) => theme.radii.md};
  text-align: left;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

const Poster = styled.div`
  width: 5.6rem;
  height: 7.2rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ theme }) => theme.surface.muted};
  background-size: cover;
  background-position: center;
`;

const ResultBody = styled.div`
  display: grid;
  gap: 0.45rem;
  min-width: 0;
`;

const ResultTitle = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-size: 1.45rem;
  font-weight: 700;
`;

const ResultMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: ${({ theme }) => theme.text.tertiary};
  font-size: 1.2rem;
`;
