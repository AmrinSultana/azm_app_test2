import csv
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('C:/Users/RIYA AMRIN/OneDrive/Desktop/csvtofirestore/azmapplogin-firebase-adminsdk-x0uij-1c191dc9e1.json')
firebase_admin.initialize_app(cred)
db = firestore.client()
csv_file_path = 'C:/Users/RIYA AMRIN/OneDrive/Desktop/csvtofirestore/geofences.csv'
documents_uploaded = 0

try:
    with open(csv_file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            row['radius'] = int(row['radius']) if row['radius'].isdigit() else 0

            location_code = row['locationCode']
            db.collection('geofencetest').document(location_code).set({
                'itemid': row['locationCode'],
                'locationCode': row['locationCode'],
                'latitude': row['latitude'],
                'longitude': row['longitude'],
                'name': row['name'],
                'radius': row['radius']
            })
            documents_uploaded += 1
            print(f"Document uploaded: {location_code}")
    print(f"Total documents uploaded: {documents_uploaded}")

        
except Exception as e:
    print("An error occurred:", e)
