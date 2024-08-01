import { useState } from "react";
import CourseCard from "./CourseCard";
import digitalMarketingImage from '../../../assets/coursesImg/digital marketing.jpg'
import webDesignImage from '../../../assets/coursesImg/web.jpg'
import graphicsDesignImage from '../../../assets/coursesImg/grphic.jpg'
import seoImage from '../../../assets/coursesImg/seo.jpg'
import fullStackImage from '../../../assets/coursesImg/fulStack.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
const Courses = () => {
    const [tabName, setTabName] = useState('All Courses')
    const tabStyle = (incomingTabName) => {
        return `bg-primary/95 font-medium  rounded-t-lg px-7 py-2.5 active:scale-90 transition-all duration-300 hover:bg-primary ${incomingTabName === tabName ? 'bg-primary text-white' : 'bg-white hover:bg-primary/30'}`
    }



 

    const allCourses = [
        {
            title: "Digital Marketing",
            category: "Digital Marketing",
            rating: 4.3,
            reviews: 1025,
            price: 10000,
            courseImage: digitalMarketingImage,
            instructor: {
                name: "Md Masud Rana",
                enrolled: 300,
                profileImage: "https://i.ibb.co/Y39KLDp/client1.jpg"
            }
        },
        {
            title: "Web Design",
            category: "Web Design",
            rating: 4.3,
            reviews: 1155,
            price: 10000,
            courseImage: webDesignImage,
            instructor: {
                name: "Atik Md Alavi",
                enrolled: 300,
                profileImage: "https://i.ibb.co/D4Sx9Wk/client2.jpg"
            }
        },
        {
            title: "Graphic Design",
            category: "Graphic Design",
            rating: 4.3,
            reviews: 930,
            price: 10000,
            courseImage: graphicsDesignImage,
            instructor: {
                name: "Fahim Ahammed Riyad",
                enrolled: 250,
                profileImage: "https://i.ibb.co/fD16FGy/client5.jpg"
            }
        },
        {
            title: "SEO Mastery",
            category: "Digital Marketing",
            rating: 4.5,
            reviews: 850,
            price: 12000,
            courseImage: seoImage,
            instructor: {
                name: "Nusrat Jahan",
                enrolled: 200,
                profileImage: "https://i.ibb.co/HBnLgL6/client8.webp"
            }
        },
        {
            title: "Full Stack Development",
            category: "Development",
            rating: 4.7,
            reviews: 1300,
            price: 15000,
            courseImage: fullStackImage,
            instructor: {
                name: "Shakib Khan",
                enrolled: 350,
                profileImage: "https://i.ibb.co/zP8cG18/client10.jpg"
            }
        }
    ];
   
    return (
        <div className="bg-gray-100">
            <div className=" py-10 space-y-5 max-w-7xl mx-auto">
                <div className="space-y-5 px-20 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Our Demanding Courses</h2>
                    <p className="font-medium">Elevate your skills with our demanding courses designed to push your boundaries and unlock your full potential.</p>
                </div>
                <div className="px-5 space-y-10">
                    <div className="bg-white shadow-xl rounded-lg flex gap-5 flex-wrap max-w-max mx-auto">
                        <button
                            className={`${tabStyle('All Courses')}`}
                            onClick={() => setTabName('All Courses')}
                        >All Courses</button>
                        <button
                            className={`${tabStyle('Digital Marketing')}`}
                            onClick={() => setTabName('Digital Marketing')}
                        >Digital Marketing</button>
                        <button
                            className={`${tabStyle('Design & Development')}`}
                            onClick={() => setTabName('Design & Development')}
                        >Design & Development</button>
                        <button
                            className={`${tabStyle('Networking')}`}
                            onClick={() => setTabName('Networking')}
                        >Networking</button>

                    </div>
                    <div className="sm:px-16">
                        <div className="relative">
                            <div className="absolute w-full flex justify-between z-10 h-full items-center">
                                <div className="swiper-button-prev-custom text-xl p-2 sm:p-3 rounded-full  cursor-pointer bg-primary/40 shadow-2xl hover:bg-primary/50 transition-all duration-100 active:scale-90 ml-[-15px] md:ml-[-50px]"><GrFormPrevious /></div>
                                <div className="swiper-button-next-custom text-xl p-2 sm:p-3 rounded-full  cursor-pointer bg-primary/40 shadow-2xl hover:bg-primary/50 transition-all duration-100 active:scale-90 mr-[-15px] md:mr-[-50px]"><GrFormNext /></div>
                            </div>
                            <Swiper
                                navigation={{
                                    nextEl: '.swiper-button-next-custom',
                                    prevEl: '.swiper-button-prev-custom',
                                }}
                                modules={[Navigation]}
                                spaceBetween={0}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 1,
                                    },
                                    868: {
                                        slidesPerView: 2,
                                    },
                                    1230: {
                                        slidesPerView: 3,
                                    },
                                }}


                                speed={300}

                            >
                                {
                                    allCourses?.map((course, idx) => <SwiperSlide key={idx}>
                                        <CourseCard key={idx} course={course} />
                                    </SwiperSlide>)
                                }

                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;