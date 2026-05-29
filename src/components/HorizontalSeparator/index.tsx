import styled from 'styled-components';

const StyledSeparator = styled.div`
  width: 100%;
  height: 20px;
  margin-top: 3rem;
  border-radius: 4rem;
  transform: scaleX(1.04);
  position: relative;
`;

interface HorizontalSeparatorProps {
  invisible?: boolean;
}

const HorizontalSeparator = ({ invisible }: HorizontalSeparatorProps) => {
  return (
    <StyledSeparator style={{
      background: invisible ? 'none' : 'linear-gradient(180deg, rgba(18, 76, 192, 0.17), transparent, transparent)'
    }} />
  )
}

export default HorizontalSeparator