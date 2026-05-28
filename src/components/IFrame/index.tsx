"use client";

import * as S from "./styled";
import type { IFrameProps } from "./types";

export default function IFrame({
  title,
  src,
  htmlContent,
  height = 720,
  zoom = 0.8,
}: IFrameProps) {
  const resolvedHeight =
    typeof height === "number" ? `${height}px` : (height ?? "720px");

  const resolvedZoom = Math.min(2, Math.max(0.1, zoom));

  const hasInlineHtml = Boolean(htmlContent?.trim());

  return (
    <S.Shell $height={resolvedHeight} $zoom={resolvedZoom}>
      <S.Toolbar>
        <S.Left>
          <S.Dots aria-hidden="true">
            <S.Dot />
            <S.Dot />
            <S.Dot />
          </S.Dots>
          <S.Address>{src ?? "Bundle local (srcDoc)"}</S.Address>
        </S.Left>

        {src ? (
          <S.OpenLink href={src} target="_blank" rel="noreferrer">
            Abrir
          </S.OpenLink>
        ) : (
          <S.LocalBadge>Local</S.LocalBadge>
        )}
      </S.Toolbar>

      <S.Viewport>
        <S.Frame
          title={title}
          src={src}
          srcDoc={htmlContent}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox={
            hasInlineHtml
              ? "allow-scripts allow-same-origin allow-forms allow-popups"
              : undefined
          }
        />
      </S.Viewport>
    </S.Shell>
  );
}