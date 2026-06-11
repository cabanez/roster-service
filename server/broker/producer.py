from confluent_kafka import Producer
import json
import socket

# Configuration matching the Docker exposed port
conf = {
    'bootstrap.servers': 'broker:9092',
    'client.id': socket.gethostname()
}

def delivery_report(err, msg):
    if err is not None:
        print(f"❌ Delivery failed: {err}")
    else:
        print(f"✅ Delivered to {msg.topic()} [{msg.partition()}] offset {msg.offset()}")

def trigger_event(teamId):
    producer = Producer(conf)
    
    # Define the event payload
    event = {
        "event_type": "squad_availability_changed",
        "team": teamId
    }

    print("🚀 Triggering event...")
    
    try:
        # Produce the message (this only queues the message)
        producer.produce(
            topic='squad_events',
            key=str(teamId).encode('utf-8'),
            value=json.dumps(event).encode('utf-8'),
            callback=delivery_report
        )
    except Exception as e:
        print(f"Error triggering event: {e}")

    # Flush ensures the message is sent before the script exits
    producer.flush()
    print("✅ Event propagation complete.")

if __name__ == "__main__":
    trigger_event("default_team")   