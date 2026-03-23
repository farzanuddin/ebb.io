import styled from "styled-components";
import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import { APP_COPY } from "../constants";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";

export const PHONE_MAX_WIDTH = 1100;

export const useIsPhone = () => {
  const [isPhone, setIsPhone] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= PHONE_MAX_WIDTH;
  });

  useEffect(() => {
    const onResize = () => setIsPhone(window.innerWidth <= PHONE_MAX_WIDTH);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isPhone;
};

export const TopBar = ({ placeholder, searchValue, onSearchChange, onToggleSidebar, rightActions }) => {
  const inputRef = useRef(null);
  const isPhone = useIsPhone();

  return (
    <>
      <Bar>
        <LeftSection>
          <Hamburger aria-label={APP_COPY.menuLabel} onClick={onToggleSidebar}>
            <MenuOutlined />
          </Hamburger>
          <SearchSection onClick={() => inputRef.current && inputRef.current.focus()}>
            <SearchOutlined />
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={searchValue}
              onChange={e => onSearchChange(e.target.value)}
              aria-label={APP_COPY.searchAriaLabel}
            />
          </SearchSection>
        </LeftSection>
        {isPhone &&
          <RightActions>{rightActions}</RightActions>
        }
      </Bar>
      {!isPhone &&
        <RightActions>{rightActions}</RightActions>
      }
    </>
  );
};

TopBar.propTypes = {
  placeholder: PropTypes.string,
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func,
  onToggleSidebar: PropTypes.func,
  rightActions: PropTypes.node,
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
  border: 1px solid ${({ theme }) => theme.alpha.white06};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  @media (max-width: 1100px) {
    max-width: none;
    padding: 0.8rem 0.6rem;
  }
  @media (min-width: 1101px) {
    padding-right: 6rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex: 1;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: absolute;
  top: 0.35rem;
  right: 0;
  z-index: 6;

  @media (max-width: 1100px) {
    position: static;
    flex-shrink: 0;
  }
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
  }

  &:focus-within {
    outline: 2.5px solid ${({ theme }) => theme.misc.blue};
    outline-offset: 2px;
  }

  @media (max-width: 1100px) {
    max-width: none;
    margin-left: 0.2rem;
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
    outline-offset: 0 !important;
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text.primary};
  font-size: 2rem;
  width: 3.4rem;
  height: 3.4rem;
  place-items: center;
  margin-right: 0.4rem;

  @media (max-width: 1100px) {
    display: grid;
  }
`;