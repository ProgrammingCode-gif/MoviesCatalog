class Utils {
    convertMinutes(totalMinutes) {
        return {
            hours: Math.floor(totalMinutes / 60),
            minutes: totalMinutes % 60
        };
    }    
    formatCurrency(num) {
        return new Intl.NumberFormat('en-EN', {
            style: "currency",
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(num)
    }
}

export default new Utils()