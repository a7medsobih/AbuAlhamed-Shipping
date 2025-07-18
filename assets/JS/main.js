$(document).ready(function () {
  $(".navbar-toggler").click(function (event) {
    event.stopPropagation();

    var navMenu = $("#collapsibleNavbar");
    var menuIcon = $(this).find(".fa-bars");

    // التأكد من الحالة باستخدام aria-expanded
    if ($(this).attr("aria-expanded") === "true") {
      menuIcon.css("color", "#e60000");
    } else {
      menuIcon.css("color", "#000000");
    }
  });

  // إغلاق القائمة عند الضغط على أيقونة القائمة نفسها
  $(".navbar-toggler .fa-bars").click(function (event) {
    event.stopPropagation();
    $(".navbar-toggler").trigger("click");
  });

  // إغلاق القائمة عند الضغط خارجها
  $(document).click(function () {
    var navMenu = $("#collapsibleNavbar");
    var menuIcon = $(".navbar-toggler .fa-bars");

    if (navMenu.hasClass("show")) {
      $(".navbar-toggler").trigger("click");
      menuIcon.css("color", "#000000");
    }
  });

  // منع إغلاق القائمة عند الضغط داخلها
  $("#collapsibleNavbar").click(function (event) {
    event.stopPropagation();
  });

  // scroll to top
  $(".buttonUp").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });

  // start about Section
  if ($(".about-section").length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target); // نوقف المتابعة بعد ما نبدأ العد
          }
        });
      },
      { threshold: 0.5 }
    );

    // نحدد السيكشن اللي هنشوفه
    const aboutSection = $(".about-section")[0];
    observer.observe(aboutSection);

    function startCounters() {
      $(".circle h3").each(function () {
        const $this = $(this);
        const target = +$this.attr("data-target");
        const suffix = $this.attr("data-suffix") || ""; // + || %
        const speed = 100; // السرعه (كلما قل الرقم كلما زادت السرعه)

        const updateCount = () => {
          const currentCount = +$this.text().replace(suffix, ""); // نمسح اللاحقة علشان ناخد الرقم فقط

          if (currentCount < target) {
            $this.text(Math.ceil(currentCount + target / speed) + suffix);
            setTimeout(updateCount, 30);
          } else {
            $this.text(target + suffix); // added + || %
          }
        };

        updateCount();
      });
    }
  }
  // End about Section

  // startt slider
  let images = [
    "assets/IMG/image1.jpg",
    "assets/IMG/image2.jpg",
    "assets/IMG/image3.jpg",
    "assets/IMG/image4.jpg",
  ];
  let titles = [
    "جودة عالية",
    "سرعة في التنفيذ",
    "أسعار تنافسية",
    "دعم فني متكامل",
  ];
  let descriptions = [
    "نضمن تقديم خدمات بجودة عالية تلبي توقعات عملائنا.",
    "نقدم خدمات سريعة وفعالة لتلبية احتياجات عملائنا في الوقت المحدد.",
    "نقدم خدماتنا بأسعار تنافسية تناسب جميع العملاء.",
    "فريق دعم فني متاح على مدار الساعة لمساعدتك في أي استفسار.",
  ];
  let currentIndex = 0;

  function changeBackground() {
    $(".slider").css({
      "background-image": "url(" + images[currentIndex] + ")",
      transition: "background-image 0.5s ease-in-out",
    });
    $(".overlay-title").text(titles[currentIndex]);
    $(".overlay-description").text(descriptions[currentIndex]);
  }

  // تغيير الخلفية عند تحميل الصفحة
  changeBackground();

  function moveToNextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    changeBackground();
  }

  setInterval(moveToNextSlide, 5000); // تغيير الصورة كل 5 ثواني
  // End slider

  $(".goToQuote").click(function (e) {
    e.preventDefault();
    // console.log('.' + $(this).data('scroll'));

    // scrolling navbar
    $("html ,body").animate(
      {
        scrollTop: $("." + $(this).data("scroll")).offset().top + 1,
      },
      1000
    );
  });

  //////////////////////////////////:)
  function equalizeInfoHeight() {
    var maxHeight = 0;
    $(".service-card .info").css("height", "auto"); // Reset height

    $(".service-card .info").each(function () {
      var thisHeight = $(this).outerHeight();
      if (thisHeight > maxHeight) {
        maxHeight = thisHeight;
      }
    });

    $(".service-card .info").css("height", maxHeight + "px");
  }

  equalizeInfoHeight(); // Call on page load

  $(window).resize(function () {
    equalizeInfoHeight(); // Call on window resize
  });

  //////////////////////////////////:)
  function equalizeBlogContentHeight() {
    var maxHeight = 0;
    $(".blog-item .blog-content").css("height", "auto"); // إعادة تعيين الارتفاع

    $(".blog-item .blog-content").each(function () {
      var thisHeight = $(this).outerHeight();
      if (thisHeight > maxHeight) {
        maxHeight = thisHeight;
      }
    });

    $(".blog-item .blog-content").css("height", maxHeight + "px");
  }

  equalizeBlogContentHeight(); // استدعاء الدالة عند تحميل الصفحة

  $(window).resize(function () {
    equalizeBlogContentHeight(); // استدعاء الدالة عند تغيير حجم النافذة
  });

});
AOS.init();
