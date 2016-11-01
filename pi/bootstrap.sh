#!/bin/bash
echo "Install Raspberry Pi package..."

pip install requests raven configparser schedule
echo "Install sensor source code..."
cp -rf pi-sensor /usr/local/
cp -rf pi-monitor/pi-monitor /usr/local/bin/

echo "Install systemd script..."
cp -f pi-sensor.service /etc/systemd/system/
cp -f pi-monitor/pi-monitor.service /etc/systemd/system/

echo "Configure config file..."
cp -f config-pi.py /usr/local/bin/config-pi
chmod +x /usr/local/bin/config-pi
/usr/local/bin/config-pi

echo "Reload systemd configuration..."
systemctl daemon-reload

echo "start pi-sensor service..."
service pi-sensor start
service pi-monitor start
