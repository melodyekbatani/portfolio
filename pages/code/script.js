const cursor = document.getElementById('cursor');
const projectRows = document.querySelectorAll('[data-project]');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

projectRows.forEach(row => {
  row.addEventListener('mouseenter', () => {
    cursor.classList.add('visible');
    document.body.style.cursor = 'none';
  });
  row.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
    document.body.style.cursor = 'default';
  });
});
