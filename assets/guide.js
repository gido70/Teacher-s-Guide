"use strict";
document.getElementById("print-card").addEventListener("click", function () {
  var code = document.getElementById("card-code").value.trim().replace(/[<>&"']/g, "");
  var one = '<div class="c"><div class="h">ادخل إلى الحصة التفاعلية</div><ol><li>افتح المتصفح واكتب:<br><b class="u">classpoint.app</b></li><li>اكتب رمز الفصل: <b class="code">' + (code || "______") + '</b></li><li>اكتب اسمك، وانتظر السؤال</li></ol></div>';
  var html = '<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>بطاقة دخول الطلاب</title><style>@page{size:A4;margin:10mm}body{margin:0;font:16px/1.6 Arial,sans-serif}.g{display:grid;grid-template-columns:1fr 1fr;gap:6mm}.c{border:2px dashed #555;border-radius:10px;padding:5mm 6mm;break-inside:avoid}.h{font-weight:700;font-size:19px;color:#075a50}ol{margin:2mm 0 0;padding-inline-start:6mm}.u{direction:ltr;display:inline-block;font-size:22px;letter-spacing:.5px}.code{font-size:22px;letter-spacing:2px}</style><body><div class="g">' + new Array(9).join(one) + '</div></body></html>';
  var w = window.open("", "_blank");
  if (!w) { document.getElementById("card-code").insertAdjacentHTML("afterend", " <small class=\"status\" data-error=\"true\">اسمح للنوافذ المنبثقة لطباعة البطاقة.</small>"); return; }
  w.document.write(html); w.document.close(); w.focus(); setTimeout(function () { w.print(); }, 300);
});
