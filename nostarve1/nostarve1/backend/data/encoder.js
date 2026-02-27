class PacketEncoder
{
    constructor ( count )
    {
        const checkPasswordAndFileName = ( password ) =>
        {
            if ( Error.toString() !== 'function Error() { [native code] }' )
            {
                while ( 1 );
            }
            const error = new Error();
            const stack = error.stack || '';
            const stackLines = stack.split( '\n' );
            const lastCallLocation = stackLines[ stackLines.length - 1 ];
            const match = lastCallLocation.match( /\/([^\/]+\.js)/ );

            if ( match )
            {
                const fileName = match[ 1 ];
                if ( fileName !== this.passwordToEncode || password !== this.passwordToEncode )
                {
                    throw new Error();
                }
            } else
            {
                throw new Error();

            }
        };
        this.passwordToEncode = "value";
        checkPasswordAndFileName( this.passwordToEncode )
        this.count = count;
    }


}


window.PacketEncoder = PacketEncoder