const $body = $("body");
const $header = $(".page-header");
const scrollClass = "scroll";


$(window).on("scroll", () => {
    if (this.matchMedia("(min-width: 992px)").matches) {
        const scrolly = $(this).scrollTop();
        scrolly > 0 ? $body.addClass(scrollClass) : $body.removeClass(scrollClass);
    } else {
        $body.removeClass(scrollClass);
    }
  }
);

$(".page-header .nav-link, .navbar-brand").on("click", function(e) {
    e.preventDefault();
    const href = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(href).offset().top - 71
    }, 600);
  }
);