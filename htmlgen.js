// Linearly process the rd parser output into HTML
module.exports = function(r) {
  var output = '';
  var line = '';
  var lineDepth = 0;
  var indent = 2;
  var openTags = [];
  var classes;
  for (; r; r = r.next) {
    switch(r.name) {
      case 'tag':
        openTags.push(r.value);
        line += '<' + r.value;
        break;
      case 'tagAttrName':
        line += ' ' + r.value + '=';
        break;
      case 'tagAttrValue':
        line += '"' + r.value + '"';
        break;
      case 'tagId':
        line += ' id="' + r.value + '"';
        break;
      case '@tagClassStart':
        line += ' class="';
        classes = [];
        break;
      case 'tagClass':
        classes.push(r.value);
        break;
      case '@tagClassEnd':
        line += classes.join(' ') + '"'
        break;
      case '@tagHeaderEnd':
        line += '>';
        break;
      case '@tagEnd':
        var tagName = openTags.pop();
        if (tagName !== 'link' && tagName !== 'meta') {
          line += '</' + tagName + '>';
        }
        break;
      case 'freeText':
        line += r.value;
        break;
      case '@newLine':
        // pretty output
        if (line) {
          line = new Array(indent * Math.min(lineDepth, openTags.length) + 1).join(' ') + line + '\n';
        }
        output += line;
        line = "";
        lineDepth = openTags.length;
        break;
    }
  }
  return output + line;
}
