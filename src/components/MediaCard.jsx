import styled from "styled-components";
import PropTypes from "prop-types";
import { StarFilled } from "@ant-design/icons";
import { getImageUrl } from "../api";

const getProgressData = (movie) => {
  const totalMinutes = 88 + (movie?.id % 58);
  const watchedPercent = 18 + ((movie?.vote_count || movie?.id) % 62);
  const watchedMinutes = Math.max(8, Math.round((totalMinutes * watchedPercent) / 100));
  const minutesLeft = Math.max(3, totalMinutes - watchedMinutes);

  return {
    watchedPercent,
    watchedMinutes,
    minutesLeft,
  };
};

export const MediaCard = ({ movie, onSelectMovie, showProgress = false }) => {
  const imageUrl = getImageUrl(movie?.backdrop_path || movie?.poster_path);
  const genres = movie?.genres?.filter(Boolean).slice(0, 2) || [];
  const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : "NR";
  const year = movie?.release_date?.slice(0, 4) || "TBA";
  const progressData = getProgressData(movie);

  return (
    <Card onClick={() => onSelectMovie(movie)} $showProgress={showProgress}>
      <Poster
        $showProgress={showProgress}
        style={{ backgroundImage: `linear-gradient(180deg, rgba(4, 24, 38, 0.06) 0%, rgba(4, 24, 38, 0.72) 100%), url(${imageUrl})` }}
      >
        {!showProgress ? (
          <RatingBadge>
            <StarFilled />
            {rating}
          </RatingBadge>
        ) : null}

        {showProgress ? (
          <PosterOverlay>
            <OverlayTitle>{movie?.title}</OverlayTitle>
            <OverlayMeta>{year}</OverlayMeta>
            <ProgressTrack>
              <ProgressFill style={{ width: `${progressData.watchedPercent}%` }} />
            </ProgressTrack>
            <ProgressMeta>
              <span>{progressData.watchedMinutes}m watched</span>
              <span>{progressData.minutesLeft}m left</span>
            </ProgressMeta>
          </PosterOverlay>
        ) : null}
      </Poster>

      {showProgress ? null : (
        <Body>
          <Title>{movie?.title}</Title>
          <Meta>{year}</Meta>
          <GenreRow>
            {genres.map((genre) => (
              <GenrePill key={`${movie.id}-${genre.id}`}>{genre.name}</GenrePill>
            ))}
          </GenreRow>
        </Body>
      )}
    </Card>
  );
};

MediaCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
  showProgress: PropTypes.bool,
};

const Card = styled.button`
  min-width: ${({ $showProgress }) => ($showProgress ? "25.5rem" : "23rem")};
  padding: 0;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: visible;
  /* Fix the total card height for continue-watching cards so they don't grow
     with very wide viewports */
  height: ${({ $showProgress }) => ($showProgress ? "12rem" : "auto")};
  background: rgba(8, 34, 51, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: ${({ theme }) => theme.shadow.soft};
  text-align: left;
  transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(10, 40, 60, 0.96);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 18px 36px rgba(3, 19, 31, 0.34);
  }
`;

const Poster = styled.div`
  position: relative;
  height: ${({ $showProgress, $fullArt }) => ($fullArt ? "100%" : $showProgress ? "12.6rem" : "14rem")};
  background-color: ${({ theme }) => theme.surface.elevated};
  background-position: center;
  background-size: cover;
  border-top-left-radius: ${({ theme }) => theme.radii.xl};
  border-top-right-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
`;

const RatingBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(4, 24, 38, 0.74);
  color: ${({ theme }) => theme.misc.gold};
  font-size: 1.15rem;
  font-weight: 700;
`;

/* Full-art variant removed — keeping poster overlay only */

const PosterOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.95rem 1.2rem;
  background: linear-gradient(180deg, rgba(4, 24, 38, 0) 0%, rgba(4, 24, 38, 0.92) 92%);
`;

const OverlayTitle = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.15;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const OverlayMeta = styled.p`
  color: ${({ theme }) => theme.text.tertiary};
  font-size: 1.1rem;
  margin-bottom: 0.55rem;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 0.55rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.14);
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: linear-gradient(90deg, ${({ theme }) => theme.accent.soft} 0%, ${({ theme }) => theme.accent.strong} 100%);
`;

const ProgressMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: ${({ theme }) => theme.text.tertiary};
  font-size: 1.1rem;
  font-weight: 600;
`;

const Body = styled.div`
  display: grid;
  gap: 0.7rem;
  padding: 1.4rem;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.text.primary};
  font-size: 1.6rem;
  line-height: 1.15;
`;

const Meta = styled.p`
  color: ${({ theme }) => theme.text.tertiary};
  font-size: 1.25rem;
`;

const GenreRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const GenrePill = styled.span`
  padding: 0.45rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.06);
  color: ${({ theme }) => theme.text.secondary};
  font-size: 1.1rem;
`;
