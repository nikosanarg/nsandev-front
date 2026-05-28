"use client";

import { useMemo } from "react";
import { Star, StarFieldContainer } from "./styled";

type BackgroundStar = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  shouldTwinkle: boolean;
};

type StarFieldProps = {
  starCount?: number;
  maxStarSize?: number;
  twinkleChance?: number;
  twinkleMinDuration?: number;
  twinkleMaxDuration?: number;
  twinkleMinOpacity?: number;
  twinkleMaxOpacity?: number;
  className?: string;
};

const createSeededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const generateGaussianPosition = (
  center: number,
  spread: number,
  random: () => number
) => {
  let u = 0;
  let v = 0;

  while (u === 0) u = random();
  while (v === 0) v = random();

  const z0 = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Math.max(0, Math.min(center + z0 * spread, 100));
};

const createStar = (
  size: number,
  id: number,
  random: () => number,
  twinkleChance: number,
  twinkleMinDuration: number,
  twinkleMaxDuration: number
): BackgroundStar => ({
  shouldTwinkle: random() < twinkleChance,
  id,
  x: generateGaussianPosition(50, 25, random),
  y: generateGaussianPosition(62.5, 25, random),
  size,
  duration:
    twinkleMinDuration +
    random() * Math.max(twinkleMaxDuration - twinkleMinDuration, 0),
  delay: random() * twinkleMaxDuration,
});

const buildStars = (
  starCount: number,
  maxStarSize: number,
  twinkleChance: number,
  twinkleMinDuration: number,
  twinkleMaxDuration: number
): BackgroundStar[] => {
  const random = createSeededRandom(
    starCount * 1009 +
      Math.floor(maxStarSize * 1000) +
      Math.floor(twinkleChance * 1000) +
      Math.floor(twinkleMinDuration * 1000) +
      Math.floor(twinkleMaxDuration * 1000)
  );

  return Array.from({ length: starCount }, (_, index) =>
    createStar(
      1 + random() * maxStarSize,
      index,
      random,
      twinkleChance,
      twinkleMinDuration,
      twinkleMaxDuration
    )
  );
};

export default function StarField({
  starCount = 140,
  maxStarSize = 1.4,
  twinkleChance = 1,
  twinkleMinDuration = 0.6,
  twinkleMaxDuration = 2.75,
  twinkleMinOpacity = 0.04,
  twinkleMaxOpacity = 1,
  className,
}: StarFieldProps) {
  const stars = useMemo(
    () =>
      buildStars(
        starCount,
        maxStarSize,
        twinkleChance,
        twinkleMinDuration,
        twinkleMaxDuration
      ),
    [
      starCount,
      maxStarSize,
      twinkleChance,
      twinkleMinDuration,
      twinkleMaxDuration,
    ]
  );

  return (
    <StarFieldContainer className={className}>
      {stars.map((star) => (
        <Star
          key={star.id}
          $size={star.size}
          $x={star.x}
          $y={star.y}
          $duration={star.duration}
          $delay={star.delay}
          $shouldTwinkle={star.shouldTwinkle}
          $twinkleMinOpacity={twinkleMinOpacity}
          $twinkleMaxOpacity={twinkleMaxOpacity}
        />
      ))}
    </StarFieldContainer>
  );
}