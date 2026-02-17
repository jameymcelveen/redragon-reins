# Redragon Reins: BYCOMBO4 Protocol Research

This document serves as the technical specification for the Redragon K734-RGB-PRO (K721) driver development, reconstructed from original OEM software assets.

## 1. Device Identification
- **Manufacturer:** BY Tech (Beijing Boyuan Technology)
- **Product Name:** K734-RGB-PRO GASKET Mounted
- **Vendor ID (VID):** `0x258a`
- **Product ID (PID):** `0x010c`
- **Protocol Generation:** BYCOMBO4

## 2. Hardware Capabilities
- **Polling Rate:** Supports up to 8000Hz (Verified via OemDrv.exe strings).
- **Chipset:** High-performance BY Tech with Magnetic Switch (Hall Effect) support.
- **Layers:** 4-layer hardware configuration memory.

## 3. Lighting Protocol (Verified via text.xml)
To control lighting, packets must target **Command 0x04**.

| Mode ID (Hex) | Name | Logic |
| :--- | :--- | :--- |
| `0x01` | Colorful Streaming | Rainbow Wave |
| `0x02` | **Steady** | **Target for Clemson Orange** |
| `0x03` | Breathing | Gradient pulse |
| `0x05` | Neon | Spectrum cycle |
| `0x0A` | OFF | LED Blackout |

## 4. USB Packet Structure (Draft)
Based on BYCOMBO4 standards, the 64-byte payload (plus 0x00 Report ID) follows this sequence:
- `Byte [0]`: 0x00 (Report ID)
- `Byte [1]`: 0x04 (Lighting Command)
- `Byte [2]`: 0x02 (Static Mode)
- `Byte [3]`: 0x04 (Brightness Level 0-4)
- `Byte [4]`: 0x00 (Speed - N/A for static)
- `Byte [5-7]`: R, G, B values (Clemson Orange: `245, 102, 0`)

## 5. Development Hurdles & Solutions
- **The macOS Lock:** macOS seizes VID `0x258a` as a "Keyboard Class" device, blocking standard HID writes.
- **Mitigation:** Use `node-usb` (libusb) to perform a `detachKernelDriver()` and `claimInterface(1)` to bypass the OS security layer.

## 6. Layout Mapping
Key positions and matrix offsets are defined in `KB.ini`. Functional key groupings for animations (like the "Flower" or "AudioBar" effects) are mapped in the `unit/*.txt` files.