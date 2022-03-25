import csv
from turtle import speed
import obd
import time
from datetime import datetime
import logging
from threading import Thread, Event
# import board
# import adafruit_icm20x

event = Event()
global stop_thread
# i2c = board.I2C()  # uses board.SCL and board.SDA
# icm = adafruit_icm20x.ICM20649(i2c)
#obd.logger.setLevel(obd.logging.DEBUG) # enables all debug information
def obd_thread(res_obd_rpm, res_obd_speed, res_obd_throttle):
	logging.info("Thread obd: starting")
	import obd
	connection = obd.OBD("COM2", 57600)
	obd_rpm = obd.commands.RPM
	obd_speed = obd.commands.SPEED
	obd_throttle = obd.commands.THROTTLE_POS
 
	y = 0
	while y < 4:
			res_obd_rpm = connection.query(obd_rpm)
			res_obd_speed = connection.query(obd_speed)
			res_obd_throttle = connection.query(obd_throttle)
			
			print(res_obd_rpm.value)
			print(res_obd_speed.value.to("mph"))
			print(res_obd_throttle.value) # user-friendly unit conversions
			y= y +1
   
   	
	connection.close()
	logging.info("Thread obd: finishing")
	

if __name__ == "__main__":
	header = ['Time', 'RPM', 'MPH', 'THROTTLE_POS', 'AX','AY','AZ', 'GX', 'GY', 'GZ']

	filename = datetime.now().strftime("%Y_%m_%d-%I_%M_%S_%p") + '.csv'
	res_rpm = obd.OBDResponse()
	res_speed = obd.OBDResponse()
	res_throttle = obd.OBDResponse()
	run_thread = True	
 
	obd2 = Thread(target=obd_thread, args=(res_rpm, res_speed, res_throttle))
	obd2.start()
	time.sleep(3)
	
	with open(filename, 'w', newline='') as f:
		writer = csv.writer(f)
		writer.writerow(header)
		i = 0
		while i<10:
			try:
				data = [datetime.now().strftime("%I:%M:%S %p"), res_rpm.value.magnitude, res_speed.value.to("mph").magnitude, res_throttle.value.magnitude]
				writer.writerow(data)
			
			#print("Acceleration: X:%.2f, Y: %.2f, Z: %.2f m/s^2" % (icm.acceleration))
			#print("Gyro X:%.2f, Y: %.2f, Z: %.2f rads/s" % (icm.gyro))
				time.sleep(0.5)
				i = i+1	
			except KeyboardInterrupt:
				event.set()
				break

		run_thread = False
		obd2.join()
		f.close()