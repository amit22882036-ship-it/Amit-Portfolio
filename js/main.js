(function () {
  "use strict";

  // Detect if the user is on a mobile device
  var isMobile = {
    any: function () {
      return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
    },
  };

  // Set full height sections only on desktop
  var fullHeight = function () {
    if (!isMobile.any()) {
      var setHeight = function () {
        $(".js-fullheight").css("height", $(window).height());
      };
      setHeight();
      $(window).resize(setHeight);
    }
  };

  // Animate content when scrolling down
  var contentWayPoint = function () {
    $(".animate-box").waypoint(
      function (direction) {
        if (direction === "down" && !$(this.element).hasClass("animated")) {
          $(this.element).addClass("fadeInUp animated");
        }
      },
      { offset: "85%" }
    );
  };

  // Toggle the mobile burger menu
  var burgerMenu = function () {
    $(".js-colorlib-nav-toggle").on("click", function (event) {
      event.preventDefault();
      $("body").toggleClass("offcanvas");
      $(this).toggleClass("active");
    });
  };

  // Close mobile menu when clicking outside or scrolling
  var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
      var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $("body").removeClass("offcanvas");
        $(".js-colorlib-nav-toggle").removeClass("active");
      }
    });

    $(window).scroll(function () {
      if ($("body").hasClass("offcanvas")) {
        $("body").removeClass("offcanvas");
        $(".js-colorlib-nav-toggle").removeClass("active");
      }
    });
  };

  // Smooth scroll to sections
  var clickMenu = function () {
    $('#navbar a:not([class="external"])').click(function (event) {
      var section = $(this).data("nav-section");
      if ($('[data-section="' + section + '"]').length) {
        $("html, body").animate(
          { scrollTop: $('[data-section="' + section + '"]').offset().top - 55 },
          500
        );
      }
      event.preventDefault();
    });
  };

  // Highlight active navigation link while scrolling
  var navigationSection = function () {
    // Wait for dynamic content to load
    setTimeout(() => {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // Get the corresponding navigation item
                const id = entry.target.getAttribute('data-section');
                const navItem = document.querySelector(`#navbar a[data-nav-section="${id}"]`);
                
                if (entry.intersectionRatio > 0.5) {
                    // Remove active class from all nav items
                    document.querySelectorAll('#navbar a').forEach(link => {
                        link.closest('li').classList.remove('active');
                    });
                    // Add active class to current nav item
                    if (navItem) {
                        navItem.closest('li').classList.add('active');
                    }
                }
            });
        }, {
            // Options
            threshold: 0.5,
            rootMargin: '0px'
        });

        // Observe all sections
        document.querySelectorAll('section[data-section]').forEach(section => {
            io.observe(section);
        });
    }, 1000); // Wait 1 second for content to load
  };

  // Helper to activate current section in the navbar
  var navActive = function (section) {
    var $el = $("#navbar > ul");
    $el.find("li").removeClass("active");
    $el.each(function () {
      $(this).find('a[data-nav-section="' + section + '"]').closest("li").addClass("active");
    });
  };

  // Detect time and switch to dark mode automatically
  var detectDayNightMode = function () {
    // Remove or comment out this function if you don't want auto dark mode
    // Or leave it empty if you want to keep the function call in your init
  };

  // Toggle dark mode manually
  var darkModeToggle = function () {
    const button = document.getElementById("darkModeToggle");
    const body = document.body;

    // Set default to light mode if no preference is stored
    if (!localStorage.getItem("darkMode")) {
      localStorage.setItem("darkMode", "disabled");
    }

    // Check for saved dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
      body.classList.add("dark-mode");
      // button.textContent = "Light Mode";
    } else {
      body.classList.remove("dark-mode");
      // button.textContent = "Dark Mode";
    }

    // Toggle dark mode on button click
    button.addEventListener("click", function () {
      if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
        // button.textContent = "Dark Mode";
      } else {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
        // button.textContent = "Light Mode";
      }
    });
  };

  // Initialize all functions when document is ready
  $(function () {
    fullHeight();
    contentWayPoint();
    burgerMenu();
    clickMenu();
    navigationSection();
    mobileMenuOutsideClick();
    detectDayNightMode();
    darkModeToggle();
  });

})();

// Accordion constructor for collapsible elements
var Accordion = function (el, multiple) {
  this.el = el || {};
  this.multiple = multiple || false;
  
  var links = this.el.find(".link");
  links.on("click", { el: this.el, multiple: this.multiple }, this.dropdown);
};

// Accordion dropdown toggle
Accordion.prototype.dropdown = function (e) {
  var $el = e.data.el;
  var $this = $(this),
      $next = $this.next();

  $next.slideToggle();
  $this.parent().toggleClass("open");

  if (!e.data.multiple) {
    $el.find(".submenu").not($next).slideUp().parent().removeClass("open");
  }
};

// Initialize Accordion on page load
var accordion = new Accordion($("#accordion"), false);
