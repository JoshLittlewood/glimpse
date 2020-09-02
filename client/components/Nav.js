import React from "react";
import styled from "styled-components";

const Background = styled.nav`
  background: linear-gradient(90deg, #9ebd13 0%, #008552 100%);
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  height: 30px;
  width: 80px;
  border: 2px solid white;
`;

const Nav = () => {
  return (
    <Background>
      <Logo />
    </Background>
  );
};

export default Nav;
