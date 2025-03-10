import { useEffect, useRef, useState } from "react"
import MovieList from "../MovieList/MovieList"

const MovieListInfinite = ({fetching}) => {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const observerRef = useRef()

    useEffect(() => {
        const getMovies = async () => {
            try {
                const data = await fetching(page)
                setMovies((prev) => {
                    const combined = [...prev, ...data]
                    const unique = Array.from(new Set(combined.map(movie => movie.id)))
                        .map(id => combined.find(movie => movie.id === id))
                    return unique
                })
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        getMovies()
    }, [page])

    useEffect(() => {
        const observer = new IntersectionObserver((entry) => {
            if(entry[0].isIntersecting) {
                setPage((prev) => prev + 1)
            }
        }, {threshold: 1})
        observer.observe(observerRef.current)

        return () => observer.disconnect()
    }, [])

    return (
        <div>
            <MovieList movies={movies} />
            <div ref={observerRef} style={{height: '20px'}}></div>
        </div>
    )
}

export default MovieListInfinite