/* SLIDER SCRIPT */

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsContainer = document.querySelector(".page-dots");
  const dots = [];

  let slideIndex = 0;
  const slideInterval = 3000;

  function showSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active-dot", dotIndex === index);
    });
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % dots.length;
    showSlide(slideIndex);
  }

  function prevSlide() {
    slideIndex = (slideIndex - 1 + dots.length) % dots.length;
    showSlide(slideIndex);
  }

  function createDots() {
    for (let i = 0; i < slider.children.length; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => showSlide(i));
      dots.push(dot);
      dotsContainer.appendChild(dot);
    }

    dots[0].classList.add("active-dot");
  }

  createDots();

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  setInterval(nextSlide, slideInterval);
});
  
  /* SIDE MENU SCRIPT */

  document.addEventListener("DOMContentLoaded", function() {
    const sideMenu = document.querySelector(".side-menu-container");
    
    function toggleSideMenu() {
        if (window.pageYOffset > 150) {
            sideMenu.classList.add("active");
        } else {
            sideMenu.classList.remove("active");
        }
    }
    
    toggleSideMenu();
    
    window.addEventListener("scroll", function() {
        toggleSideMenu();
    });
});

/* NUMBER ANIMATION SCRIPT */

  function animateNumber(element, targetNumber, duration) {
    let currentNumber = 0;
    const step = Math.ceil(targetNumber / (duration / 16)); 

    const interval = setInterval(() => {
      currentNumber += step;
      if (currentNumber >= targetNumber) {
        currentNumber = targetNumber;
        clearInterval(interval);
      }

      element.innerText = currentNumber;
    }, 16); 
  }

  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const numberElements = entry.target.querySelectorAll('.info-area h4');
        const targetNumbers = [1961, 9, 2000, 500];
        const animationDuration = 1000; 

        numberElements.forEach((element, index) => {
          animateNumber(element, targetNumbers[index], animationDuration);
        });

        observer.unobserve(entry.target); 
      }
    });
  }

  const options = {
    root: null, 
    rootMargin: '0px',
    threshold: 1.0,
  };

  const observer = new IntersectionObserver(handleIntersection, options);


  const foundationSection = document.querySelector('.foundation-section');
  if (foundationSection) {
    observer.observe(foundationSection);
  }
  