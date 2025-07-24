document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  menuToggle?.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    mainNav.classList.toggle("active");
  });
});


document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const split = new SplitType('.hero-title-split', {
    types: 'lines',
    lineClass: 'line'
  });

  gsap.from(split.lines, {
    yPercent: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.hero-title-split',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    onStart: () => {
      document.querySelector('.hero-title-split').style.opacity = 1;
    }
  });
});





gsap.registerPlugin(ScrollTrigger)

window.addEventListener("DOMContentLoaded", () => {

    /* LENIS SMOOTH SCROLL (OPTIONAL) */
    lenis = new Lenis({
        autoRaf: true,
    })
    /* LIENIS SMOOTH SCROLL (OPTIONAL) */

    gsap.to('.scroll', {
        autoAlpha:0,
        duration:0.2,
        scrollTrigger: {
            trigger:'.about-section',
            start:'top top',
            end:'top top-=1',
            toggleActions: "play none reverse none"
        }
    })

    const paragraph = document.querySelector(".about-section .paragraph")
    wrapWordsInSpan(paragraph)

    const pinHeight = document.querySelector(".about-section .pin-height")
    const container = document.querySelector(".about-section .container")
    const words = document.querySelectorAll(".about-section .word")

    gsap.to(words, {
        x: 0, // Animate the 'x' property to 0
        stagger: 0.02, // Stagger the animation of each element by 0.02 seconds
        ease: 'power4.inOut', // Use a power4 easing function for smooth start and end
        scrollTrigger: {
            trigger: pinHeight, // We listen to pinHeight position
            start: 'top top', // Start the animation when the top of the trigger hits the top of the viewport
            end: 'bottom bottom', // End the animation when the bottom of the trigger hits the bottom of the viewport
            scrub: true, // Smoothly scrub the animation based on scroll position
            pin: container, // Let's pin our container while all the words animate
        }
    })
})

// UTIL METHOD
function wrapWordsInSpan(element) {
    const text = element.textContent;
    element.innerHTML = text
        .split(' ')
        .map(word => `<span class="word">${word}</span>`)
        .join(' ');
}





gsap.registerPlugin(ScrollTrigger)

window.addEventListener("DOMContentLoaded", () => {

    /* LENIS SMOOTH SCROLL (OPTIONAL) */
    lenis = new Lenis({
        autoRaf: true,
    })
    /* LIENIS SMOOTH SCROLL (OPTIONAL) */

    gsap.to('.scroll', {
        autoAlpha:0,
        duration:0.2,
        scrollTrigger: {
            trigger:'.product-section',
            start:'top top',
            end:'top top-=1',
            toggleActions: "play none reverse none"
        }
    })

    const slides = document.querySelectorAll('.product-section .slide')

    slides.forEach(slide => {
        const contentWrapper = slide.querySelector('.content-wrapper')
        const content = slide.querySelector('.content')

        
        if (!slide.classList.contains('end-slide')) {
            gsap.to(content, {
                rotationZ: (Math.random() - 0.5) * 10, // RotationZ between -5 and 5 degrees
                scale: 0.7, // Slight reduction of the content
                rotationX: 40,
                ease: 'power1.in', // Starts gradually
                scrollTrigger: {
                    pin: contentWrapper, // contentWrapper is pinned during the animation
                    trigger: slide, // Listens to the slide’s position
                    start: 'top 0%', // Starts when its top reaches the top of the viewport
                    end: '+=' + window.innerHeight, // Ends 100vh later
                    scrub: true // Progresses with the scroll
                }
            })
        } else {
            // just scroll the last slide normally
            gsap.to(content, {
                autoAlpha: 0, // Ends at opacity: 0 and visibility: hidden
                ease: 'power1.in', // Starts gradually
                scrollTrigger: {
                    trigger: content, // Listens to the position of content
                    start: 'top -80%', // Starts when the top exceeds 80% of the viewport
                    end: '+=' + 0.2 * window.innerHeight, // Ends 20% later
                    scrub: true // Progresses with the scroll
                }
            });
        }
        // Fade out the content after the animation
        gsap.to(content, {
            autoAlpha: 0, // Ends at opacity: 0 and visibility: hidden
            ease: 'power1.in', // Starts gradually
            scrollTrigger: {
                trigger: content, // Listens to the position of content
                start: 'top -80%', // Starts when the top exceeds 80% of the viewport
                end: '+=' + 0.2 * window.innerHeight, // Ends 20% later
                scrub: true // Progresses with the scroll
            }
        })
    })
})



