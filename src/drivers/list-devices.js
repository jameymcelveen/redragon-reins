/**
 * Redragon Reins - Device Discovery
 * Purpose: Find the exact path and IDs for the K721 on this machine.
 */
const HID = require("node-hid");

console.log("Listing all connected HID devices...\n");
const devices = HID.devices();

const redragonDevices = devices.filter(d =>
    d.vendorId === 0x0c45 || // Common Sonix/Redragon VID
    d.manufacturer?.toLowerCase().includes("redragon") ||
    d.product?.toLowerCase().includes("keyboard")
);

if (redragonDevices.length === 0) {
    console.log("❌ No Redragon-linked devices found.");
    console.log("Check your connection or try a different USB port.");
} else {
    redragonDevices.forEach((d, i) => {
        console.log(`[Device ${i}]`);
        console.log(`  Product:      ${d.product}`);
        console.log(`  Manufacturer: ${d.manufacturer}`);
        console.log(`  Vendor ID:    0x${d.vendorId.toString(16)} (${d.vendorId})`);
        console.log(`  Product ID:   0x${d.productId.toString(16)} (${d.productId})`);
        console.log(`  Interface:    ${d.interface}`);
        console.log(`  Usage Page:   0x${d.usagePage?.toString(16)}`);
        console.log(`  Usage:        0x${d.usage?.toString(16)}`);
        console.log(`  Path:         ${d.path}`);
        console.log("------------------------------------------");
    });
}