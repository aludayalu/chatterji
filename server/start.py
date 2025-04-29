import os
import random
import shutil
import subprocess
import threading
from flask import Flask, jsonify

threading.Thread(
    target=subprocess.Popen,
    args=(["code-server"],),
    kwargs={"stdout": subprocess.DEVNULL, "stderr": subprocess.DEVNULL}, daemon=True
).start()

app = Flask(__name__)
count = 0
lock = threading.Lock()

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET,OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

os.system("rm -rf instance*/")

@app.get("/")
def main():
    global count
    with lock:
        count += 1
        idx = count

    inst = f"instance{idx}"
    os.makedirs(inst, exist_ok=True)
    shutil.copy("agent.py", os.path.join(inst, "agent.py"))

    port = random.randint(1000, 65000)

    subprocess.Popen(
        ["python3", "agent.py", str(port)],
        cwd=inst,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )

    return jsonify(location=os.path.abspath(inst), port=port)

if __name__ == "__main__":
    app.run(threaded=True, use_reloader=False)