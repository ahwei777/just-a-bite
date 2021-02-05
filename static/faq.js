document.querySelector('.faq-block').addEventListener('click', (e) => {
  const element = e.target.closest('.faq-item');
  if (element) {
    element.classList.toggle('faq-item__hide');
  }
});
/*  如不使用 closest 可自建函數
<遞迴版>
function closestRecursive(node, className) {
  if (!node) {return null};
  if (node.classList.contains(className)) {return node};
  return closestRecursive(node.parentNode, className)
}
<一般函數版>
function closest(node, className) {
  while (node) {
    if (node.classList.contains(className)) {
      return node
    }
    node = node.parentNode
  }
}
*/
