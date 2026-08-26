export type EngagementIntroVideoProps = {
  /** Root-relative path under /public. Left unset for now — no local video
   * file exists in this repo yet, so there's nothing real to point at.
   * Swap in the real path (e.g. "/videos/engagements-intro.mp4") once one's
   * added; the <video> tag is already wired for autoplay/loop/muted. */
  videoSrc?: string;
  poster?: string;
};

/**
 * Full-width video shown as the first item on the Engagements tab, above
 * the (unchanged) image grid — scoped to that one tab in <Portfolio>, not a
 * shared grid component. Distinct from <CinematicVideo> (the existing
 * heading + hover-only play/pause block further down the Engagements tab):
 * this one has no heading of its own and uses native controls, since it's
 * just the lead-in video, not "Cinematic Stories" restated a second time.
 */
export default function EngagementIntroVideo({ videoSrc, poster }: EngagementIntroVideoProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black">
      <video
        src={videoSrc}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        controls
        className="h-full w-full object-cover"
      />
    </div>
  );
}
