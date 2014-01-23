import Adafruit_BBIO.GPIO as GPIO
import time

GPIO.setup("P8_18", GPIO.IN)
GPIO.setup("P8_14", GPIO.OUT)
GPIO.setup("P8_16", GPIO.OUT)

while True:
	time.sleep(2)	
	if GPIO.input("P8_18"):
		print "Motion detected"
		GPIO.output("P8_16", GPIO.LOW)
		GPIO.output("P8_14", GPIO.HIGH) 
		time.sleep(20)
		GPIO.output("P8_14", GPIO.LOW)
		GPIO.output("P8_16", GPIO.HIGH)
		time.sleep(20)
	else:
		print "No motion detected"
