import React from "react";
import { useState, useEffect } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [article, setarticle] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [totalresults, settotalresults] = useState(0);

    const fetchMoreData = async () => {
        setpage(page + 1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0fc50964b8164f3d80afba62569bf713&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        setarticle(article.concat(parsedData.articles));
        settotalresults(parsedData.totalresults);
    };


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        async function fetchData() {
            // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0fc50964b8164f3d80afba62569bf713&page=1&pageSize=${props.pageSize}`;
            const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0fc50964b8164f3d80afba62569bf713`
            setloading(true);
            let data = await fetch(url);
            let parsedData = await data.json();
            setarticle(parsedData.articles);
            settotalresults(parsedData.totalresults);
            setloading(false);
        }
        fetchData();
    }, [props.country, props.category, props.pageSize]);


    // useEffect(async () => {
    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0fc50964b8164f3d80afba62569bf713&page=${page}&pageSize=${props.pageSize}`;
    //     setloading(true);
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     setarticle(parsedData.articles);
    //     settotalresults(parsedData.totalresults);
    //     setloading(false);
    // }, [])


    // console.log("render");
    return (
        <>
            <InfiniteScroll
                dataLength={article.length}
                next={fetchMoreData}
                hasMore={article.length !== totalresults}
                loader={<Spinner />}
            >
                <div className="container my-3">
                    <h1 className="text-center">NewsKart-{capitalizeFirstLetter(props.category)} Top Headlines</h1>
                    {loading && <Spinner />}

                    <div className="row my-3">

                        {article.map((element) => {
                            return (
                                <div className="col-md-4 my-4" key={element.url}>
                                    <Newsitem
                                        title={element.title ? element.title.slice(0, 45) : ""}
                                        description={
                                            element.description
                                                ? element.description.slice(0, 88)
                                                : ""
                                        }
                                        imageUrl={
                                            !element.urlToImage
                                                ? "https://img.freepik.com/free-vector/news-logo-collection-template_23-2148467598.jpg?size=338&ext=jpg"
                                                : element.urlToImage
                                        }
                                        url={element.url}
                                        author={element.author}
                                        time={element.publishedAt}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* <div className="container d-flex justify-content-between">
            <button disabled={page <= 1} className="btn btn-dark btn-sm" onClick={ handlePrevClick}>&larr; Previous</button>
            <button disabled={page + 1 >Math.ceil(totalresults /  props.pageSize)} className="btn btn-dark btn-sm" onClick={ handleNextClick}>Next &rarr;</button>
          </div> */}
            </InfiniteScroll>

        </>

    );
}



News.defaultProps = {
    country: "in",
    pageSize: 21,
    category: "general",
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News;