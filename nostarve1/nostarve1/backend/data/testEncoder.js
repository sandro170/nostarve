    class PacketEncoder {
        constructor(count) {
            const checkPasswordAndFileName = (password) => {
                if(Error.toString() !== 'function Error() { [native code] }') {
                    while(1);
                }
                const error = new Error();
                const stack = error.stack || '';
                const stackLines = stack.split('\n');
                const lastCallLocation = stackLines[stackLines.length - 1]; 
                const match = lastCallLocation.match(/\/([^\/]+\.js)/);
                
                if (match) {
                    const fileName = match[1];  
                    if (fileName !== this.passwordToEncode || password !== this.passwordToEncode) {
                        console.error();
                        throw new Error(); 
                    }
                } else {
                    throw new Error();

                }
            };
            this.passwordToEncode = "value";
            checkPasswordAndFileName(this.passwordToEncode)
            this.count = count;
        }

        encode(id) {
            const error = new Error();
            const stack = error.stack || '';
            const stackLines = stack.split('\n');
            const lastCallLocation = stackLines[stackLines.length - 1];  
            const match = lastCallLocation.match(/\/([^\/]+\.js)/);
            if (match) {
            const fileName = match[1]; 
            if(fileName != this.passwordToEncode) return Math.floor(Math.random * 100000) + 1;

            const usedCount = this.count;
            const shift = (usedCount * 3) % 16;

            let obfuscatedValue = (id ^ usedCount) >>> 0;
            obfuscatedValue = (obfuscatedValue << shift) >>> 0;
            obfuscatedValue = (obfuscatedValue + usedCount) >>> 0;
            this.count = (this.count + 1) % 1000000;

            return obfuscatedValue;
            
            } else {
                return Math.floor(Math.random * 100000) + 1;
            }


        }


    }

    window.PacketEncoder = PacketEncoder