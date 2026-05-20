# ======================================================
# RAAHI - Women Safety Device
# ======================================================

import serial
import time
from gpiozero import Button
from pynmea2 import parse

# ======================================================
# GSM MODULE CONFIGURATION
# ======================================================

# GSM Module Serial Port
gsm = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)

# GPS Module Serial Port
gps_serial = serial.Serial('/dev/ttyS0', 9600, timeout=1)

# Emergency Contact Number
PHONE_NO = "+9188xx5848xx"

# ======================================================
# BUTTON CONFIGURATION
# ======================================================

# SOS SMS Button
sos_button = Button(4)

# Emergency Call Button
call_button = Button(5)

# ======================================================
# GSM INITIALIZATION
# ======================================================

time.sleep(2)

gsm.write(b'AT+CMGF=1\r')
time.sleep(0.1)

gsm.write(b'AT+CNMI=2,2,0,0,0\r')
time.sleep(0.1)

# ======================================================
# FUNCTION TO GET GPS LOCATION
# ======================================================

def get_gps_location():

    latitude = 0.0
    longitude = 0.0

    start_time = time.time()

    while time.time() - start_time < 1:

        if gps_serial.in_waiting > 0:

            try:
                gps_data = gps_serial.readline().decode(
                    'utf-8',
                    errors='ignore'
                )

                print(gps_data)

                # Parse GPS Data
                if gps_data.startswith("$GPGGA"):

                    message = parse(gps_data)

                    latitude = message.latitude
                    longitude = message.longitude

                    return latitude, longitude

            except Exception as e:
                print("GPS Error:", e)

    return latitude, longitude

# ======================================================
# MAIN LOOP
# ======================================================

while True:

    # ==================================================
    # READ INCOMING GSM MESSAGES
    # ==================================================

    if gsm.in_waiting > 0:

        try:

            text_message = gsm.read(
                gsm.in_waiting
            ).decode(
                'utf-8',
                errors='ignore'
            )

            text_message = text_message.upper()

            print("Received Message:")
            print(text_message)

            time.sleep(0.01)

        except Exception as e:
            print("GSM Read Error:", e)

    # ==================================================
    # SOS BUTTON - SEND EMERGENCY SMS
    # ==================================================

    if sos_button.is_pressed:

        print("SOS Button Pressed")

        latitude, longitude = get_gps_location()

        try:

            # Enable SMS Mode
            gsm.write(b'AT+CMGF=1\r')
            time.sleep(0.4)

            # Send SMS Command
            command = f'AT+CMGS="{PHONE_NO}"\r'
            gsm.write(command.encode())

            time.sleep(1)

            # Emergency Alert Message
            gsm.write(
                b'Alert! I need help immediately.\n'
            )

            # Google Maps Link
            location_link = (
                f'http://maps.google.com/maps?q=loc:'
                f'{latitude},{longitude}'
            )

            gsm.write(location_link.encode())

            time.sleep(0.2)

            # CTRL+Z to Send SMS
            gsm.write(bytes([26]))

            time.sleep(10)

            print("Emergency SMS Sent")

        except Exception as e:
            print("SMS Sending Error:", e)

    else:
        time.sleep(0.01)

    # ==================================================
    # EMERGENCY CALL BUTTON
    # ==================================================

    if call_button.is_pressed:

        print("Emergency Call Activated")

        try:

            time.sleep(2)

            # Dial Emergency Number
            gsm.write(
                b'ATD+9188305848xx;\r'
            )

            print("Calling Emergency Contact...")

            # Call Duration
            time.sleep(30)

            # Hang Up Call
            gsm.write(b'ATH\r')

            print("Call Ended")

            time.sleep(1)

        except Exception as e:
            print("Call Error:", e)

    else:
        time.sleep(0.01)