document.getElementById("menuIcon").addEventListener("click", function (event) {
  event.stopPropagation();

  var navMenu = document.getElementById("navMenu");
  var menuIcon = document.getElementById("menuIcon");

  navMenu.classList.toggle("active");

  if (navMenu.classList.contains("active")) {
    menuIcon.style.color = "#e60000";
  } else {
    menuIcon.style.color = "#000000";
  }
});

// علشان نختفي الـ Drop Menu لما نضغط في أي حتة في الصفحة
document.addEventListener("click", function (event) {
  var navMenu = document.getElementById("navMenu");
  var menuIcon = document.getElementById("menuIcon");

  if (navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    menuIcon.style.color = "#000000";
  }
});

$(document).ready(function () {

  $(window).on("scroll", function () {
    var sc = $(window).scrollTop();
    // console.log(sc);
    var buttonUp = $(".buttonUp");
    var whatsappButton = $(".contact-buttons");
    if (sc >= 634) {
      buttonUp.fadeIn();
    } else {
      buttonUp.fadeOut();
    }
    if (sc >= 250) {
      whatsappButton.fadeIn();
    } else {
      whatsappButton.fadeOut();
    }
  });

  // Start about Section
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
    $(".community-slider").css({
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

  $("ul li a, .goToQuote").click(function (e) {
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



  // scroll to top
  $(".buttonUp").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });
});
AOS.init();
