document.querySelector('.faq-block').addEventListener('click', (e) => {
  // delete all original css
  const cardList = document.querySelectorAll('.card__active')
  for (var item of cardList) {
    item.classList.remove('card__active')
  }
  // add css to just clicked
  const element = e.target.closest('.card');
  if (element) {
    element.classList.toggle('card__active');
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
