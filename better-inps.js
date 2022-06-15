(function () {
  ("use strict");

  addScript("https://cdn.tailwindcss.com");
  addScript(
    "https://cdn.jsdelivr.net/npm/@marcreichel/alpine-autosize@latest/dist/alpine-autosize.min.js"
  );
  addScript("https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js", true);

  document.querySelectorAll("textarea").forEach((textarea) => {
    // Edit parent
    let td = textarea.parentNode;
    td.setAttribute("x-data", "{ content: '' }");
    td.classList.add("flex", "space-x-2", "items-center");

    // Add character count element
    let characterCountEl = document.createElement("div");
    let characterCountMarkup = `
    <p>
        <span x-count="content"></span>/<span>1000</span>
    </p>
    `;
    characterCountEl.innerHTML = characterCountMarkup;
    textarea.insertAdjacentElement("afterend", characterCountEl);

    // Edit textarea
    textarea.setAttribute("x-model", "content");
    textarea.setAttribute("x-autosize", "");
    textarea.classList.add("font-normal", "font-mono", "text-[16px]");
  });

  // Resize tables
  document.querySelectorAll("table").forEach((table) => {
    table.setAttribute("width", "80%");
    table.classList.add("table-auto");
  });
})();

function addScript(url, defer = false) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  if (defer) script.setAttribute("defer", "");

  document.head.appendChild(script);
}

//
// Alpine.js Plugins
//

document.addEventListener("alpine:init", () => {
  // Character count plugin
  window.Alpine.plugin(
    Alpine.directive(
      "count",
      (el, { expression, modifiers }, { evaluateLater, effect }) => {
        let maxLength = modifiers[0] || false;
        let getInputValue = evaluateLater(expression);

        effect(() => {
          getInputValue((string) => {
            let stringLength = string.length;

            el.innerText = maxLength ? maxLength - stringLength : stringLength;
          });
        });
      }
    )
  );
});
