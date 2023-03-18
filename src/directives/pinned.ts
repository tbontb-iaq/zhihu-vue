import type { Directive } from "vue";

const observer = new IntersectionObserver(
  (a) =>
    a.forEach((e) =>
      e.target.classList.toggle("pinned", e.intersectionRatio < 1)
    ),
  { threshold: 1 }
);

export const Pinned: Directive = {
  mounted(el) {
    if (el instanceof Element) observer.observe(el);
  },
  unmounted(el) {
    if (el instanceof Element) observer.unobserve(el);
  },
};
