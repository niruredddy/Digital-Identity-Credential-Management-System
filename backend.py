import hashlib
import time
import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

SECRET_KEY = "IDENTITY_VERIFICATION_SECRET_2026"
DB_FILE = "database.json"
DATA_STORE = {}
SYSTEM_LOCKED = False

COMPLEXITY_ANALYSIS = "Dictionary lookups in Python use hash tables (O(1)). Standard list searches use linear scanning (O(n))."

def save_data():
    with open(DB_FILE, "w") as f:
        json.dump(DATA_STORE, f, indent=4)
    print("💾 DATA PERSISTED TO DISK")

def load_data():
    global DATA_STORE
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            DATA_STORE = json.load(f)
        print(f"📂 LOADED {len(DATA_STORE)} IDENTITIES FROM DISK")
    else:
        print("🆕 NO DATABASE FOUND, STARTING FRESH")
        populate_synthetic_dataset()
        save_data()

def create_hash(emp_id):
    salted_input = f"{emp_id}{SECRET_KEY}"
    return hashlib.sha256(salted_input.encode()).hexdigest()

def populate_synthetic_dataset():
    first_names = ["Julian", "Elena", "Marcus", "Sarah", "Victor", "Aria", "Silas", "Lyra", "Cassian", "Nova"]
    last_names = ["Thorne", "Vance", "Aurelius", "Jenkins", "Sterling", "Valois", "Kaelo", "Nyx", "Vane", "Stellar"]
    
    for i in range(1, 1001):
        emp_id = f"AID-{1000 + i}"
        name = f"{first_names[i % 10]} {last_names[(i * 7) % 10]}"
        emp_hash = create_hash(emp_id)
        DATA_STORE[emp_id] = {"name": name, "id": emp_id, "hash": emp_hash}

# Special identity for demonstration
DATA_STORE["NR-001"] = {"name": "Niranjan Reddy P", "id": "NR-001", "hash": create_hash("NR-001")}

@app.route('/verify', methods=['POST'])
def verify_identity():
    if SYSTEM_LOCKED:
        return jsonify({"status": "error", "message": "NEURAL LOCKDOWN ACTIVE: ALL SERVICES SUSPENDED"}), 403

    input_data = request.get_json()
    emp_id = input_data.get("id", "").strip().upper()
    print(f"DEBUG: Received ID: '{emp_id}'")
    
    computed_hash = create_hash(emp_id)
    retrieved_record = DATA_STORE.get(emp_id)
    
    if retrieved_record:
        print(f"DEBUG: Found record for {emp_id}")
        if retrieved_record["hash"] == computed_hash:
            return jsonify({"status": "success", "message": "Identity Verified", "data": retrieved_record}), 200
        else:
            print(f"DEBUG: Hash mismatch for {emp_id}")
    else:
        print(f"DEBUG: ID {emp_id} not found in DATA_STORE")
        print(f"DEBUG: Available keys (first 5): {list(DATA_STORE.keys())[:5]}")
        
    return jsonify({"status": "error", "message": "Verification Failed"}), 401

@app.route('/toggle-lockdown', methods=['POST'])
def toggle_lockdown():
    global SYSTEM_LOCKED
    SYSTEM_LOCKED = not SYSTEM_LOCKED
    status = "LOCKED" if SYSTEM_LOCKED else "OPERATIONAL"
    print(f"⚠️ SYSTEM STATUS CHANGED: {status}")
    return jsonify({"status": "success", "system_state": status})

@app.route('/issue', methods=['POST'])
def issue_identity():
    input_data = request.get_json()
    name = input_data.get("name", "New Subject")
    cred_class = input_data.get("class", "Standard")
    
    # Generate a new unique ID
    new_id_num = 2000 + len(DATA_STORE) - 1001 
    new_id = f"AID-{new_id_num}"
    
    emp_hash = create_hash(new_id)
    DATA_STORE[new_id] = {"name": name, "id": new_id, "hash": emp_hash, "class": cred_class}
    
    save_data() # Persist the new ID
    print(f"DEBUG: Issued new ID: {new_id} for {name}")
    
    return jsonify({
        "status": "success", 
        "message": "Credential Issued", 
        "data": DATA_STORE[new_id],
        "transactionHash": f"0x{hashlib.sha256(new_id.encode()).hexdigest()[:40]}"
    }), 200

@app.route('/benchmark')
def run_benchmark():
    print("\n" + "="*50)
    print("🔥 RUNNING TECHNICAL BENCHMARK (1 MILLION RECORDS)")
    print("="*50)
    
    size = 1000000
    large_list = [f"AID-{i}" for i in range(size)]
    large_dict = {f"AID-{i}": True for i in range(size)}
    target = f"AID-{size - 1}"
    
    print(f"DEBUG: Searching for target: {target}")
    
    # Standard O(n) Search
    print("DEBUG: Starting Standard List Search (O(n))...")
    start = time.perf_counter()
    _ = target in large_list
    list_time = time.perf_counter() - start
    print(f"RESULT: O(n) Time: {list_time:.6f} seconds")
    
    # Optimized O(1) Lookup
    print("DEBUG: Starting Optimized Hash Lookup (O(1))...")
    start = time.perf_counter()
    _ = target in large_dict
    dict_time = time.perf_counter() - start
    print(f"RESULT: O(1) Time: {dict_time:.6f} seconds")
    
    gain = int(list_time / (dict_time if dict_time > 0 else 0.000001))
    print(f"🌟 PERFORMANCE GAIN: {gain}x FASTER")
    print("="*50 + "\n")
    
    return jsonify({
        "dataset_size": size,
        "standard_list_search_time": f"{list_time:.6f}s",
        "optimized_dictionary_lookup_time": f"{dict_time:.6f}s",
        "performance_gain": f"{gain}x faster"
    })

@app.route('/inspect_data')
def inspect_data():
    return jsonify(DATA_STORE)

if __name__ == '__main__':
    load_data() # Load existing data on startup
    app.run(port=5005)
