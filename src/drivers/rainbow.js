/**
 * Redragon Reins - Rainbow Animation Test
 * Copyright (C) 2026 Jamey McElveen - GPL v3
 */

const HID = require("node-hid");
const C = require("../shared/Constants");

function startRainbow() {
    const devices = HID.devices().filter(d =>
        d.vendorId === C.DEVICE.VENDOR_ID &&
        d.productId === C.DEVICE.PRODUCT_ID &&
        d.usagePage === C.DEVICE.USAGE_PAGE
    );

    if (devices.length === 0) return;

    try {
        const device = new HID.HID(devices[0].path);

        // Packet: Set to Rainbow Wave Mode
        const packet = Buffer.alloc(C.DEVICE.REPORT_SIZE, 0x00);

        /**
         * Protocol Guess: [ReportID, Cmd, SubCmd, Mode, Speed, Brightness...]
         * 0x05 is a common value for 'Rainbow' on this chipset.
         */
        packet.set([
            0x00,               // Report ID
            C.CMD.LIGHTING,      // 0x04
            C.SUB.RGB_MODE,      // 0x03
            C.MODES.RAINBOW,     // 0x05
            0x03,                // Speed (1-5)
            0x05,                // Brightness (1-5)
            0x01                 // Direction
        ], 0);

        device.write(packet);

        // Apply
        const apply = Buffer.alloc(C.DEVICE.REPORT_SIZE, 0x00);
        apply.set([0x00, C.CMD.LIGHTING, C.SUB.APPLY, 0x00, 0x02], 0);
        device.write(apply);

        console.log("🌈 Rainbow Wave engaged! Did the colors start moving?");
        device.close();
    } catch (err) {
        console.error("❌ Failed to start animation:", err.message);
    }
}

startRainbow();