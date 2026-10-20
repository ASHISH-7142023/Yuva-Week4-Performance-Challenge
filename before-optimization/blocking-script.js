/**
 * UNOPTIMIZED BASELINE: Render-Blocking Script (blocking-script.js)
 * ----------------------------------------------------------------
 * This file demonstrates typical performance pitfalls before optimization:
 * 1. Synchronously included in <head> without defer or async attributes.
 * 2. Artificially blocks the DOM parser by running synchronous computations.
 * 3. Registers unthrottled scroll listeners that cause layout thrashing.
 * 4. Violates Core Web Vitals (TBT > 300ms, FCP delayed > 2.0s).
 */

console.warn('[Baseline Audit] Render-blocking script executing synchronously in <head>!');

// Simulate synchronous main-thread blocking computation (causes high Total Blocking Time)
const startBlock = performance.now();
while (performance.now() - startBlock < 85) {
  // Heavy synchronous blocking task stalling the HTML parser
  Math.sqrt(Math.random() * 1000000);
}
console.warn('[Baseline Audit] Parser unblocked after 85ms synchronous delay.');

// Unthrottled scroll event listener (causes jank & forced reflows)
window.addEventListener('scroll', function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const header = document.querySelector('.site-header');
  if (header) {
    // Forced reflow by querying offsetHeight immediately
    const height = header.offsetHeight;
    if (scrollTop > 20) {
      header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
      header.style.boxShadow = 'none';
    }
  }
});
