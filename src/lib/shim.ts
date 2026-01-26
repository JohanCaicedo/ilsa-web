// Basic shim for MessageChannel and MessagePort to satisfy React 19 requirements in environments where they are missing.
// This is required for Cloudflare Workers/Pages Functions in some configurations.

if (typeof globalThis.MessageChannel === 'undefined') {
    console.log('Polyfilling MessageChannel for React 19');

    class MessagePortPolyfill extends EventTarget {
        otherPort: MessagePortPolyfill | null = null;
        onmessage: ((event: MessageEvent) => void) | null = null;

        postMessage(message: any) {
            if (!this.otherPort) return;

            // Verification: Mimic async behavior
            const event = new MessageEvent('message', {
                data: message,
                ports: [this.otherPort as unknown as MessagePort], // cast to satisfy TS
            });

            // Execute on next tick to simulate async messaging
            setTimeout(() => {
                if (this.otherPort?.onmessage) {
                    this.otherPort.onmessage(event);
                }
                this.otherPort?.dispatchEvent(event);
            }, 0);
        }

        start() { }
        close() { }
    }

    class MessageChannelPolyfill {
        port1: MessagePortPolyfill;
        port2: MessagePortPolyfill;

        constructor() {
            this.port1 = new MessagePortPolyfill();
            this.port2 = new MessagePortPolyfill();

            this.port1.otherPort = this.port2;
            this.port2.otherPort = this.port1;
        }
    }

    (globalThis as any).MessageChannel = MessageChannelPolyfill;
    (globalThis as any).MessagePort = MessagePortPolyfill;
}
