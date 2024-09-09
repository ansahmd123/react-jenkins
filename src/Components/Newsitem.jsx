import React from "react";

const Newsitem = (props) => {
    let { title, description, imageUrl, url, author, time } = props;
    return (

        <div className="card">
            <img src={imageUrl} className="card-img-top" alt="..." style={{ width: '354px', height: '233px' }} />
            <div className="card-body" style={{ width: '354px', height: '280px' }}>
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} at {new Date(time).toGMTString()} </small></p>
                <div className="card-footer">

                    <a rel="noreferrer" href={url} target="_blank" className="btn btn-dark">Read More</a>
                </div>
            </div>
        </div>

    );

}

export default Newsitem;