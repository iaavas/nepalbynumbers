export default function getContrastColor(hex: string): string {
  if (!hex) return "#000000";
  // Convert hex color to RGB
  hex = hex.replace(/^#/, "");

  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  // Calculate brightness of the color
  const brightness = r * 0.299 + g * 0.587 + b * 0.114;

  // Return black or white depending on brightness
  return brightness > 150 ? "#000000" : "#ffffff";
}
