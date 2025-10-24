 //Navigation
        $(document).ready(function($) {
            $('.stellarnav').stellarNav({
              theme: 'dark', // adds default color to nav. (light, dark)
              breakpoint: 992, // number in pixels to determine when the nav should turn mobile friendly
              menuLabel: '&nbsp', // label for the mobile nav
              sticky: false, // makes nav sticky on scroll (desktop only)
              position: 'left', // 'static', 'top', 'left', 'right' - when set to 'top', this forces the mobile nav to be placed absolutely on the very top of page
              openingSpeed: 250, // how fast the dropdown should open in milliseconds
              closingDelay: 250, // controls how long the dropdowns stay open for in milliseconds
              showArrows: true, // shows dropdown arrows next to the items that have sub menus
              phoneBtn: '', // adds a click-to-call phone link to the top of menu - i.e.: "18009084500"
              phoneLabel: 'Call Us', // label for the phone button
              locationBtn: '', // adds a location link to the top of menu - i.e.: "/location/", "http://site.com/contact-us/"
              locationLabel: 'Location', // label for the location button
              closeBtn: false, // adds a close button to the end of nav
              closeLabel: 'Close', // label for the close button
              mobileMode: false,
              scrollbarFix: false // fixes horizontal scrollbar issue on very long navs
            });

            //Slick Slider
            $(".regular").slick({
                dots: true,
                speed: 1000,
		// arrows: false,
                // arrows: false,
                // centerMode: true,
                // centerPadding: '20px',
                // fade: true,
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 3,
		// adaptiveHeight: true,
                // autoplay: true,
                // autoplaySpeed: 2000,
                responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                  }
                }
              ]
            });
	//Banner
            $('.home-slider').slick({
              dots: false,
              arrows: false,
              autoplay: true,
              autoplaySpeed: 5000,
              fade: true,
              infinite: true,
              speed: 300,
              slidesToShow: 1
            });
        });

        

// ========== LOADER ==========
function showLoader() {
  document.getElementById('loader').style.display = 'flex';
}
function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

// ========== BARBA INIT ==========
document.addEventListener("DOMContentLoaded", function () {
  barba.init({
    transitions: [{
      name: 'fade',
      async leave(data) {
        showLoader();
        data.current.container.classList.add('is-leaving');
        await new Promise(resolve => setTimeout(resolve, 500)); // small delay for animation
      },
      async enter(data) {
        data.next.container.classList.add('is-entering');
        await new Promise(resolve => setTimeout(resolve, 50));
        data.next.container.classList.replace('is-entering', 'is-entered');
        hideLoader();
      }
    }]
  });

  // ========== GLOBAL SCROLL TO TOP ==========
  barba.hooks.afterEnter(() => {
    // Smooth scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  });

  // ========== SEO SUPPORT HOOKS ==========
  barba.hooks.afterEnter((data) => {
    // ----- Update <title> -----
    const titleMatch = data.next.html.match(/<title>(.*?)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      document.title = titleMatch[1];
    }

    // ----- Update <meta name="description"> -----
    const nextMetaDesc = data.next.html.match(
      /<meta name=["']description["'] content=["'](.*?)["']>/i
    );
    if (nextMetaDesc && nextMetaDesc[1]) {
      let metaTag = document.querySelector('meta[name="description"]');
      if (metaTag) {
        metaTag.setAttribute('content', nextMetaDesc[1]);
      } else {
        metaTag = document.createElement('meta');
        metaTag.name = "description";
        metaTag.content = nextMetaDesc[1];
        document.head.appendChild(metaTag);
      }
    }

    // ----- Update <meta property="og:title"> and <meta property="og:description"> -----
    const ogTitle = data.next.html.match(/<meta property=["']og:title["'] content=["'](.*?)["']>/i);
    if (ogTitle && ogTitle[1]) {
      let ogTag = document.querySelector('meta[property="og:title"]');
      if (ogTag) ogTag.setAttribute('content', ogTitle[1]);
    }

    const ogDesc = data.next.html.match(/<meta property=["']og:description["'] content=["'](.*?)["']>/i);
    if (ogDesc && ogDesc[1]) {
      let ogTag = document.querySelector('meta[property="og:description"]');
      if (ogTag) ogTag.setAttribute('content', ogDesc[1]);
    }

    // ----- Optional: Google Analytics Pageview -----
    if (typeof gtag === "function") {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: data.next.url.path
      });
    }
  });
});





// menu manupulation js.................................
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".navbar .container");
  const menuBlock = document.querySelector(".menu-block");
  const btn = document.querySelector(".primary-btn-1");
  const navUl = document.querySelector(".stellarnav ul");

  function adjustLayout() {
    const width = window.innerWidth;

    // Case 1: <= 400px
    if (width <= 400) {
      // remove main-block if exists
      const main = container.querySelector(".main-block");
      if (main) {
        container.insertBefore(menuBlock, main);
        main.remove();
      }

      // move button inside menu, but only once
      if (navUl && btn && !navUl.contains(btn)) {
        // check if there’s already an li holding the button
        let existingLi = navUl.querySelector("li.btn-holder");
        if (!existingLi) {
          existingLi = document.createElement("li");
          existingLi.className = "btn-holder";
          navUl.appendChild(existingLi);
        }
        existingLi.appendChild(btn);
      }
      return;
    }

    // Case 2: between 401px and 991px
    if (width <= 991) {
      const btnInMenu = navUl && navUl.contains(btn);
      if (btnInMenu) {
        // remove any empty li.btn-holder left behind
        const holder = navUl.querySelector("li.btn-holder");
        if (holder && holder.children.length === 0) holder.remove();
      }

      if (!container.querySelector(".main-block")) {
        const main = document.createElement("div");
        main.className = "main-block";
        const logoBlock = container.querySelector(".logo-block");
        container.insertBefore(main, logoBlock.nextElementSibling || null);
        main.append(menuBlock, btn);
      }
      return;
    }

    // Case 3: > 991px
    const main = container.querySelector(".main-block");
    if (main) {
      container.insertBefore(menuBlock, main);
      container.append(btn);
      main.remove();
    } else if (navUl && navUl.contains(btn)) {
      // restore from menu if necessary
      container.append(btn);
      const holder = navUl.querySelector("li.btn-holder");
      if (holder && holder.children.length === 0) holder.remove();
    }
  }

  adjustLayout();
  window.addEventListener("resize", adjustLayout);
});




var swiper = new Swiper(".bannerSwipper", {
  loop: true, 
  autoplay: {
  delay: 3000,                // Time between slides (ms)
  disableOnInteraction: false,// Keep autoplay after user interaction
  pauseOnMouseEnter: true,    // Pause autoplay on hover
},
});