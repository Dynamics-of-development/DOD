import React from 'react'
import img1 from "media/1.jpg";
import img2 from "media/2.jpg";
import img3 from "media/3.jpg"

const Index = () => {
    return (
        <>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src={img1} className="mx-auto d-block img-center" alt="Arroz"/>
                </div>
                <div class="carousel-item ">
                <img src={img2} className="mx-auto d-block img-center" alt="Leche"/>
                </div>
                <div class="carousel-item">
                <img src={img3} className="mx-auto d-block img-center" alt="Tostadas"/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
        </>
    )
}

export default Index