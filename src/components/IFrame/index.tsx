"use client";

import { Address, Dot, Dots, Frame, Left, LocalBadge, OpenLink, Shell, Toolbar, Viewport } from "./styled";
import type { IFrameProps } from "./types";

export default function IFrame({
  title,
  src,
  htmlContent,
  height = 500,
  zoom = 0.7,
  responsiveAspectRatio = false,
  aspectRatio = 16 / 9,
}: IFrameProps) {
  const resolvedHeight =
    typeof height === "number" ? `${height}px` : (height ?? "500px");

  const resolvedZoom = Math.min(2, Math.max(0.1, zoom));
  const resolvedAspectRatio = Math.max(0.1, aspectRatio);

  const hasInlineHtml = Boolean(htmlContent?.trim());

  return (
    <Shell
      $height={resolvedHeight}
      $zoom={resolvedZoom}
      $aspectRatio={resolvedAspectRatio}
    >
      <Toolbar>
        <Left>
          <Dots aria-hidden="true">
            <Dot />
            <Dot />
            <Dot />
          </Dots>
          <Address>{src ?? "Bundle local (srcDoc)"}</Address>
        </Left>

        {src ? (
          <OpenLink href={src} target="_blank" rel="noreferrer">
            Abrir
          </OpenLink>
        ) : (
          <LocalBadge>Local</LocalBadge>
        )}
      </Toolbar>

      <Viewport $responsiveAspectRatio={responsiveAspectRatio}>
        <Frame
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
      </Viewport>
    </Shell>
  );
}