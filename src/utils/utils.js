class Utils {
    convertMinutes(totalMinutes) {
        return {
            hours: Math.floor(totalMinutes / 60),
            minutes: totalMinutes % 60
        };
    }    
}

export default new Utils()