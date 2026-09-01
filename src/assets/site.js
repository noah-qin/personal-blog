const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");

function currentTheme() {
  return root.classList.contains("dark") ? "dark" : "light";
}

function setTheme(theme) {
  root.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
  const frame = document.querySelector("iframe.giscus-frame");
  frame?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, "https://giscus.app");
}

themeButton?.addEventListener(
  "click",
  () => setTheme(currentTheme() === "dark" ? "light" : "dark"),
);

const dialog = document.querySelector("#command-menu");
const input = document.querySelector("#command-input");
const items = [...document.querySelectorAll(".command-list a")];
let active = 0;

function visibleItems() {
  return items.filter((item) => !item.hidden);
}

function updateActive() {
  visibleItems().forEach((item, index) => item.classList.toggle("active", index === active));
}

function filterCommands() {
  const query = input?.value.trim().toLowerCase() ?? "";
  for (const item of items) item.hidden = !(item.dataset.label ?? "").includes(query);
  active = 0;
  updateActive();
}

function openCommands() {
  dialog?.showModal();
  input?.focus();
  filterCommands();
}

document.querySelector("#search-button")?.addEventListener("click", openCommands);
document.querySelector("#mobile-search-button")?.addEventListener("click", openCommands);
document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    dialog?.open ? dialog.close() : openCommands();
  }
});
input?.addEventListener("input", filterCommands);
input?.addEventListener("keydown", (event) => {
  const visible = visibleItems();
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (visible.length) {
      active = (active + (event.key === "ArrowDown" ? 1 : -1) + visible.length) % visible.length;
    }
    updateActive();
  } else if (event.key === "Enter") visible[active]?.click();
});
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

for (const block of document.querySelectorAll("pre")) {
  const wrapper = document.createElement("div");
  wrapper.className = "code-wrapper";
  block.before(wrapper);
  wrapper.append(block);
  const button = document.createElement("button");
  button.className = "copy-code";
  button.ariaLabel = "Copy code";
  button.textContent = "Copy";
  wrapper.append(button);
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(block.innerText);
    button.textContent = "Copied";
    setTimeout(() => button.textContent = "Copy", 2000);
  });
}
