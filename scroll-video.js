document.addEventListener("DOMContentLoaded", () => {

  const videos = document.querySelectorAll(".scroll-video");

  videos.forEach(video => {

    // SETTINGS
    const speed =
      parseFloat(video.dataset.speed) || 1;

    const start =
      parseFloat(video.dataset.start) || 0;

    const finish =
      parseFloat(video.dataset.finish) || 1;

    const smoothness =
      parseFloat(video.dataset.smooth) || 0.08;

    // each 100vh = full video
    const scrollArea =
      window.innerHeight;

    video.addEventListener("loadedmetadata", () => {

      let currentTime = 0;
      let targetTime = 0;

      // update target time from scroll
      const updateScroll = () => {

        const scrollY = window.scrollY;

        // calculate progress
        let progress =
          (scrollY / scrollArea - start) /
          (finish - start);

        // clamp between 0 and 1
        progress = Math.max(0, Math.min(progress, 1));

        // set target video time
        targetTime =
          progress * video.duration * speed;
      };

      // smooth animation loop
      const animate = () => {

        // lerp smoothing
        currentTime +=
          (targetTime - currentTime) * smoothness;

        // prevent tiny jumps
        if (Math.abs(targetTime - currentTime) < 0.001) {
          currentTime = targetTime;
        }

        // update video
        video.currentTime = currentTime;

        requestAnimationFrame(animate);
      };

      // scroll listener
      window.addEventListener("scroll", updateScroll);

      // initial run
      updateScroll();
      animate();

    });

  });

});
