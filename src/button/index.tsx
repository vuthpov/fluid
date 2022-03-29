import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  color: white;
  background: crimson;
`;

interface ButtonProps {
  [index: string]: any;
}

const Button: React.FC<ButtonProps> = (props) => (
  <StyledButton {...props}>
    <h1 className="heading">Button dd</h1>
  </StyledButton>
);

export default Button;
