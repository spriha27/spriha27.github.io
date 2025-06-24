document.addEventListener("DOMContentLoaded", () => {
  // Initialize all carousels on the page
  const carousels = document.querySelectorAll(".carousel-container")

  carousels.forEach((carouselContainer) => {
    const carousel = carouselContainer.querySelector(".carousel")
    const items = carousel.querySelectorAll(".carousel-item")
    const prevBtn = carouselContainer.querySelector(".prev")
    const nextBtn = carouselContainer.querySelector(".next")

    let currentIndex = 0
    let itemsPerView = getItemsPerView()

    // Set initial position
    updateCarouselPosition()

    // Add event listeners
    prevBtn.addEventListener("click", () => {
      currentIndex = Math.max(currentIndex - 1, 0)
      updateCarouselPosition()
    })

    nextBtn.addEventListener("click", () => {
      currentIndex = Math.min(currentIndex + 1, items.length - itemsPerView)
      updateCarouselPosition()
    })

    // Update on window resize
    window.addEventListener("resize", () => {
      itemsPerView = getItemsPerView()
      currentIndex = Math.min(currentIndex, items.length - itemsPerView)
      updateCarouselPosition()
    })

    // Helper functions
    function getItemsPerView() {
      if (window.innerWidth < 768) {
        return 1
      } else if (window.innerWidth < 1024) {
        return 2
      } else {
        return 3
      }
    }

    function updateCarouselPosition() {
      const itemWidth = items[0].offsetWidth + 20 // 20px is the gap
      carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`

      // Update button states
      prevBtn.disabled = currentIndex === 0
      prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1"

      nextBtn.disabled = currentIndex >= items.length - itemsPerView
      nextBtn.style.opacity = currentIndex >= items.length - itemsPerView ? "0.5" : "1"
    }
  })
})
