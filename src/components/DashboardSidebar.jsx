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

import PropTypes from 'prop-types';

const SidebarGroup = ({ title, items }) => (
  <LinkGroup>
    {title ? <GroupLabel>{title}</GroupLabel> : null}
    <NavList>
      {items.map((item) => {
        const Icon = iconMap[item.icon] || CompassOutlined;

        return (
          <NavItem key={item.key}>
            <NavButton $active={item.active}>
              <Icon />
              <span>{item.label}</span>
            </NavButton>
          </NavItem>
        );
      })}
    </NavList>
  </LinkGroup>
);

export const DashboardSidebar = ({ primaryLinks, libraryLinks }) => {
  return (
    <Sidebar>
      <BrandLockup>
        <BrandLogo src="/asset.svg" alt="App logo" />
      </BrandLockup>

      <SidebarStack>
        <SidebarGroup items={primaryLinks} />
        <SidebarGroup title="Library" items={libraryLinks} />
      </SidebarStack>

      <FooterActions>
        <FooterButton>
          <SettingOutlined />
          <span>Settings</span>
        </FooterButton>
        <FooterButton $danger>
          <LogoutOutlined />
          <span>Logout</span>
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
  primaryLinks: PropTypes.array.isRequired,
  libraryLinks: PropTypes.array.isRequired,
};

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  min-height: 100%;
  padding: 2.4rem 1.8rem;
  border-radius: ${({ theme }) => theme.radii.xxl};
  background: linear-gradient(180deg, rgba(6, 33, 53, 0.96) 0%, rgba(8, 42, 64, 0.88) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);

  @media (max-width: 1100px) {
    min-height: auto;
  }
`;

const BrandLockup = styled.div`
  display: block;
`;

const BrandLogo = styled.img`
  width: 13.2rem;
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
  font-size: 1.1rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text.muted};
  padding-left: 1.2rem;
`;

const NavList = styled.ul`
  display: grid;
  gap: 0.4rem;
`;

const NavItem = styled.li``;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.15rem 1.2rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ $active, theme, children }) => {
    // children[1] is the <span> with label
    if ($active && children && children[1] && children[1].props && children[1].props.children === "Home") {
      return `linear-gradient(135deg, rgba(22,182,217,0.68) 0%, rgba(31,127,214,0.54) 100%)`;
    }
    return $active ? theme.accent.strong : "transparent";
  }};
  color: ${({ $active, theme }) => ($active ? theme.misc.white : theme.text.secondary)};
  border: none;
  transition: transform 180ms ease, background 180ms ease, color 180ms ease;

  /* Remove hover for HOME button */
  ${({ $active, children }) => {
    if ($active && children && children[1] && children[1].props && children[1].props.children === "Home") {
      return '';
    }
    return `
      &:hover {
        transform: ${'${({ $active }) => ($active ? "none" : "translateX(2px)")};'}
        color: ${'${({ theme }) => theme.accent.strong};'}
        background: ${'${({ $active, theme }) => ($active ? theme.accent.soft : "rgba(255, 255, 255, 0.05)")};'}
      }
    `;
  }}

  span {
    font-size: 1.45rem;
    font-weight: 600;
  }

  svg {
    font-size: 1.6rem;
  }
`;

const FooterActions = styled.div`
  display: grid;
  gap: 0.8rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: auto;
  align-self: stretch;
`;

const FooterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 1.2rem;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.text.secondary};
  background: transparent;

  &:hover {
    color: ${({ $danger, theme }) => ($danger ? "#ffd6d6" : theme.text.primary)};
    background: ${({ $danger }) => ($danger ? "rgba(255, 92, 92, 0.16)" : "rgba(255, 255, 255, 0.05)")};
  }

  span {
    font-weight: 600;
  }
`;
