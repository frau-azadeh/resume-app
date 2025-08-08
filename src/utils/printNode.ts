// بدون هیچ وابستگی؛ فقط DOM API
export function printNode(node: HTMLElement, title = "document"): void {
    // iframe مخفی
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);
  
    const doc = iframe.contentDocument as Document;
    doc.open();
    // Head اولیه
    doc.write(`<!doctype html><html><head>
      <meta charset="utf-8" />
      <title>${title}</title>
    </head><body></body></html>`);
    doc.close();
  
    // کپی کردن لینک‌های CSS و استایل‌های inline از صفحه‌ی اصلی
    const head = doc.head;
    document
      .querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
      .forEach((lnk) => {
        const clone = doc.createElement("link");
        clone.rel = "stylesheet";
        clone.href = lnk.href;
        head.appendChild(clone);
      });
    document.querySelectorAll<HTMLStyleElement>("style").forEach((st) => {
      head.appendChild(st.cloneNode(true));
    });
  
    // استایل‌های مخصوص چاپ / A4 / رنگ‌ها / راست‌چین
    const printCss = doc.createElement("style");
    printCss.textContent = `
      @page { size: A4; margin: 12mm; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .break-inside-avoid { break-inside: avoid; }
      [dir="rtl"] { direction: rtl; }
    `;
    head.appendChild(printCss);
  
    // محتوا
    const clone = node.cloneNode(true) as HTMLElement;
    clone.style.margin = "0 auto";
    clone.style.width = "794px"; // عرض A4 به پیکسل
    (doc.body as HTMLBodyElement).appendChild(clone);
  
    // کمی صبر تا CSS/فونت‌ها لود شوند، سپس چاپ
    const win = iframe.contentWindow;
    setTimeout(() => {
      win?.focus();
      win?.print();
      // بعد از کمی صبر iframe را پاک می‌کنیم
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 800);
    }, 300);
  }
  