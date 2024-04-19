export default function getContrastColor(hex: string): string {
  // Convert hex color to RGB
  const regexResult = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!regexResult) throw new Error("Invalid hex color format.");

  const [, red, green, blue] = regexResult;
  const r = parseInt(red, 16);
  const g = parseInt(green, 16);
  const b = parseInt(blue, 16);

  // Calculate brightness of the color
  const brightness = r * 0.299 + g * 0.587 + b * 0.114;

  // Return black or white depending on brightness
  return brightness > 150 ? "#000000" : "#ffffff";
}
