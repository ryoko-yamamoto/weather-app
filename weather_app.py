import tkinter as tk
import requests

canvas = tk.Tk()
canvas.geometry("700x500")  
canvas.title("Today's Weather")
a = ("Arial black", 20, "bold")
b = ("Arial black", 40, "bold")

def getWeather(event=None):
    lat = latField.get()
    lon = lonField.get()
    api_key = "XXXXXXXXXXXXXXXXXXXXXXXXXX"  
    api = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}"
    
    print(f"Request URL: {api}")  
    
    response = requests.get(api)
    print(f"Response Status Code: {response.status_code}")  
    print(f"Response Content: {response.text}")  
    if response.status_code == 200:
        json_data = response.json()
        try:
            weather = json_data['weather'][0]['main']
            temp = int(json_data['main']['temp'] - 273.15)
            min_temp = int(json_data['main']['temp_min'] - 273.15)
            max_temp = int(json_data['main']['temp_max'] - 273.15)
            
            final_info = f"{weather}\n{temp}℃"
            final_data = f"Min-Temp: {min_temp}℃\nMax-Temp: {max_temp}℃"
            label1.config(text=final_info)
            label2.config(text=final_data)
        except KeyError as e:
            label1.config(text="Error: Invalid data received")
            label2.config(text=str(e))
    else:
        label1.config(text="Error: Failed to retrieve data")
        label2.config(text=f"Status code: {response.status_code}")


latLabel = tk.Label(canvas, text="Enter Latitude (e.g., 35.6895 for North, -35.6895 for South):", font=a)
latLabel.pack(pady=10)
latField = tk.Entry(canvas, justify='center', width=20, font=b)
latField.pack(pady=10)


lonLabel = tk.Label(canvas, text="Enter Longitude (e.g., 139.6917 for East, -139.6917 for West):", font=a)
lonLabel.pack(pady=10)
lonField = tk.Entry(canvas, justify='center', width=20, font=b)
lonField.pack(pady=10)


submitButton = tk.Button(canvas, text="Get Weather", command=getWeather, font=b)
submitButton.pack(pady=20)


label1 = tk.Label(canvas, font=b)
label1.pack()
label2 = tk.Label(canvas, font=a)
label2.pack()

canvas.mainloop()
