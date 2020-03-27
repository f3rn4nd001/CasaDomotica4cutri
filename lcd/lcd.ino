#include <ArduinoJson.h>
#include <WString.h>
#include <ArduinoJson.h>
#include <DHT.h>
#define DHTPIN 2
#define DHTTYPE DHT11
 #include <Wire.h>
#include <SoftwareSerial.h>
#include <LiquidCrystal.h>

DHT dht(DHTPIN, DHTTYPE);

const byte pinObstaculo = 7;
const byte arduinoLed = 10;
#include <Servo.h>
Servo servo1;
int contador=0;
int hayObstaculo = HIGH;
int i=0;
int SensorFlamaCocina = A2;
const int MQ_PIN = A0;
 
void setup() {
  Serial.begin(9600); 
  dht.begin();
  pinMode(arduinoLed, OUTPUT);
  servo1.attach(4);
}
 
void loop() {
  delay(2000);
 
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("Error obteniendo los datos del sensor DHT11");
    return;
  }
  float hif = dht.computeHeatIndex(f, h);
  float hic = dht.computeHeatIndex(t, h, false);
  
 
  const size_t capacity = JSON_ARRAY_SIZE(2) + JSON_OBJECT_SIZE(3);
  DynamicJsonDocument doc(capacity);
  if (h<20||t>35||h>80){
    doc["Apartado"] = "Sala";
    doc["Sensor"] = "Humedad";
    doc["Humedad"] = h;
    doc["Temperatura"] = t;    
    serializeJson(doc, Serial);
    Serial.println();
  }
  /*Serial.print("Humedad: ");
  Serial.print(h);
  Serial.print("Temperatura: ");
  Serial.print(t);
  Serial.print(" *C ");
  Serial.print(f);
  Serial.print(" *F\t");
  Serial.print("Índice de calor: ");
  Serial.print(hic);
  Serial.print(" *C ");
  Serial.print(hif);
  Serial.println(" *F");
*/
//sensor infrarojo servomotor
  hayObstaculo = digitalRead(pinObstaculo);
  if (hayObstaculo == LOW){
    
      (contador++);
    
    if((contador%2)==1){
    digitalWrite(arduinoLed, HIGH);}
      doc["Apartado"] = "Elevador";
      doc["Sensor"] = "Infra";
   
    serializeJson(doc, Serial);
    Serial.println(); 
    servo1.write(180);
    delay(500);
    
      
      
  }
  else{
    if((contador%2)==0){
    digitalWrite(arduinoLed, LOW);
    
    }
    servo1.write(0);
    delay(500);
 
  }

// SENSOR FLAMA 
  //COCINA
    int ValorSensorFlamaCocina = analogRead(SensorFlamaCocina);
    
    if (ValorSensorFlamaCocina < 500){
    doc["Apartado"] = "Cocina";
    doc["Sensor"] = "FLAMA";
    doc["Flama"] = ValorSensorFlamaCocina;
    serializeJson(doc, Serial);
    Serial.println();
   }

// SENSOR GAS 
int raw_adc = analogRead(MQ_PIN);
  float value_adc = raw_adc * (5.0 / 1023.0);
   if (raw_adc > 180){
    doc["Apartado"] = "Cocina";
    doc["Sensor"] = "Gas";
    doc["Gas"] = raw_adc;
    serializeJson(doc, Serial);
    Serial.println();   
   }


}
