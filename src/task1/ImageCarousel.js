import React, {useEffect, useState} from "react";
import { fetchImages } from "../api/index";

import Fab from '@mui/material/Fab';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './styles.css';

const ImageCarousel = (props) => {
    const [imagesArray, setImagesArray] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(()=>{
        fetchImages()
        .then((res)=>{
            setImagesArray(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);

    const prevImge = () =>{
        if(imgIndex === 0){
            setImgIndex(imagesArray.length - 1);
        }else{
            setImgIndex(imgIndex-1);
        }
    };

    const nextImage = () =>{
        if(imgIndex === imagesArray.length - 1){
            setImgIndex(0);
        }else{
            setImgIndex(imgIndex+1);
        }
    };


    return imagesArray? 
    (
        <div className="carouselContainer">
            <div onClick={prevImge} className="nav_btn">
                <Fab size="small" color="primary"><ChevronLeftIcon /></Fab> 
            </div>

            <div className="img_container">
                <img src={imagesArray[imgIndex]}/>
            </div>

            <div onClick={nextImage} className="nav_btn">
                <Fab size="small" color="primary"  ><ChevronRightIcon /></Fab>
            </div>
        </div>
    )
    :
    (
        <div className="loadingStatus">Loading...</div>
    )
};
export default ImageCarousel;
