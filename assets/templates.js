"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const data = window.MUYASSIR_TEMPLATES || [];
  const label = { mcq: "اختيار من متعدد", tf: "صح أو خطأ", fill: "ملء الفراغ", short: "إجابة قصيرة", open: "سحابة كلمات" };
  const list = document.getElementById("list");
  const filter = document.getElementById("filter");
  const make = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  function render(subject) {
    list.replaceChildren();
    for (const t of data.filter(x => !subject || x.subject === subject)) {
      const card = make("article", "card tpl");
      const meta = make("div", "meta");
      meta.append(make("span", "pill", t.subject), make("span", "pill", "الصف " + t.grade));
      const h = make("h3", null, t.title);
      if (t.lang === "en") h.dir = "ltr";
      const types = [...new Set(t.questions.map(q => label[q.type]))].join("، ");
      const ul = make("ul");
      t.questions.slice(0, 3).forEach(q => { const li = make("li", null, q.text); if (t.lang === "en") li.dir = "ltr"; ul.append(li); });
      const actions = make("div", "actions");
      const open = make("a", "btn primary", "افتح في المُعِدّ");
      open.href = "studio.html?t=" + encodeURIComponent(t.id);
      actions.append(open);
      card.append(meta, h, make("p", "muted", t.questions.length + " أسئلة: " + types), ul, actions);
      list.append(card);
    }
  }
  const subjects = [...new Set(data.map(t => t.subject))];
  const buttons = [];
  const addBtn = (text, value) => {
    const b = make("button", "btn quiet small", text);
    b.type = "button";
    b.setAttribute("aria-pressed", value === "" ? "true" : "false");
    b.addEventListener("click", () => { buttons.forEach(x => x.setAttribute("aria-pressed", "false")); b.setAttribute("aria-pressed", "true"); render(value); });
    buttons.push(b); filter.append(b);
  };
  addBtn("الكل", "");
  subjects.forEach(s => addBtn(s, s));
  render("");
});
