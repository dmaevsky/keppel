module.exports = Grammar;

function Grammar(All, Any, Plus, Optional, Char, Capture) {

  // Y combinator
  var Y = function (gen) {
    return (function(f) {return f(f)})( function(f) {
      return gen(function() {return f(f).apply(null, arguments)});
    });
  }

  return Y(function(thisGrammar) {
    // define Keppel rules
    function Text(alphabet) { return Optional(Plus(Char(alphabet))); }
    var whiteSpace = Plus(Char(/[ \t]/));
    var lineComment = All(Char(/\//), Char(/\//), Text(/./));
    var blockComment = All(Char(/`/), Text(/[^`]|\n/), Char(/`/));
    var newLine = Capture(Char(/\n/), '@newLine');
    var fluff = Plus(Any(whiteSpace, lineComment, blockComment, newLine));
    var skip = Optional(fluff);
    var identifier = All( Char(/[a-zA-Z]/), Optional(Plus(Char(/[a-zA-Z0-9_-]/))) );
    var freeText = All( Char(/\'/), Capture(Text(/[^\']/), 'freeText'), Char(/\'/) );

    var tagName = Capture(identifier, 'tag');
    var tagAttrName = Capture(identifier, 'tagAttrName');
    var tagAttrValue = All( Char(/\"/), Capture(Text(/[^\"]/), 'tagAttrValue'), Char(/\"/) );
    var tagAttr = All(skip, tagAttrName, skip, Char(/=/), skip, tagAttrValue, skip);
    var tagAttrBlock = All(skip, Char(/\(/), tagAttr, Optional(Plus(All(Char(/,/), tagAttr))), Char(/\)/));
    var tagId = All(skip, Char(/#/), Capture(identifier, 'tagId'));
    var tagClass = Capture(Plus(All(skip, Char(/\./), Capture(identifier, 'tagClass'))), '@tagClassEnd', '@tagClassStart');
    var tagHeader = All(tagName, Optional(tagAttrBlock), Optional(tagId), Optional(tagClass));
    var tagBody = All(skip, Char(/\[/), thisGrammar, Char(/\]/));
    var tag = Capture(All(Capture(tagHeader, '@tagHeaderEnd'), Optional(tagBody)), '@tagEnd');

    return Optional(Plus(Any(fluff, tag, freeText)));
  });
}
