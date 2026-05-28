import styled from "styled-components";

type ShellProps = {
  $height: string;
  $zoom: number;
};

export const Shell = styled.section<ShellProps>`
  --iframe-height: ${({ $height }) => $height};
  --iframe-zoom: ${({ $zoom }) => $zoom};
  --iframe-scale-factor: ${({ $zoom }) => (1 / $zoom).toFixed(4)};

  width: 100%;
  border: 1px solid #d7d7d7;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(180deg, #fcfcfc 0%, #f2f2f2 100%);
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.16);

  @media (max-width: 900px) {
    border-radius: 12px;
  }
`;

export const Toolbar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  background-color: #0f172a;

  @media (max-width: 900px) {
    padding: 8px 10px;
  }
`;

export const Left = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Dots = styled.div`
  display: inline-flex;
  gap: 6px;
`;

export const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;

  &:nth-child(1) {
    background-color: #ef4444;
  }

  &:nth-child(2) {
    background-color: #f59e0b;
  }

  &:nth-child(3) {
    background-color: #10b981;
  }
`;

export const Address = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #e2e8f0;
  font-size: 12px;
  line-height: 16px;
`;

const actionBase = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
`;

export const OpenLink = styled.a`
  ${actionBase}

  color: #0f172a;
  background-color: #e2e8f0;
`;

export const LocalBadge = styled.span`
  ${actionBase}

  color: #94a3b8;
  background-color: #1e293b;
`;

export const Viewport = styled.div`
  width: 100%;
  height: var(--iframe-height);
  background-color: #111827;

  @media (max-width: 900px) {
    height: min(72vh, var(--iframe-height));
  }
`;

export const Frame = styled.iframe`
  display: block;
  width: calc(100% * var(--iframe-scale-factor));
  height: calc(100% * var(--iframe-scale-factor));
  border: 0;
  background-color: #ffffff;
  transform: scale(var(--iframe-zoom));
  transform-origin: top left;
`;