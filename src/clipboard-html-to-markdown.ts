import { Clipboard, showToast, Toast } from "@raycast/api";
import TurndownService from "turndown";
import getClipboardHTML from "./lib/getClipboardHTML";

export default async function command() {
  try {
    const html = await getClipboardHTML();

    console.log(html);

    // Create a turndown service instance
    const turndownService = new TurndownService();
    // Convert HTML to markdown
    const markdown = turndownService.turndown(html as string);

    // Put the markdown back on the clipboard
    await Clipboard.copy(markdown);

    // Show success message
    showToast({
      title: "HTML Converted to Markdown",
      message: "Markdown has been copied to clipboard",
    });
  } catch (error) {
    console.error(error);
    showToast({
      style: Toast.Style.Failure,
      title: "Error",
      message: "Failed to convert HTML to markdown",
    });
  }
}
