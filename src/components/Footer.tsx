import styled from "styled-components";

export default function Footer() {
  return (
    <>
      <CommonFooter>Hyukskee blog</CommonFooter>
    </>
  );
}

const CommonFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  font-size: 24px;
  font-weight: 900;
  border-top: 1px solid #dedede;
  color: #dfdfdf;
  background-color: #ffffff;
`;
