import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  h1 {
    margin-top: 0;
    margin-bottom: 15px;
    margin-left: 80px;
    font-size: 3em;
    font-family: "Merienda", cursive;
    color: darkblue;
  }
  h2 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.5em;
    font-family: "Merienda", cursive;
    color: darkblue;
  }

  @media (max-width: 389px) {
    h1 {
      margin-left: 40px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
