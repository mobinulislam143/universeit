import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import CourseSemesters from "./CourseSemesters";
import SemesterTable from "../../../Shared/SemesterTable";

const ManageCourseSemester = () => { 
    const axiosPublic = useAxiosPublic()
    const [subjects, setSubjects] = useState([]);
    const [subjectsErr, setSubjectsErr] = useState('');
    const [semesterTitle, setSemesterTitle] = useState('');
    const [semesterTitleErr, setSemesterTitleErr] = useState('');
    const { register, handleSubmit, reset } = useForm();
    const { id } = useParams();
    const { data: course = {}, refetch: courseRefetch, isLoading } = useQuery({
        queryKey: ['course', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/course/${id}`)
            return res?.data
        }
    })
    const { data: courseSemesters = [], refetch: courseSemestersRefetch, isLoading: courseSemestersIsLoading } = useQuery({
        queryKey: ['singleCourseId', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/semesterByCourse/course/${id}`)
            return res?.data
        }
    })
    if (courseSemestersIsLoading) {
        return ''
    }
    if (isLoading) {
        return ''
    }
    const handleSemester = (e) => {
        setSemesterTitleErr('')
        setSemesterTitle(e.target.value)
    }
    const onSubmit = (data) => {
        console.log(data);
        setSubjectsErr('')
        setSubjects([...subjects, { id: new Date().getTime(), ...data }])
        reset()
    }
    const handleDeleteSubject = (id) => {
        const filteredData = subjects.filter(sub => sub.id !== id)
        setSubjects(filteredData)
    }
    const handleAddSemester = () => {
        setSemesterTitleErr('')
        setSubjectsErr('')
        let isValid = true;
        if (!semesterTitle) {
            isValid = false
            setSemesterTitleErr('Please give a semester title!!')
        }
        if (subjects.length < 1) {
            setSubjectsErr('Please add minimum one subject!!')
            isValid = false
        }
        if (!isValid) {
            return
        }

        const data = { courseId: id, semesterTitle: semesterTitle, subjects: subjects };
        const toastId = toast.loading("Semester is adding...");
        axiosPublic.post('/semesterByCourse', data)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    toast.success("Added successfully!!", { id: toastId });
                    reset()
                    setSemesterTitle('');
                    setSubjects([])
                    courseSemestersRefetch()
                }
            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
            })
    }
    return (
        <>
            <Helmet>
                <title>Dashboard | Manage Course Semester</title>
            </Helmet>
            <div className='w-full lg:w-[1000px] lg:max-w-[calc(100vw-400px)] mx-auto'>
                <div className="shadow-2xl px-10 rounded-2xl lg:w-full mx-auto bg-white mt-2">
                    <p className='text-center text-2xl font-bold py-2'>Manage Course Semester of {`"${course?.title}"`}</p>
                    <p className='text-lg font-bold pt-10'>Add Semester</p>
                    <div className='flex flex-wrap -m-2'>
                        {/* Title */}
                        <div className="grid grid-cols-1 w-full">
                            {/* category title  */}
                            <div className="p-2 w-full">

                                <label className="leading-7 text-sm text-gray-600 font-bold">Semester Title</label>
                                <input
                                    type="text"
                                    onChange={handleSemester}
                                    value={semesterTitle}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                <p className="text-sm text-red-500">{semesterTitleErr}</p>
                            </div>
                            <div className="w-full">
                                <label className="leading-7 text-base text-gray-600 font-bold">Add Subject</label>
                                <form className="grid grid-cols-1 md:grid-cols-2 w-full" action="" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="p-2 w-full">
                                        <label className="leading-7 text-sm text-gray-600 font-bold">Name</label>
                                        <input
                                            type="text"
                                            {...register("name", { required: true })}
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                    <div className="p-2 w-full">
                                        <label className="leading-7 text-sm text-gray-600 font-bold">Credit</label>
                                        <input
                                            type="number"
                                            {...register("credit", { required: true })}
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                    <div className="pt-3">
                                        <button className="flex flex-col justify-center items-center px-5 py-1.5 rounded-md bg-primary text-white hover:font-bold transition-all duration-300 hover:bg-[#e55633]  active:bg-primary focus:outline-none focus:ring focus:ring-red-300 active:scale-90 focus:text-white w-max">Add Subject</button>
                                    </div>
                                </form>

                                <div className="pt-5">
                                    {subjects.length > 0 && <SemesterTable semesterTitle={semesterTitle || ''} subjects={subjects} handleDeleteSubject={handleDeleteSubject} editable={true} />}
                                </div>
                                <p className="text-sm text-red-500">{subjectsErr}</p>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button onClick={handleAddSemester} type="submit" className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
               <div className=""> <CourseSemesters courseSemesters={courseSemesters} courseSemestersRefetch={courseSemestersRefetch} /></div>
            </div>
        </>
    );
};

export default ManageCourseSemester;