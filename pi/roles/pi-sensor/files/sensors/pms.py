#!/usr/bin/env python
import pms3003
class PMS:
    def __init__(self):
        air=pms3003.g3sensor()
        self.air = air
        return
    def read(self):
        try:
            data = self.air.read("/dev/ttyAMA0")
            return data
        except Exception as e:
            print e
