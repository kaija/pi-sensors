#!/bin/bash
echo "Install Raspberry Pi package"
apt-get install -y upstart
pip install requests raven configparser
echo "Install sensor source code"
cp -rf pi-sensor /usr/local/
echo "Install upstart script"
cp -f pi-sensor.conf /etc/init/

echo "Configure config file"
cp -f config-pi.py /usr/local/bin/config-pi
chmod +x /usr/local/bin/config-pi
/usr/local/bin/config-pi

echo "Reload upstart configuration"
initctl reload-configuration
echo "start pi-sensor service"
service pi-sensor start
