import styled from 'styled-components';

const StyledSeparator = styled.div`
  width: 100%;
  height: 20px;
  margin-top: 5rem;
  background: linear-gradient(180deg, rgba(120, 18, 192, 0.14), transparent, transparent);
  border-top: 2px groove rgba(120, 18, 192, 0.14);
  border-radius: 15px;
`;

const HorizontalSeparator = () => {
  return (
    <StyledSeparator />
  )
}

export default HorizontalSeparator