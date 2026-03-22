import styled from "styled-components";
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
  const genres = movie?.genres?.filter(Boolean).slice(0, 3) || [];
  const releaseYear = movie?.release_date?.slice(0, 4) || "Now";
  const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : null;

  return (
    <Hero style={{ backgroundImage: `linear-gradient(90deg, rgba(4, 24, 38, 0.92) 0%, rgba(4, 24, 38, 0.58) 48%, rgba(4, 24, 38, 0.08) 100%), url(${imageUrl})` }}>
      <TopMetaRow>
        <Badge>{badge}</Badge>
        <TagRow>
          {genres.map((genre) => (
            <Tag key={genre.id}>{genre.name}</Tag>
          ))}
        </TagRow>
      </TopMetaRow>
      <Title>{movie?.title || "Cinema, curated beautifully"}</Title>
      <Summary>{movie?.overview || "Discover the most talked-about stories, surfaced with bold artwork and clean categorisation."}</Summary>
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
        <IconActionButton aria-label="Download">
          <DownloadOutlined />
        </IconActionButton>
        <IconActionButton aria-label="More options">
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
  background-position: center top;
  background-size: cover;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: ${({ theme }) => theme.shadow.panel};
  overflow: hidden;

  @media (max-width: 720px) {
    min-height: 28rem;
    padding: 2.4rem;
  }
`;

const Badge = styled.span`
  padding: 0.65rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: rgba(255, 171, 87, 0.18);
  color: ${({ theme }) => theme.misc.gold};
  font-size: 1.2rem;
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
  background: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.text.primary};
  font-size: 1.15rem;
`;

const Title = styled.h1`
  max-width: 56rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.6rem, 3.9vw, 4.2rem);
  line-height: 1.04;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.text.primary};
  overflow-wrap: anywhere;
`;

const Summary = styled.p`
  max-width: 56rem;
  color: ${({ theme }) => theme.text.secondary};
  font-size: 1.35rem;
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
  background: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.text.primary};
  font-size: 1.2rem;
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
  box-shadow: 0 18px 32px rgba(22, 182, 217, 0.22);
`;

const IconActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4.4rem;
  height: 4.2rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.text.primary};
  border: 1px solid rgba(255, 255, 255, 0.12);

  &:hover {
    background: rgba(255, 255, 255, 0.14);
  }

  svg {
    font-size: 1.8rem;
  }
`;
