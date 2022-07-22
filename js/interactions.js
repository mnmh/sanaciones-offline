gsap.registerPlugin(ScrollTrigger);

const sectionsLeft = gsap.utils.toArray('.from-left');
sectionsLeft.forEach(sectionL => {
    gsap.from(sectionL, {
        x: -100,
        duration: 1,
        opacity: 0,
        ease: "power3"
    });
    
    gsap.to(sectionL, {
        scrollTrigger: {
            trigger: sectionL,
            start: "top center",
            end: "bottom center",
            markers: true
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3"
    });
});

const sectionsRight = gsap.utils.toArray('.from-right');
sectionsRight.forEach(sectionR => {
    gsap.from(sectionR, {
        x: 100,
        duration: 1,
        opacity: 0,
        ease: "power3"
    });
    
    gsap.to(sectionR, {
        scrollTrigger: {
            trigger: sectionR,
            start: "top center",
            end: "bottom center",
            markers: true
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3"
    });
});


gsap.from(".inside-mask-bottom", {
    top: 100,
    opacity: 0,
    delay: 1
});

gsap.to(".inside-mask-bottom", {
    scrollTrigger: {
        trigger: ".mask-title",
    },
    top: 0,
    opacity: 1,
    duration: 1,
    delay: 1
});

gsap.from(".inside-mask-top", {
    bottom: 100,
    opacity: 0,
    delay: 1
});

gsap.to(".inside-mask-top", {
    scrollTrigger: {
        trigger: ".mask-title",
    },
    bottom: 0,
    opacity: 1,
    duration: 1,
    delay: 1
});

const showMask = gsap.utils.toArray('.show-mask');
showMask.forEach(showM => {
    gsap.from(showM, {
        scrollTrigger: {
            trigger: showM,
            start: "top center",
            end: "bottom center",
            markers: true
        },
        "height": "0vh",
        duration: 1,
        ease: "power3"
    });
    
    gsap.to(showM, {
        scrollTrigger: {
            trigger: showM,
            start: "top center",
            end: "bottom center",
            markers: true
        },
        "height": "100vh",
        duration: 1
    });
});
