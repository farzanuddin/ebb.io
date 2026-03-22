import styled from "styled-components";
import {
  AppstoreOutlined,
  ClockCircleOutlined,
  CompassOutlined,
  DownloadOutlined,
  HeartOutlined,
  HomeFilled,
  LogoutOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import PropTypes from 'prop-types';
import { APP_COPY } from "../constants";

const iconMap = {
  home: HomeFilled,
  compass: CompassOutlined,
  grid: AppstoreOutlined,
  heart: HeartOutlined,
  play: PlayCircleOutlined,
  clock: ClockCircleOutlined,
  folder: FolderOpenOutlined,
  download: DownloadOutlined,
};

const SidebarGroup = ({ title, items }) => (
  <LinkGroup>
    {title ? <GroupLabel>{title}</GroupLabel> : null}
    <NavList>
      {items.map((item) => {
        const Icon = iconMap[item.icon] || CompassOutlined;

        return (
          <li key={item.key}>
            <NavButton $active={item.active} data-label={item.label}>
              <Icon />
              <span>{item.label}</span>
            </NavButton>
          </li>
        );
      })}
    </NavList>
  </LinkGroup>
);

export const DashboardSidebar = ({ brand, primaryLinks, libraryLinks }) => {
  return (
    <Sidebar>
      <BrandLockup>
        <BrandLogo src="/logo.svg" alt={APP_COPY.appLogoAlt} />
        <span>{brand}</span>
      </BrandLockup>

      <SidebarStack>
        <SidebarGroup items={primaryLinks} />
        <SidebarGroup title={APP_COPY.sidebarLibraryTitle} items={libraryLinks} />
      </SidebarStack>

      <FooterActions>
        <FooterButton>
          <SettingOutlined />
          <span>{APP_COPY.settingsLabel}</span>
        </FooterButton>
        <FooterButton $danger>
          <LogoutOutlined />
          <span>{APP_COPY.logoutLabel}</span>
        </FooterButton>
      </FooterActions>
    </Sidebar>
  );
};

SidebarGroup.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string,
      icon: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
};

DashboardSidebar.propTypes = {
  brand: PropTypes.string,
  primaryLinks: PropTypes.array.isRequired,
  libraryLinks: PropTypes.array.isRequired,
};

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  min-height: 100%;
  padding: 2.4rem 1.8rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: linear-gradient(180deg, ${({ theme }) => theme.alpha.deep98} 0%, ${({ theme }) => theme.alpha.navy88} 100%);
  border: 1px solid ${({ theme }) => theme.alpha.white08};
  box-shadow: inset 0 1px 0 ${({ theme }) => theme.alpha.white05};

  @media (max-width: 1100px) {
    min-height: auto;
  }
`;

const BrandLockup = styled.div`
  display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: 700;
    color: ${({ theme }) => theme.misc.white};
`;

const BrandLogo = styled.img`
  width: 2.2rem;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
`;

const SidebarStack = styled.div`
  display: grid;
  gap: 2.2rem;
`;

const LinkGroup = styled.div`
  display: grid;
  gap: 1.1rem;
`;

const GroupLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text.muted};
  padding-left: 1.2rem;
`;

const NavList = styled.ul`
  display: grid;
  gap: 0.4rem;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.15rem 1.2rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $active, theme, 'data-label': dataLabel }) => {
    if ($active && dataLabel === "Home") {
      return `linear-gradient(135deg, ${theme.alpha.sky68} 0%, ${theme.alpha.sky54} 100%)`;
    }
    return $active ? theme.accent.strong : "transparent";
  }};
  color: ${({ $active, theme }) => ($active ? theme.misc.white : theme.text.secondary)};
  border: none;
  transition: transform 180ms ease, background 180ms ease, color 180ms ease;

  &[data-label]:not([data-label="Home"]):hover {
    color: ${({ theme }) => theme.text.primary};
    background: ${({ theme }) => theme.alpha.white05};
  }

  svg {
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: currentColor;
    transition: transform 180ms ease, color 180ms ease;
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: 600;
  }

  
`;

const FooterActions = styled.div`
  display: grid;
  gap: 0.8rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.alpha.white06};
  margin-top: auto;
  align-self: stretch;
`;

const FooterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 1.2rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.text.secondary};
  background: transparent;

  &:hover {
    color: ${({ $danger, theme }) => ($danger ? theme.danger.soft : theme.text.primary)};
    background: ${({ $danger, theme }) => ($danger ? theme.alpha.dangerSoft : theme.alpha.white05)};
  }

  span {
    font-weight: 600;
  }
`;
