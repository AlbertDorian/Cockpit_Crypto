import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
    idCoin: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ idCoin }) => {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
            "width": "350",
            "height": "250",
            "symbol": `${idCoin}USD`,
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "allow_symbol_change": true,
            "calendar": false,
            "support_host": "https://www.tradingview.com"
        });

        if (container.current) {
            // Remove any existing script before appending a new one
            while (container.current.firstChild) {
                container.current.removeChild(container.current.firstChild);
            }
            container.current.appendChild(script);
        }

        // Cleanup function to remove the script when the component unmounts or idCoin changes
        return () => {
            if (container.current) {
                while (container.current.firstChild) {
                    container.current.removeChild(container.current.firstChild);
                }
            }
        };
    }, [idCoin]);

    return (
        <div className="tradingview-widget-container" ref={container} style={{ height: "220px", width: "350px" }}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

export default memo(TradingViewWidget);
