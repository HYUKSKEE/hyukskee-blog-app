import styled from "styled-components";
import { BsSun, BsMoonFill } from "react-icons/bs";
import { useContext } from "react";
import { ThemeContext } from "context/ThemeContext";

export default function Footer() {
  const context = useContext(ThemeContext);
  return (
    <CommonFooter>
      <FooterText>Hyukskee blog</FooterText>
      <div>
        {context.theme === "light" ? (
          <BsSunIcon onClick={context.toggleMode} />
        ) : (
          <BsMoonFillIcon onClick={context.toggleMode} />
        )}
      </div>
    </CommonFooter>
  );
}

const CommonFooter = styled.footer`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px;
  border-top: 1px solid #dedede;
  background-color: #ffffff;
`;

const FooterText = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: #dfdfdf;
`;

const BsSunIcon = styled(BsSun)`
  font-size: 24px;
  cursor: pointer;
`;

const BsMoonFillIcon = styled(BsMoonFill)`
  font-size: 24px;
  cursor: pointer;
`;
