
//F9rSrKXOIyJApoV10VZupM4MSh7FziAKuoD1ve0c

#include <WiFi.h>
#include <PubSubClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <FirebaseESP32.h>

// define firebase
#define FIREBASE_HOST "iotsmartgarden2020-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "F9rSrKXOIyJApoV10VZupM4MSh7FziAKuoD1ve0c"

FirebaseData firebaseData;
FirebaseJson json;

int dbReadTimeOut = 1000*60; // = 1min

// define wifi
const char* ssid = "Nephilimm";
const char* password = "cccccccc";

// define led and sensor

#define LED2_PORT 26
#define TEMPERATURE 27
#define HUMID 25
#define PUMP 33


String led = "0";
String pump = "0";
String servo = "0";

int humidValue = 0;
int temp = 0;
int thresholdvalue = 800;

FirebaseData firebaseFan;
String path = "test/device/1/control"; 
String child[3] = {"/led", "/pump", "/servo"};
size_t childSize = 3;

OneWire oneWire(TEMPERATURE);
DallasTemperature sensors(&oneWire);


// setup wifi
void setup_wifi() {
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  randomSeed(micros());
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}


void streamCallback (MultiPathStreamData stream){
  size_t numChild = sizeof(child)/sizeof(child[0]);
  if (stream.get(child[0]))
    led = stream.value;
  if (stream.get(child[1]))
    pump = stream.value;
  if (stream.get(child[2]))
    servo = stream.value;
}

// setup firebase
void streamTimeoutCallback(bool timeout) {
  if (timeout) {
    Serial.println();
    Serial.println("Stream timeout, resume streaming...");
    Serial.println();
  }
}



void setup_firebase() {
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  // set db read timeout
  Firebase.setReadTimeout(firebaseData, dbReadTimeOut);
  //tiny, small, medium, large and unlimited.
  //Size and its write timeout e.g. tiny (1s), small (10s), medium (30s) and large (60s)
  Firebase.setwriteSizeLimit(firebaseData, "tiny");

  Serial.println("________________________________");
  Serial.println("Connected firebase...");

  if (!Firebase.beginMultiPathStream(firebaseFan, path, child, childSize)) {
    Serial.println("________________________________");
    Serial.println("Reason: " + firebaseFan.errorReason());
    Serial.println("________________________________");
  }

  Firebase.setMultiPathStreamCallback(firebaseFan, streamCallback, streamTimeoutCallback, 8192);
}

void setup() {
  // setup serial
  Serial.begin(115200);
  Serial.setTimeout(500);
  
  setup_wifi();
  setup_firebase();

  //setup sensor DS18b20
  sensors.begin();
  
  // setup led
  pinMode(LED2_PORT, OUTPUT);

  //setup YL-100
  pinMode(HUMID, INPUT);
  
}

void loop() {
  
  //Read data from DS18b20
  sensors.requestTemperatures();    
  temp = sensors.getTempCByIndex(0);
  Serial.print("Nhiet do: ");
  Serial.println(sensors.getTempCByIndex(0));

  //read data from YL-100
  humidValue = digitalRead(HUMID);
  
  Serial.print("LED status : "); Serial.println(led);
  Serial.print("Humid: "); Serial.println(humidValue);
  Serial.print("Pump: "); Serial.println(pump);
  //control led
  if (led == "1")
    digitalWrite(LED2_PORT, HIGH);
   else 
    digitalWrite(LED2_PORT, LOW);

  //control pump
  if (pump == "1")
    digitalWrite(PUMP, HIGH);
   else 
    digitalWrite(PUMP, LOW);

  json.set("/humid", humidValue);
  json.set("/temperature", temp);
  json.set("/light", led);
  Firebase.updateNode(firebaseData, "test/device/1/data", json);

  delay(1000);
}
