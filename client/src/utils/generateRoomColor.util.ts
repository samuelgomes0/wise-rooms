const pastelColors: string[] = [
  "#f5eecf",
  "#d8eaea",
  "#b7dfb5",
  "#bad7c9",
  "#bdc7f3",
  "#f1cbe9",
  "#e5e3fc",
  "#b9f4d1",
  "#bed9d0",
  "#d1bbd0",
  "#cdd6c2",
  "#f5c0cc",
  "#f1ccb6",
  "#dae2b6",
  "#c5fdcf",
  "#f8dded",
  "#cfd9e8",
  "#d1c2f1",
  "#d6c4eb",
  "#dffaee",
  "#d8f5bd",
  "#fdd3d5",
  "#bce9d4",
  "#dad7d7",
  "#e1c8d5",
  "#bac9e2",
  "#bac6f7",
  "#cdf4fa",
  "#c2d8f4",
  "#c0e2eb",
  "#f7ecf7",
  "#cccded",
];

function attributeColorToRoom(id: number) {
  const color = pastelColors[id % pastelColors.length];
  const hoverColor = lightenColor(color, 15);
  return { color, hoverColor };
}

function lightenColor(hex: string, percent: number) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default attributeColorToRoom;
