/**
 * Redragon Reins - Fixed Spike
 */
const HID = require("node-hid");
const C = require("../shared/Constants");

function setTigerOrange() {
    const devices = HID.devices().filter(d =>
        d.vendorId === C.DEVICE.VENDOR_ID &&
        d.productId === C.DEVICE.PRODUCT_ID &&
        d.usagePage === C.DEVICE.USAGE_PAGE
    );

    if (devices.length === 0) {
        console.log("❌ Device not found. Did you unplug it?");
        return;
    }

    try {
        // --- THE CRITICAL FIX FOR MAC ---
        // We open the device using the path and the nonExclusive option.
        const device = new HID.HID(devices[0].path, { nonExclusive: true });

        console.log("🔗 Connection successful (Non-Exclusive Mode).");

        const { r, g, b } = C.THEMES.TIGER_ORANGE;
        const p1 = Buffer.alloc(C.DEVICE.REPORT_SIZE, 0x00);
        p1.set([0x00, 0x04, 0x0c, 0x02, 0x06, 0x03, 0x05, 0x00, 0x00, r, g, b]);
        device.write(p1);

        const p2 = Buffer.alloc(C.DEVICE.REPORT_SIZE, 0x00);
        p2.set([0x00, 0x04, 0x02, 0x00, 0x02]);
        device.write(p2);

        device.close();
        console.log("🧡 Clemson Orange engaged.");
    } catch (e) {
        console.error("❌ Still blocked:", e.message);
        console.log("\nIf this failed, try the 'Triple Toggle':");
        console.log("1. Remove iTerm from Input Monitoring entirely with the [-] button.");
        console.log("2. Re-add it with the [+] button.");
        console.log("3. Restart iTerm.");
    }
}

setTigerOrange();