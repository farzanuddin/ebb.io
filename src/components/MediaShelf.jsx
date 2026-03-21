import styled from "styled-components";
import PropTypes from "prop-types";
import { MediaCard } from "./MediaCard";

export const MediaShelf = ({ sectionKey, title, items, onSelectMovie }) => {
  const showProgress = sectionKey === "continueWatching";

  return (
    <Section>
      <SectionHeader>
        <div>
          <SectionTitle>{title}</SectionTitle>
        </div>
      </SectionHeader>
      <CardRow showProgress={showProgress}>
        {items.map((movie) => (
          <MediaCard
            key={movie.id}
            movie={movie}
            onSelectMovie={onSelectMovie}
            showProgress={showProgress}
          />
        ))}
      </CardRow>
    </Section>
  );
};

MediaShelf.propTypes = {
  sectionKey: PropTypes.string,
  title: PropTypes.string,
  cta: PropTypes.object,
  items: PropTypes.array.isRequired,
  onSelectMovie: PropTypes.func,
};

const Section = styled.section`
  display: grid;
  gap: 1.4rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
`;



const CardRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${({ showProgress }) =>
    showProgress ? "minmax(25rem, 1fr)" : "minmax(22rem, 1fr)"};
  gap: 1.4rem;
  overflow-x: auto;
  padding-bottom: 0.4rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    height: 0;
    width: 0;
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: ${({ theme }) => theme.radii.pill};
  }

  @media (max-width: 720px) {
    grid-auto-columns: minmax(20rem, 82vw);
  }
`;
