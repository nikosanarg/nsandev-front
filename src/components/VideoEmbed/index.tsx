import { StyledVideoEmbedWrapper, StyledVideoFrame } from "./styled";

type VideoEmbedProps = {
  title: string;
  videoId: string;
};

export default function VideoEmbed({ title, videoId }: VideoEmbedProps) {
  return (
    <StyledVideoEmbedWrapper>
      <StyledVideoFrame
        title={title}
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </StyledVideoEmbedWrapper>
  );
}