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
    
    sortMovies(moviesAndSeries, filterParams) {
        let sortedData = moviesAndSeries
        const sortType = filterParams.get('sortType')
        const genre = filterParams.get('genre')
        const category = filterParams.get('category')

        sortedData = sortedData.filter((el) => el.popularity > 3)

        if(sortType == 'alphabet') {
            sortedData = sortedData.sort((a, b) => {
                const nameA = (a.title || a.name || "").toLowerCase();
                const nameB = (b.title || b.name || "").toLowerCase();
                return nameA.localeCompare(nameB);
            })
        } else if(sortType == 'date') {
            sortedData = sortedData.sort((a, b) => {
                const dateA = new Date(a.release_date || a.first_air_date)
                const dateB = new Date(b.release_date || b.first_air_date)
                return dateB - dateA
            })
        } else if(sortType == 'popular') {
            sortedData = sortedData.sort((a, b) => b.vote_average - a.vote_average)
        } else {
            sortedData = sortedData
        }

        console.log(sortedData);

        if(genre) {
            sortedData = sortedData.filter((el) => el.genre_ids.includes(+genre))
        }
        
        if(category) {
            sortedData = sortedData.filter((el) => el.media_type == category)
        }


        return sortedData
    }
}

export default new Utils()