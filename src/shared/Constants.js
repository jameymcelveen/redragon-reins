/**
 * Redragon Reins - Global Constants
 * Copyright (C) 2026 Jamey McElveen - GPL v3
 */

const CONSTANTS = {
    // Hardware Identifiers
    DEVICE: {
        VENDOR_ID: 0x258a,
        PRODUCT_ID: 0x10c,
        USAGE_PAGE: 0xff00,
        USAGE: 0x01,
        REPORT_SIZE: 65 // 64 bytes + 1 byte for Report ID on macOS
    },

    // Top-level Commands
    CMD: {
        LIGHTING: 0x04,
        SYSTEM: 0x05,
        CONFIG: 0x06
    },

    // Sub-commands for Lighting (CMD.LIGHTING)
    SUB: {
        RGB_STATIC: 0x0c,
        RGB_MODE: 0x03,
        APPLY: 0x02
    },

    // RGB Modes (Common to BY Tech)
    MODES: {
        STATIC: 0x01,
        BREATHING: 0x02,
        WAVE: 0x03,
        REACTIVE: 0x04,
        RAINBOW: 0x05
    },

    // Clemson Tiger Colors
    THEMES: {
        TIGER_ORANGE: { r: 0xF5, g: 0x66, b: 0x00 },
        REGALIA_PURPLE: { r: 0x52, g: 0x2D, b: 0x80 }
    }
};

module.exports = CONSTANTS;