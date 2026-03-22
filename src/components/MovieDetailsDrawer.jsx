import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
    CloseOutlined,
    PlayCircleFilled,
    StarFilled,
    CalendarOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import { getImageUrl } from "../api";

export const MovieDetailsDrawer = ({
    isOpen,
    onClose,
    movie,
    isLoading,
    error,
    primaryAction,
    fallbackAction,
}) => {
    const backdropUrl = getImageUrl(movie?.backdrop_path || movie?.poster_path);
    const trailerUrl = movie?.trailer?.key ? `https://www.youtube.com/watch?v=${movie.trailer.key}` : "";

    // Only show Continue Watching button for these movie IDs
    const continueWatchingIds = [20526, 673, 68734, 76341];
    const showContinueWatching = movie && continueWatchingIds.includes(movie.id);
    const showWatchNow = movie && !continueWatchingIds.includes(movie.id);

    return (
      <Drawer open={isOpen} onClose={onClose} direction="right" size="min(52rem, 100vw)" className="movie-details-drawer">
        <DrawerShell>
                <DrawerHeader>
                    <DrawerEyebrow>Movie details</DrawerEyebrow>
                    <CloseButton onClick={onClose} aria-label="Close movie details">
                        <CloseOutlined />
                    </CloseButton>
                </DrawerHeader>

                {isLoading ? (
                    <StateMessage>Loading movie details...</StateMessage>
                ) : null}

                {!isLoading && error ? <StateMessage>{error}</StateMessage> : null}

                {!isLoading && movie ? (
                    <>
                        <HeroImage style={{ backgroundImage: `linear-gradient(180deg, rgba(4, 24, 38, 0.02) 0%, rgba(4, 24, 38, 0.76) 100%), url(${backdropUrl})` }}>
                            <ScoreBadge>
                                <StarFilled />
                                {movie.vote_average ? movie.vote_average.toFixed(1) : "NR"}
                            </ScoreBadge>
                        </HeroImage>

                        <ContentStack>
                            <Title>{movie.title}</Title>
                            {movie.tagline ? <Tagline>{movie.tagline}</Tagline> : null}
                            <MetaRow>
                                <MetaPill>
                                    <CalendarOutlined />
                                    <span>{movie.release_date?.slice(0, 4) || "TBA"}</span>
                                </MetaPill>
                                {movie.runtime ? (
                                    <MetaPill>
                                        <ClockCircleOutlined />
                                        <span>{movie.runtime} min</span>
                                    </MetaPill>
                                ) : null}
                            </MetaRow>

                            <GenreRow>
                                {(movie.genres || []).map((genre) => (
                                    <GenrePill key={genre.id}>{genre.name}</GenrePill>
                                ))}
                            </GenreRow>

                            <Overview>{movie.overview || "No synopsis available."}</Overview>

                            <ActionRow>

                                {trailerUrl ? (
                                  <>
                                    {showContinueWatching && (
                                      <ContinueWatchingButton>
                                        <PlayCircleFilled />
                                        <span>Continue Watching</span>
                                      </ContinueWatchingButton>
                                    )}
                                    {showWatchNow && (
                                      <ContinueWatchingButton>
                                        <PlayCircleFilled />
                                        <span>Watch Now</span>
                                      </ContinueWatchingButton>
                                    )}

                                    <ActionLink href={trailerUrl} target="_blank" rel="noreferrer">
                                      <PlayCircleFilled />
                                      <span>{primaryAction}</span>
                                    </ActionLink>
                                  </>
                                ) : (
                                  <MutedAction>{fallbackAction}</MutedAction>
                                )}
                              </ActionRow>

                            {movie.cast?.length ? (
                                <Section>
                                    <SectionTitle>Top cast</SectionTitle>
                                    <CastGrid>
                                        {movie.cast.map((person) => (
                                            <CastCard key={person.id}>
                                                <CastAvatar
                                                    style={{ backgroundImage: `linear-gradient(180deg, rgba(4, 24, 38, 0.08) 0%, rgba(4, 24, 38, 0.24) 100%), url(${getImageUrl(person.profile_path)})` }}
                                                />
                                                <div>
                                                    <CastName>{person.name}</CastName>
                                                    <CastRole>{person.character}</CastRole>
                                                </div>
                                            </CastCard>
                                        ))}
                                    </CastGrid>
                                </Section>
                            ) : null}
                        </ContentStack>
                    </>
                ) : null}
            </DrawerShell>
        </Drawer>
    );
};

MovieDetailsDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  movie: PropTypes.object,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  primaryAction: PropTypes.string,
  fallbackAction: PropTypes.string,
};

const ContinueWatchingButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.4rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.accent.strong};
  color: ${({ theme }) => theme.misc.white};
  font-size: 1.35rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  margin-right: 1rem;
  transition: background 180ms, color 180ms;
  &:hover {
    background: ${({ theme }) => theme.accent.soft};
    color: ${({ theme }) => theme.accent.strong};
  }
`;

const DrawerShell = styled.div`
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 2rem;
  background: linear-gradient(180deg, rgba(7, 31, 48, 0.98) 0%, rgba(4, 22, 36, 0.98) 100%);

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: ${({ theme }) => theme.borderRadius.pill};
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.6rem;
`;

const DrawerEyebrow = styled.p`
  color: ${({ theme }) => theme.text.tertiary};
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const CloseButton = styled.button`
  display: grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.06);
`;

const StateMessage = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 1.4rem;
`;

const HeroImage = styled.div`
  position: relative;
  height: 24rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.surface.muted};
  background-position: center;
  background-size: cover;
  overflow: hidden;
`;

const ScoreBadge = styled.span`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 0.95rem;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: rgba(4, 24, 38, 0.72);
  color: ${({ theme }) => theme.misc.gold};
  font-size: 1.2rem;
  font-weight: 700;
`;

const ContentStack = styled.div`
  display: grid;
  gap: 1.4rem;
  padding: 1.8rem 0 0;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 3.2rem;
  line-height: 0.98;
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 1.45rem;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const MetaPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: rgba(255, 255, 255, 0.06);
  color: ${({ theme }) => theme.text.primary};
  font-size: 1.2rem;
  font-weight: 700;
`;

const GenreRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

const GenrePill = styled.span`
  padding: 0.55rem 0.85rem;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background: rgba(255, 255, 255, 0.06);
  color: ${({ theme }) => theme.text.secondary};
  font-size: 1.15rem;
`;

const Overview = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: 1.45rem;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.4rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: linear-gradient(135deg, ${({ theme }) => theme.accent.strong} 0%, ${({ theme }) => theme.accent.soft} 100%);
  color: ${({ theme }) => theme.misc.white};
  font-size: 1.35rem;
  font-weight: 700;

  &:hover {
    text-decoration: none;
  }
`;

const MutedAction = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 1rem 1.4rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.06);
  color: ${({ theme }) => theme.text.tertiary};
  font-size: 1.35rem;
  font-weight: 700;
`;

const Section = styled.section`
  display: grid;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.text.primary};
  font-size: 1.8rem;
  font-weight: 800;
`;

const CastGrid = styled.div`
  display: grid;
  gap: 0.9rem;
`;

const CastCard = styled.div`
  display: grid;
  grid-template-columns: 5.2rem minmax(0, 1fr);
  gap: 1rem;
  align-items: center;
  padding: 0.8rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.04);
`;

const CastAvatar = styled.div`
  width: 5.2rem;
  height: 5.2rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.surface.muted};
  background-position: center;
  background-size: cover;
`;

const CastName = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-size: 1.35rem;
  font-weight: 700;
`;

const CastRole = styled.p`
  color: ${({ theme }) => theme.text.tertiary};
  font-size: 1.2rem;
`;
