import { createChart } from 'lightweight-charts';
const formatter = (price: any) => {
    return '$' + price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
}
const formatterNumber = (price: any) => {
    return price.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, "$&,")
}


export const generateChart = (id: string, data: any) => {
    const width = 600;
    const height = 300;

    const chart = createChart(document.getElementById(id)!, {
    rightPriceScale: {
        scaleMargins: {
        top: 0.2,

        },
        borderVisible: false,
    },
    timeScale: {
        borderVisible: false,
    },
    layout: {
        backgroundColor: '#ffffff',
        textColor: '#333',
    },
    grid: {
        horzLines: {
        color: '#eee',
        },
        vertLines: {
        color: '#ffffff',
        },
    },
    crosshair: {
        vertLine: {
        labelVisible: true,
        },
    },
    localization: {
		priceFormatter: formatter,
	},
    });

    chart.resize(width, height);

    const series = chart.addAreaSeries({
    topColor: 'rgba(0, 150, 136, 0.56)',
    bottomColor: 'rgba(0, 150, 136, 0.04)',
    lineColor: 'rgba(0, 150, 136, 1)',
    lineWidth: 2,
    });
    series.setData(data);
    chart.timeScale().fitContent();
}

export const generateChartNumber = (id: string, data: any) => {
    const width = 600;
    const height = 300;

    const chart = createChart(document.getElementById(id)!, {
    rightPriceScale: {
        borderVisible: false,
    },
    timeScale: {
        borderVisible: false,
    },
    layout: {
        backgroundColor: '#ffffff',
        textColor: '#333',
    },
    grid: {
        horzLines: {
        color: '#eee',
        },
        vertLines: {
        color: '#ffffff',
        },
    },
    crosshair: {
        vertLine: {
        labelVisible: true,
        },
    },
    localization: {
		priceFormatter: formatterNumber,
	},
    });

    chart.resize(width, height);

    const series = chart.addAreaSeries({
    topColor: 'rgba(0, 0, 0, 0.56)',
    bottomColor: 'rgba(0, 0, 0, 0.04)',
    lineColor: 'rgba(0, 0, 0, 1)',
    lineWidth: 2,
    });
    series.setData(data);
    chart.timeScale().fitContent();
}