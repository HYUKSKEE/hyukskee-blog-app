import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  return (
    <HomeHeader>
      <HomeLogo>
        <LogoLink to="/">Hyukskee Blog</LogoLink>
      </HomeLogo>
      <HomeNavigation>
        <li>
          <NavigationLink to="/posts/new">글쓰기</NavigationLink>
        </li>
        <li>
          <NavigationLink to="/posts">게시글</NavigationLink>
        </li>
        <li>
          <NavigationLink to="/profile">프로필</NavigationLink>
        </li>
      </HomeNavigation>
    </HomeHeader>
  );
}

const HomeHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 32px;
`;

const HomeLogo = styled.div`
  font-size: 24px;
  font-weight: 900;
`;

const HomeNavigation = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  gap: 24px;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: #0f0f0f;
`;

const NavigationLink = styled(Link)`
  text-decoration: none;
  color: #02af89;

  &:hover,
  :focus {
    color: black;
  }
`;
