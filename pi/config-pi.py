#!/usr/bin/env python
import ConfigParser
config = ConfigParser.RawConfigParser()

config.add_section('server')
config.add_section('client')
url=raw_input('Please input server DNS/IP:( default: sensor.elasticservice.co)')
if not url:
    url="sensor.elasticservice.co"
print "server:" + url
config.set('server', 'server', url)

building=raw_input('Building:(default: B)')
if not building:
    building="B"
print "building:" + building
config.set('client', 'building', building)

floor=raw_input('Floor:(default: 3)')
if not floor:
    floor="3"
print "floor:" + floor
config.set('client', 'floor', floor)

area=raw_input('Area:(default: a)')
if not area:
    area="a"
print "area:" + area
config.set('client', 'area', area)

with open('/etc/sensor.ini', 'wb') as configfile:
    config.write(configfile)
