const sizes = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

export const media = {
  mobile: `@media (max-width: ${sizes.mobile}px)`,
  tablet: `@media (max-width: ${sizes.tablet}px)`,
  desktop: `@media (min-width: ${sizes.desktop}px)`,
};
