# Redragon Reins - Master Control
# Copyright (C) 2026 Jamey McElveen - GPL v3

SHELL := /bin/bash

# Default target runs when you just type 'make'
all: init

# 1. Validate Node and Scaffold Folders
validate:
	@chmod +x scripts/check-environment.sh
	@./scripts/check-environment.sh

# 2. Install dependencies
init: validate
	@echo "📦 Installing npm dependencies..."
	@npm install

# 3. Clean project (Force reset)
clean:
	@echo "🧹 Cleaning project..."
	rm -rf node_modules
	find . -name ".DS_Store" -delete
	@echo "Cleaned."

# 4. Spike Test (Clemson Orange)
spike: validate
	@if [ -f src/drivers/spike.js ]; then \
		node src/drivers/spike.js; \
	else \
		echo "❌ Error: src/drivers/spike.js not found."; \
	fi

list: validate
	node src/drivers/list-devices.js

.PHONY: all validate init clean spike