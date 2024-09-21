export function rgbStringToHex(rgbString: string): string {
  const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;

  // Test the input string and extract the RGB values
  const match = rgbString.match(rgbRegex);
  if (!match) {
    return "#ffffff";
  }

  // Parse the RGB values
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);

  // Ensure the RGB values are within the valid range
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error("RGB values must be between 0 and 255.");
  }

  // Convert each color component to a hexadecimal string
  const toHex = (value: number): string => {
    const hex = value.toString(16).padStart(2, "0"); // Convert to hex and pad with leading zeros
    return hex;
  };

  // Combine the hex strings of R, G, and B into the final hex color code
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
