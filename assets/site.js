(function () {
  var body = document.querySelector('.term-body');
  if (!body || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;

  var lines = Array.prototype.map.call(body.children, function (el) {
    return { cmd: el.classList.contains('cmd'), text: el.textContent };
  });

  body.style.minHeight = body.offsetHeight + 'px';
  body.textContent = '';

  var cursor = document.createElement('span');
  cursor.className = 'cursor';

  function addRow(line) {
    var row = document.createElement('div');
    if (line.cmd) row.className = 'cmd';
    row.appendChild(document.createTextNode(line.cmd ? '' : line.text));
    row.appendChild(cursor);
    body.appendChild(row);
    return row;
  }

  function play(index) {
    if (index >= lines.length) return;
    var line = lines[index];
    var row = addRow(line);
    if (!line.cmd) {
      var next = lines[index + 1];
      setTimeout(function () { play(index + 1); }, next && next.cmd ? 900 : 170);
      return;
    }
    var count = 0;
    (function type() {
      if (count >= line.text.length) {
        setTimeout(function () { play(index + 1); }, 420);
        return;
      }
      count += 1;
      row.firstChild.nodeValue = line.text.slice(0, count);
      setTimeout(type, 60);
    })();
  }

  setTimeout(function () { play(0); }, 900);
})();
