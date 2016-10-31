import RPi.GPIO as GPIO
import dht11

class DHT:
    __pin = 14
    __debug = True
    def init_hw(self, pin):
        self.__pin = pin
        GPIO.setwarnings(False)
        GPIO.setmode(GPIO.BCM)
        GPIO.cleanup()

        self.__inst = dht11.DHT11(pin = pin)
        if self.__debug:
            result = self.__inst.read()
            if result.is_valid():
                print("Temperature: %d C" % result.temperature)
                print("Humidity: %d %%" % result.humidity)
            else:
                print("Error: %d" % result.error_code)

    def __init__(self, pin):
        self.__pin = pin
        self.init_hw(pin)

    def read(self):
        instance=self.__inst
        result = instance.read()
        if result.is_valid():
            return result
            if self.__debug:
                print("Temperature: %d C" % result.temperature)
                print("Humidity: %d %%" % result.humidity)
        else:
            return None
            #raise Exception('dht11 error')
