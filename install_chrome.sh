#!/bin/bash

# Check if Google Chrome is installed
if command -v google-chrome &> /dev/null; then
    echo "Google Chrome is already installed."
else
    # Install Google Chrome
    echo "Installing Google Chrome..."
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
    sudo dpkg -i google-chrome-stable_current_amd64.deb
    sudo apt-get install -f
fi

