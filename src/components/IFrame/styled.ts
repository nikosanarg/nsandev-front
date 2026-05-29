import styled from "styled-components";

type ShellProps = {
  $height: string;
  $zoom: number;
  $aspectRatio: number;
};

type ViewportProps = {
  $responsiveAspectRatio: boolean;
};

export const Shell = styled.section<ShellProps>`
  --iframe-height: ${({ $height }) => $height};
  --iframe-zoom: ${({ $zoom }) => $zoom};
  --iframe-scale-factor: ${({ $zoom }) => 1 / $zoom};
  --iframe-aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  --iframe-overscan: 2px;

  width: 100%;
  border: 1px solid #1e1e1e;
  border-radius: 24px;
  overflow: hidden;
  background: linear-gradient(180deg, #070b1f 0%, #0a1230 100%);
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.28);

  @media (max-width: 900px) {
    border-radius: 18px;
  }
`;

export const Toolbar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  background-color: #090909;

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

export const Viewport = styled.div<ViewportProps>`
  width: 100%;
  height: ${({ $responsiveAspectRatio }) =>
    $responsiveAspectRatio ? "auto" : "var(--iframe-height)"};
  aspect-ratio: ${({ $responsiveAspectRatio }) =>
    $responsiveAspectRatio ? "var(--iframe-aspect-ratio)" : "auto"};
  background-color: #020a25;
  overflow: hidden;
`;

export const Frame = styled.iframe`
  display: block;
  width: calc((100% * var(--iframe-scale-factor)) + var(--iframe-overscan));
  height: calc((100% * var(--iframe-scale-factor)) + var(--iframe-overscan));
  border: 0;
  background-color: #ffffff;
  transform: scale(var(--iframe-zoom));
  transform-origin: top left;
  will-change: transform;
`;