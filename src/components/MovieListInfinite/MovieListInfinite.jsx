import { useEffect, useRef, useState } from "react"
import MovieList from "../MovieList/MovieList"

const MovieListInfinite = ({content, onPage}) => {
    const observerRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver((entry) => {
            if(entry[0].isIntersecting) {
                onPage((prev) => prev + 1)
            }
        }, {threshold: 1})
        observer.observe(observerRef.current)

        return () => observer.disconnect()
    }, [])

    return (
        <div>
            <MovieList movies={content} />
            <div ref={observerRef} style={{height: '5px', marginBottom: '10px'}}></div>
        </div>
    )
}

export default MovieListInfinite