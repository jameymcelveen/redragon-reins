# Gemini Project Context: Redragon Reins

## 🎯 Project Goal
Build a custom macOS driver/controller for the Redragon K734-RGB-PRO (K721) Gasket Mounted keyboard to enable "Clemson Orange" (#F56600) and custom Hall Effect (Magnetic) switch mapping.

## 🛠 Hardware Specs (Verified)
- **Manufacturer:** BY Tech (Beijing Boyuan Technology)
- **VID:** 0x258a / **PID:** 0x010c
- **Protocol:** BYCOMBO4 (Found in OEM DLLs)
- **Features:** 8000Hz Polling, Magnetic Switch support.

## 📡 Protocol Logic (The "Spark")
- **Command ID:** 0x04 (Lighting Control)
- **Mode ID:** 0x02 (Steady/Static)
- **Packet Structure:** 64-byte Buffer.
  - `[0]=0x04`, `[1]=0x02`, `[2]=0x04` (Brightness)
  - `[4]=0xF5` (R), `[5]=0x66` (G), `[6]=0x00` (B)
- **USB Method:** MUST use `libusb` (node-usb) to `detachKernelDriver()` because macOS seizes the HID interface.

## 📍 Current Roadblock
Identifying the correct **USB Interface/Endpoint**.
- Interface 0 (Keyboard) is usually locked by macOS.
- Interface 1 or 2 is usually the "Custom" data lane for RGB.

## 📂 Key Files to Reference
- `RESEARCH.md`: Deep technical breakdown of hex codes.
- `src/drivers/test-discovery.js`: The script to find the "Spark" interface.
- `KB.ini`: OEM matrix mapping for key coordinates.