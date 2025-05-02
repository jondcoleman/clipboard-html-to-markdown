import cp from "node:child_process";

export default function getClipboardHTML() {
  return new Promise((resolve, reject) => {
    cp.exec("/usr/bin/osascript -e 'the clipboard as \"HTML\"'", (err, stdout) => {
      if (err) {
        reject(err);
        return;
      }

      // Extract HTML and decode
      const match = stdout.match(/data HTML([0-9A-F]+)/);
      if (!match) {
        reject(new Error("Did not find any HTML in your clipboard."));
        return;
      }

      const hex = match[1];
      const html = Buffer.from(hex, "hex").toString();
      resolve(html);
    });
  });
}
