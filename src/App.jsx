import { startTransition, useDeferredValue, useEffect, useState, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import { LoadingOutlined, WarningOutlined } from "@ant-design/icons";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { getMovieDetails, getMoviesWithGenres, searchMovies } from "./api";
import {
  APP_COPY,
  DASHBOARD_SECTIONS,
  FEATURED_COLLECTION,
  SEARCH_MIN_CHARACTERS,
  SIDEBAR_LIBRARY_LINKS,
  SIDEBAR_PRIMARY_LINKS,
} from "./constants";
import {
  DashboardSidebar,
  HeroBanner,
  MediaShelf,
  MovieDetailsDrawer,
  SearchResultsPanel,
  TopBar,
} from "./components";
import { GlobalStyles } from "./styles/Global.styled";
import { theme } from "./styles/theme";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const App = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [shelves, setShelves] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });
  const [searchValue, setSearchValue] = useState("");
  const deferredSearchValue = useDeferredValue(searchValue);
  const [searchState, setSearchState] = useState({ loading: false, error: "", results: [] });
  const [drawerState, setDrawerState] = useState({
    isOpen: false,
    isLoading: false,
    error: "",
    movie: null,
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [drawerSize, setDrawerSize] = useState(() =>
    typeof window !== "undefined" && window.innerWidth <= 1100 ? "100vw" : "min(86%, 34rem)"
  );

  useEffect(() => {
    const onResize = () => {
      setDrawerSize(window.innerWidth <= 1100 ? "100vw" : "min(86%, 34rem)");
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const bodyOverflowRef = useRef(null);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const shouldLock = isMobileSidebarOpen || drawerState.isOpen;

    if (shouldLock) {
      if (bodyOverflowRef.current === null) {
        bodyOverflowRef.current = document.body.style.overflow;
      }
      document.body.style.overflow = "hidden";
    } else {
      if (bodyOverflowRef.current !== null) {
        document.body.style.overflow = bodyOverflowRef.current;
        bodyOverflowRef.current = null;
      } else {
        document.body.style.overflow = "";
      }
    }
  }, [isMobileSidebarOpen, drawerState.isOpen]);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        setStatus({ loading: true, error: "" });

        const [featuredResponse, ...sectionResponses] = await Promise.all([
          getMoviesWithGenres(FEATURED_COLLECTION.endpoint),
          ...DASHBOARD_SECTIONS.map((section) => getMoviesWithGenres(section.endpoint)),
        ]);

        const staticContinueWatchingIds = [20526, 673, 68734, 76341];
        const staticContinueWatching = await Promise.all(
          staticContinueWatchingIds.map((id) => getMovieDetails(id))
        );

        if (!isMounted) {
          return;
        }

        const spotlight =
          featuredResponse?.results?.find((movie) => movie.backdrop_path) ||
          featuredResponse?.results?.[0] ||
          null;

        const mappedShelves = DASHBOARD_SECTIONS.map((section, index) => {
          if (section.key === "continueWatching") {
            return {
              ...section,
              items: staticContinueWatching.filter(Boolean),
            };
          }

          const limit =
            section.key === "recentlyReleased" || section.key === "topRated" ? 10 : 6;

          return {
            ...section,
            items:
              sectionResponses[index]?.results
                ?.filter((movie) => movie.backdrop_path || movie.poster_path)
                ?.slice(0, limit) || [],
          };
        });

        setFeaturedMovie(spotlight);
        setShelves(mappedShelves);
        setStatus({ loading: false, error: "" });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setStatus({
          loading: false,
          error: error.message || APP_COPY.errorLoadMovies,
        });
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const trimmedQuery = deferredSearchValue.trim();

    if (!trimmedQuery) {
      setSearchState({ loading: false, error: "", results: [] });
      return;
    }

    if (trimmedQuery.length < SEARCH_MIN_CHARACTERS) {
      setSearchState({ loading: false, error: "", results: [] });
      return;
    }

    const timeoutId = window.setTimeout(() => {
      (async () => {
        try {
          setSearchState((currentState) => ({ ...currentState, loading: true, error: "" }));
          const results = await searchMovies(trimmedQuery);
          if (isCancelled) return;
          startTransition(() => {
            setSearchState({
              loading: false,
              error: "",
              results: results.slice(0, 5),
            });
          });
        } catch (error) {
          if (isCancelled) return;
          setSearchState({
            loading: false,
            error: error.message || APP_COPY.errorSearchUnavailable,
            results: [],
          });
        }
      })();
    }, 280);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [deferredSearchValue]);

  const handleOpenMovieDetails = async (movie) => {
    if (!movie?.id) {
      return;
    }

    setSearchValue("");

    setDrawerState({
      isOpen: true,
      isLoading: true,
      error: "",
      movie,
    });

    try {
      const detailedMovie = await getMovieDetails(movie.id);

      setDrawerState({
        isOpen: true,
        isLoading: false,
        error: "",
        movie: detailedMovie || movie,
      });
    } catch (error) {
      setDrawerState({
        isOpen: true,
        isLoading: false,
        error: error.message || APP_COPY.errorLoadDetails,
        movie,
      });
    }
  };

  const handleCloseDrawer = () => {
    setDrawerState((currentState) => ({
      ...currentState,
      isOpen: false,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <AmbientGlow $top />
        <AmbientGlow $bottom />
        <DashboardShell>
          <SidebarColumn>
            <DashboardSidebar
              brand={APP_COPY.brand}
              primaryLinks={SIDEBAR_PRIMARY_LINKS}
              libraryLinks={SIDEBAR_LIBRARY_LINKS}
            />
          </SidebarColumn>

          <MainPanel>
            <TopArea>
              <TopBar
                placeholder={APP_COPY.searchPlaceholder}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                onToggleSidebar={() => setIsMobileSidebarOpen((s) => !s)}
                rightActions={
                  <>
                    <BellWrapper aria-label="Notifications">
                      <BellOutlined style={{ fontSize: "1.9rem" }} />
                      <NotificationDot />
                    </BellWrapper>
                    <Avatar>
                      <UserOutlined />
                    </Avatar>
                  </>
                }
              />
              <SearchOverlay>
                <SearchResultsPanel
                  query={searchValue}
                  minCharacters={SEARCH_MIN_CHARACTERS}
                  isLoading={searchState.loading}
                  results={searchState.results}
                  error={searchState.error}
                  emptyText={APP_COPY.searchEmpty}
                  hint={APP_COPY.searchHint}
                  onSelectMovie={handleOpenMovieDetails}
                />
              </SearchOverlay>
            </TopArea>

            {status.loading ? (
              <StateCard>
                <LoadingOutlined />
                <div>
                  <StateTitle>Loading your movie dashboard</StateTitle>
                  <StateText>Fetching trending releases and curated rows from TMDB.</StateText>
                </div>
              </StateCard>
            ) : null}

            {!status.loading && status.error ? (
              <StateCard>
                <WarningOutlined />
                <div>
                  <StateTitle>Couldn&apos;t load the catalog</StateTitle>
                  <StateText>{status.error}</StateText>
                </div>
              </StateCard>
            ) : null}

            {!status.loading && !status.error ? (
              <ContentStack>
                <HeroBanner
                  movie={featuredMovie}
                  badge={FEATURED_COLLECTION.badge}
                  primaryAction={APP_COPY.heroPrimaryAction}
                  onOpenDetails={handleOpenMovieDetails}
                />

                {shelves.map((section) => (
                  <MediaShelf
                    key={section.key}
                    sectionKey={section.key}
                    title={section.title}
                    cta={section.cta}
                    items={section.items}
                    onSelectMovie={handleOpenMovieDetails}
                  />
                ))}
              </ContentStack>
            ) : null}
          </MainPanel>
        </DashboardShell>
        <Drawer
          open={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          direction="left"
          size={drawerSize}
          className="mobile-sidebar-drawer"
        >
          <DashboardSidebar
            brand={APP_COPY.brand}
            primaryLinks={SIDEBAR_PRIMARY_LINKS}
            libraryLinks={SIDEBAR_LIBRARY_LINKS}
            onNavigate={() => setIsMobileSidebarOpen(false)}
          />
        </Drawer>
        <MovieDetailsDrawer
          isOpen={drawerState.isOpen}
          onClose={handleCloseDrawer}
          movie={drawerState.movie}
          isLoading={drawerState.isLoading}
          error={drawerState.error}
          primaryAction={APP_COPY.detailsAction}
          fallbackAction={APP_COPY.detailsFallback}
        />
      </AppContainer>
    </ThemeProvider>
  );
};

const AppContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  padding: 2.4rem 2.8rem;
  overflow: visible;

  @media (max-width: 1100px) {
    height: auto;
    min-height: 100vh;
    overflow: visible;
    padding: 2rem;
  }

  @media (max-width: 720px) {
    padding: 1.6rem;
  }
`;

const DashboardShell = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 26rem minmax(0, 1fr);
  gap: 2rem;
  height: calc(100vh - 4.8rem);
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    height: auto;
  }

  @media (max-width: 720px) {
    min-height: calc(100vh - 3.2rem);
  }
`;

const SidebarColumn = styled.div`
  position: sticky;
  top: 0;
  align-self: start;
  height: calc(100vh - 4.8rem);

  @media (max-width: 1100px) {
    display: none;
  }
`;

const MainPanel = styled.main`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 2rem;
  min-width: 0;
  height: 100%;
  min-height: 0;
  overflow: visible;
  padding: 0.4rem 0 0.4rem 0.4rem;

  @media (max-width: 1100px) {
    height: auto;
    overflow: visible;
  }
`;

const TopArea = styled.div`
  position: relative;
  z-index: 4;

  @media (max-width: 1100px) {
    position: sticky;
    top: 0;
    z-index: 20;
    padding-top: 0.6rem;
  }
`;

/* TopActions moved into TopBar as `rightActions` */

const BellWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.9rem;
  height: 3.9rem;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background: transparent;
  color: ${({ theme }) => theme.text.secondary};

  &:hover {
    color: ${({ theme }) => theme.text.primary};
    background: ${({ theme }) => theme.alpha.white06};
  }
`;

const NotificationDot = styled.span`
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 0.85rem;
  height: 0.85rem;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background: ${({ theme }) => theme.danger.base};
  box-shadow: 0 0 0 0 ${({ theme }) => theme.alpha.dangerPulse};
  animation: pulse 1.2s infinite;
  z-index: 2;
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 ${({ theme }) => theme.alpha.dangerPulse}; }
    70% { box-shadow: 0 0 0 6px transparent; }
    100% { box-shadow: 0 0 0 0 transparent; }
  }
`;

const Avatar = styled.div`
  display: grid;
  place-items: center;
  width: 3.9rem;
  height: 3.9rem;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background: ${({ theme }) => theme.accent.strong};
  color: ${({ theme }) => theme.misc.white};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const SearchOverlay = styled.div`
  position: absolute;
  top: calc(100% + 0.6rem);
  left: 0;
  width: min(44rem, 100%);
  z-index: 30;

  @media (max-width: 1100px) {
    top: calc(100% + 0.4rem);
    left: 0;
    width: 100%;
  }
`;

const ContentStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 0;
  overflow-y: auto;
  overflow-x: visible;
  padding-right: 0.8rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: ${({ theme }) => theme.borderRadius.pill};
  }

  @media (max-width: 1100px) {
    overflow: visible;
    padding-right: 0;
  }
`;

const StateCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.8rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.alpha.navy88};
  border: 1px solid ${({ theme }) => theme.alpha.white06};
  

  svg {
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.misc.gold};
  }
`;

const StateTitle = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 800;
`;

const StateText = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const AmbientGlow = styled.div`
  position: fixed;
  width: 42rem;
  height: 42rem;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  filter: blur(18px);
  opacity: 0.65;
  pointer-events: none;
  background: ${({ $top, theme }) =>
    $top
      ? `radial-gradient(circle, ${theme.accent.soft} 0%, transparent 72%)`
      : `radial-gradient(circle, ${theme.accent.strong} 0%, transparent 72%)`};
  top: ${({ $top }) => ($top ? "-12rem" : "auto")};
  right: ${({ $top }) => ($top ? "8%" : "auto")};
  left: ${({ $top }) => ($top ? "auto" : "-12rem")};
  bottom: ${({ $top }) => ($top ? "auto" : "-16rem")};
`;

export default App;
