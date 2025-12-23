
# Web Performance Optimization

Website speed directly impacts user experience and SEO. Here, we review the Core Web Vitals metrics.

## LCP (Largest Contentful Paint)

The time it takes to render the largest element in the viewport. It should be under **2.5 seconds**.
*   Optimize images (use WebP).
*   Use a CDN.

## CLS (Cumulative Layout Shift)

The amount of unexpected layout shift. It should be under **0.1**.
*   Specify `width` and `height` for images.
*   Preload fonts.

## FID (First Input Delay)

The time to respond to the user's first interaction.
*   Reduce heavy JavaScript.
*   Eliminate render-blocking code.
