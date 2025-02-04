import socket

HEADER = 64
PORT = 9090
FORMAT = 'utf-8'
DISCONNECT_MASSAGE = "DISCONNECT"
SERVER = "127.0.1.1"
ADDR = (SERVER, PORT)

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(ADDR)

while True:
    msg = input("Server: ")
    client.send(msg.encode())
