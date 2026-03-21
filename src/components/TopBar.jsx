const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text.primary};
  font-size: 1.25rem;
  width: 100%;
  &::placeholder {
    color: ${({ theme }) => theme.text.secondary};
    opacity: 0.7;
  }
`;

import styled from "styled-components";
import PropTypes from "prop-types";
import { SearchOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";

export const TopBar = ({ placeholder, searchValue, onSearchChange }) => {
  return (
    <Bar>
      <SearchSection>
        <SearchOutlined />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
          aria-label="Search movies"
        />
      </SearchSection>
      <Actions>
        <BellWrapper aria-label="Notifications">
          <BellOutlined style={{ fontSize: "1.9rem" }} />
          <NotificationDot />
        </BellWrapper>
        <Avatar>
          <UserOutlined />
        </Avatar>
      </Actions>
    </Bar>
  );
};

TopBar.propTypes = {
  placeholder: PropTypes.string,
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func,
};

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  width: 100%;
  max-width: 44rem;
  padding: 1.1rem 1.6rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(8, 34, 51, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: ${({ theme }) => theme.shadow.soft};
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 1.2rem;
  max-width: 44rem;
  width: 100%;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;


const BellWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.9rem;
  height: 3.9rem;
  cursor: pointer;
`;

const NotificationDot = styled.span`
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 0.85rem;
  height: 0.85rem;
  border-radius: ${({ theme }) => theme.radii.circle};
  background: #ff4d4f;
  box-shadow: 0 0 0 0 rgba(255,77,79,0.7);
  animation: pulse 1.2s infinite;
  z-index: 2;
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(255,77,79,0.7); }
    70% { box-shadow: 0 0 0 6px rgba(255,77,79,0); }
    100% { box-shadow: 0 0 0 0 rgba(255,77,79,0); }
  }
`;

const Avatar = styled.div`
  display: grid;
  place-items: center;
  width: 3.9rem;
  height: 3.9rem;
  border-radius: ${({ theme }) => theme.radii.circle};
  background: ${({ theme }) => theme.accent.strong};
  color: ${({ theme }) => theme.misc.white};
  font-size: 1.7rem;
`;
