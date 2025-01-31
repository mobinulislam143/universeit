/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import ComponentsTitle from "../../../Shared/ComponentsTitle/ComponentsTitle";
import demoVideo1 from '../../../assets/demoVideo/demo1.mp4';
import demoVideo2 from '../../../assets/demoVideo/demo2.mp4';
import demoVideo3 from '../../../assets/demoVideo/demo3.mp4';
import { IoPlayCircleSharp } from "react-icons/io5";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";
import { Link } from "react-router-dom";
import VideoPlayingModal from "../../../Shared/VideoPlayingModal";



const SuccessStories = ({ isHomePage = false }) => {
    const [seeMore, setSeeMore] = useState(false);
    const [modalVideoSrc, setModalVideoSrc] = useState(null);
    const videos = [
        { id: 1, src: demoVideo1 },
        { id: 2, src: demoVideo2 },
        { id: 3, src: demoVideo3 },
    ];

    const handlePlayButtonClick = (videoSrc) => {
        setModalVideoSrc(videoSrc);
    };

    const handleCloseModal = () => {
        setModalVideoSrc(null);
    };

    return (
        <div className="bg-[#fefaee] py-10">
            <div className="max-w-7xl mx-auto">
                <ComponentsTitle title={'Success Stories'} description={'Shine a spotlight on the stories of our determined students who have achieved remarkable feats through their unwavering dedication.'} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-wrap px-5 sm:px-10 pt-10">
                    {videos.slice(0, seeMore ? videos.length : 2).map((video) => (
                        <div className="min-h-full" key={video.id}>
                            <div className="relative">
                                <div className="relative">
                                    <video
                                        className="rounded-lg shadow-lg w-full md:h-[25.5vw] xl:h-[329px]"
                                        src={video.src}
                                        muted
                                    />
                                    <div onClick={() => handlePlayButtonClick(video.src)} className="absolute inset-0 flex items-center justify-center cursor-pointer">
                                        <button className="relative">
                                            <span className="absolute size-4 bg-white top-4 left-4 z-0"></span>
                                            <IoPlayCircleSharp className="text-5xl rounded-full text-red-600 relative z-10" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center pt-10">
                    {
                        !isHomePage ? (
                            <div className="w-max" onClick={() => setSeeMore(!seeMore)}>
                                <ButtonStrong text={seeMore ? 'View Less' : 'View All'} />
                            </div>
                        ) : (
                            <Link to={'/successStory'}>
                                <div className="w-max">
                                    <ButtonStrong text={'View All'} />
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>

            {modalVideoSrc && (
                <VideoPlayingModal videoSrc={modalVideoSrc} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default SuccessStories;
