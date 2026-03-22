import styled, { useTheme } from "styled-components";
import { APP_COPY } from "../constants";
import PropTypes from "prop-types";
import {
  DownloadOutlined,
  EllipsisOutlined,
  PlayCircleFilled,
  StarFilled,
} from "@ant-design/icons";
import { getImageUrl } from "../api";

export const HeroBanner = ({ movie, badge, primaryAction, onOpenDetails }) => {
  const imageUrl = getImageUrl(movie?.backdrop_path || movie?.poster_path);
  const theme = useTheme();
  const genres = movie?.genres?.filter(Boolean).slice(0, 3) || [];
  const releaseYear = movie?.release_date?.slice(0, 4) || "Now";
  const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : null;

  return (
    <Hero style={{ backgroundImage: `linear-gradient(90deg, ${theme.alpha.dark98} 0%, ${theme.alpha.dark72} 48%, ${theme.alpha.dark06} 100%), url(${imageUrl})` }}>
      <TopMetaRow>
        <Badge>{badge}</Badge>
        <TagRow>
          {genres.map((genre) => (
            <Tag key={genre.id}>{genre.name}</Tag>
          ))}
        </TagRow>
      </TopMetaRow>
      <Title>{movie?.title || APP_COPY.heroDefaultTitle}</Title>
      <Summary>{movie?.overview || APP_COPY.heroDefaultSummary}</Summary>
      <MetaRow>
        <MetaPill>{releaseYear}</MetaPill>
        {rating ? (
          <MetaPill>
            <StarFilled />
            {rating}
          </MetaPill>
        ) : null}
      </MetaRow>
      <ActionRow>
        <PrimaryButton onClick={() => onOpenDetails(movie)}>
          <PlayCircleFilled />
          <span>{primaryAction}</span>
        </PrimaryButton>
        <IconActionButton aria-label={APP_COPY.downloadLabel}>
          <DownloadOutlined />
        </IconActionButton>
        <IconActionButton aria-label={APP_COPY.moreOptionsLabel}>
          <EllipsisOutlined />
        </IconActionButton>
      </ActionRow>
    </Hero>
  );
};

HeroBanner.propTypes = {
  movie: PropTypes.object,
  badge: PropTypes.string,
  primaryAction: PropTypes.string,
  onOpenDetails: PropTypes.func,
};

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  min-height: clamp(26rem, 44vh, 34rem);
  padding: clamp(2.2rem, 3vw, 3rem);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.surface.elevated};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-clip: padding-box;
  background-origin: padding-box;
  border: 1px solid ${({ theme }) => theme.alpha.white06};
  overflow: hidden;

  @media (max-width: 720px) {
    min-height: 28rem;
    padding: 2.4rem;
    background-position: center top;
  }
`;

const Badge = styled.span`
  padding: 0.65rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.alpha.gold18};
  color: ${({ theme }) => theme.misc.gold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  flex-shrink: 0;
`;

const TopMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const Tag = styled.span`
  padding: 0.55rem 0.9rem;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.alpha.white06};
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Title = styled.h1`
  max-width: 56rem;
  color: ${({ theme }) => theme.text.primary};
  overflow-wrap: anywhere;
`;

const Summary = styled.p`
  max-width: 56rem;
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  overflow-wrap: anywhere;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const MetaPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: ${({ theme }) => theme.alpha.white06};
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.2rem;
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.95rem 1.35rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: linear-gradient(135deg, ${({ theme }) => theme.accent.strong} 0%, ${({ theme }) => theme.accent.soft} 100%);
  color: ${({ theme }) => theme.misc.white};
  font-weight: 700;
`;

const IconActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4.4rem;
  height: 4.2rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.alpha.white06};
  color: ${({ theme }) => theme.text.primary};
  border: 1px solid ${({ theme }) => theme.alpha.white12};

  &:hover {
    background: ${({ theme }) => theme.alpha.white12};
  }

  svg {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;
