import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  color: white;
  background: crimson;
`;

interface ButtonProps {}

const Button: React.FC<ButtonProps> = () => (
  <StyledButton data-testid="button-component">
    <h1 className="heading">Button Pov</h1>
  </StyledButton>
);

export default Button;
