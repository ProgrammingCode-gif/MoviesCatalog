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
            const minVoutes = 500; // Минимальное количество голосов для учета
            const avgScore = sortedData.reduce((sum, movie) => sum + movie.vote_average, 0) / sortedData.length; // Средняя оценка всех фильмов
        
            sortedData = sortedData
                .map(movie => {
                    const voteCount = movie.vote_count;
                    const voteAvg = movie.vote_average;
        
                    const weightedRating = (voteCount / (voteCount + minVoutes)) * voteAvg + (minVoutes / (voteCount + minVoutes)) * avgScore;
                    
                    return { ...movie, weightedRating };
                })
                .sort((a, b) => b.weightedRating - a.weightedRating);
        } else {
            sortedData = sortedData
        }

        if(genre) {
            sortedData = sortedData.filter((el) => el.genre_ids.includes(+genre))
        }
        
        if(category) {
            sortedData = sortedData.filter((el) => el.media_type == category)
        }


        return sortedData
    }

    firtsLetterToUpper(text) {
        const textArr = text.split('')
        textArr[0] = textArr[0].toUpperCase()
        textArr.join('')

        return textArr
    }
}

export default new Utils()