gsap.registerPlugin(ScrollTrigger)

window.addEventListener("DOMContentLoaded", () => {

    /* LENIS SMOOTH SCROLL (OPTIONAL) */
    lenis = new Lenis({
        autoRaf: true,
    })
    /* LENIS SMOOTH SCROLL (OPTIONAL) */

    gsap.to('.scroll', {
        autoAlpha:0,
        duration:0.2,
        scrollTrigger: {
            trigger:'.teams-intro',
            start:'top top',
            end:'top top-=1',
            toggleActions: "play none reverse none"
        }
    })

    const root = document.querySelector('.teams-intro')
    
    // Get the actual text content
    const textPath = root.querySelector('#textpath')
    const text = textPath.textContent.trim()
    
    // Calculate text width using canvas
    const textPathLength = getTextWidth(text) * 1.25
    
    // Calculate final offset percentage
    const pathLength = root.querySelector('#path').getTotalLength()
    const finalOffset = -(textPathLength * 100 / pathLength)

    gsap.to(textPath, {
        attr: { startOffset: finalOffset + "0%" }, // Here we are targeting an attribute value, not a CSS property
        ease:'none', // Linear movement
        scrollTrigger: {
            trigger: '.teams-intro .pin-height',
            start: 'top top',
            end: 'bottom bottom',
            pin: '.teams-intro .container',
            scrub: true // Progresses with the scroll
        }
    }) 

    // UTIL METHOD
    function getTextWidth(text) {
        const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"))
        const context = canvas.getContext("2d")
        const computedStyle = window.getComputedStyle(document.querySelector('#textpath'))
        context.font = computedStyle.font
        
        return context.measureText(text).width
    }
})



gsap.registerPlugin(ScrollTrigger)

window.addEventListener("DOMContentLoaded", () => {

    /* LENIS SMOOTH SCROLL (OPTIONAL) */
    lenis = new Lenis({
        autoRaf: true,
    })
    /* LIENIS SMOOTH SCROLL (OPTIONAL) */

    gsap.to('.scroll', {
        autoAlpha:0,
        duration:0.2,
        scrollTrigger: {
            trigger:'.teams-section',
            start:'top top',
            end:'top top-=1',
            toggleActions: "play none reverse none"
        }
    })

    const pinHeight = document.querySelector('.teams-section .pin-height')
    const circles = document.querySelectorAll('.circle')

    gsap.fromTo('.teams-section .circles', {
        y: '5%' // The `circles` div starts at 5% of its height on the y-axis
    }, {
        y: '-5%', // And ends at -5% of its height on the y-axis
        ease: 'none',
        scrollTrigger: {
            trigger: pinHeight, // Monitor the position of pin-height
            start: 'top top',
            end: 'bottom bottom',
            pin: '.teams-section .container', // Pin the container in place
            scrub: true // Progress linked to scrolling
        }
    })

    // Calculate half of the fan range
    let angle = 3, 
        halfRange = (circles.length - 1) * angle / 2,
        rot = -halfRange

    const distPerCard = (pinHeight.clientHeight - window.innerHeight) / circles.length
        
    circles.forEach( (circle, index) => {
        
        gsap.to(circle, {
            rotation: rot, // The circle starts at 0° and ends at the `rot` value
            ease: 'power1.out',
            scrollTrigger: {
                trigger: pinHeight, // Monitor the position of pin-height
                // Animation starts at distPerCard * the index of the card
                start: 'top top-=' + (distPerCard) * index,
                // And lasts exactly for distPerCard
                end: '+=' + (distPerCard),
                scrub: true // Progress linked to scrolling
            }  
        })
        gsap.to(circle.querySelector('.card'), {
            // Optional: Apply 'rot' to the card to enhance the rotation effect
            rotation: rot,
            y: '-50%', // Positions the card in the center of the viewport
            ease: 'power1.out',
            scrollTrigger: {
                trigger: pinHeight, // Monitor the position of pin-height
                // Animation starts at distPerCard * the index of the card
                start: 'top top-=' + (distPerCard) * index,
                // And lasts exactly for distPerCard
                end: '+=' + (distPerCard),
                scrub: true // Progress linked to scrolling
            }  
        })

        rot += angle
    })
})