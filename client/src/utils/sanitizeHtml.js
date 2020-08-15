import sanitizeHtml from "sanitize-html";

export default (dirtyHtml) => {
  //sanitizeHtml
  const cleanHtml = sanitizeHtml(dirtyHtml, {
    allowedTags: [
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "p",
      "a",
      "ul",
      "ol",
      "nl",
      "li",
      "b",
      "i",
      "strong",
      "em",
      "strike",
      "span",
      "abbr",
      "code",
      "hr",
      "br",
      "div",
      "table",
      "thead",
      "caption",
      "tbody",
      "tr",
      "th",
      "td",
      "pre",
      "iframe",
      "img",
    ],
    allowedAttributes: false,
  });

  return cleanHtml;
};
