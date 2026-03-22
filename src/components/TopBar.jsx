import styled from "styled-components";
import PropTypes from "prop-types";
import { APP_COPY } from "../constants";
import { SearchOutlined } from "@ant-design/icons";

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
          aria-label={APP_COPY.searchAriaLabel}
        />
      </SearchSection>
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
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.alpha.navy88};
  border: 1px solid ${({ theme }) => theme.alpha.white08};
  box-shadow: ${({ theme }) => theme.shadow.soft};
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 1.2rem;
  max-width: 44rem;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};

    padding: 0.35rem;
    
    &:focus,
    &:focus-visible,
    &:focus-within {
      outline: none !important;
      box-shadow: none !important;
  }
    
    &:focus-within {
      outline: 2.5px solid ${({ theme }) => theme.misc.blue};
      outline-offset: 2px;
      box-shadow: 0 0 0 2px ${({ theme }) => theme.alpha.accentGlow};
    }
`;

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  width: 100%;
  &::placeholder {
    color: ${({ theme }) => theme.text.secondary};
    opacity: 0.7;
  }
  &:focus-visible {
    outline: none !important;
    box-shadow: none !important;
    outline-offset: 0 !important;
  }
`;