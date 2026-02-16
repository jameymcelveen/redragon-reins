# Redragon Reins 🐲 🎮

**Take the reins of your hardware.** `redragon-reins` is a cross-platform, open-source peripheral suite built in Node.js. It allows you to bypass Windows-only bloatware and customize your Redragon keyboards and mice on **macOS** and **Linux**.

## ⚡ Current Focus: K721 / K734 Series
We are currently reverse-engineering the **Sonix/Hall Effect** protocols to enable:
- **Full RGB Control** (Static, Animations, and Clemson Regalia Mode).
- **Magnetic Switch Tuning** (Adjustable Actuation & Rapid Trigger).
- **Knob Logic** (Remapping the multi-function wheel).

## 🛠 Tech Stack
- **Engine:** Node.js
- **UI:** Electron (Coming Soon)
- **Communication:** `node-hid` / `libusb`

## 🤝 Contributor Note
If you have a Redragon device that isn't supported, please drop a `.pcapng` capture or your "Program Files" logic in the `/research` folder.
