/* =========================================================
   Portfolio — academic-minimalist interactions
   Vanilla JS: year, active-nav, scroll reveal, lightbox
   ========================================================= */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Year
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    // Active nav highlight on scroll
    var navLinks = Array.prototype.slice.call(
      document.querySelectorAll(".nav a")
    );
    var byId = {};
    navLinks.forEach(function (a) {
      byId[a.getAttribute("href").slice(1)] = a;
    });
    var sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window && sections.length) {
      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var link = byId[entry.target.id];
              if (!link) return;
              navLinks.forEach(function (a) {
                a.classList.remove("active");
              });
              link.classList.add("active");
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach(function (s) {
        spy.observe(s);
      });
    }

    // Scroll reveal
    var reveals = document.querySelectorAll(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var revealer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
      );
      reveals.forEach(function (el) {
        revealer.observe(el);
      });
    }

    // Lightbox
    var lb = document.querySelector(".lightbox");
    var lbImg = lb ? lb.querySelector(".lightbox-img") : null;
    var lbCap = lb ? lb.querySelector(".lightbox-cap") : null;

    function openLb(src, caption) {
      if (!lb || !lbImg) return;
      lbImg.src = src;
      lbImg.alt = caption || "";
      if (lbCap) lbCap.textContent = caption || "";
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeLb() {
      if (!lb) return;
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      setTimeout(function () {
        if (lbImg) lbImg.src = "";
      }, 250);
    }

    document.querySelectorAll("[data-lightbox]").forEach(function (el) {
      el.addEventListener("click", function (ev) {
        ev.preventDefault();
        var src =
          el.getAttribute("href") ||
          el.getAttribute("data-src") ||
          (el.querySelector("img") && el.querySelector("img").src);
        var caption = el.getAttribute("data-caption") || "";
        if (src) openLb(src, caption);
      });
    });

    if (lb) {
      lb.addEventListener("click", closeLb);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeLb();
      });
    }
  });
})();
