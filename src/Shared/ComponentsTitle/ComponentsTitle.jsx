/* eslint-disable react/prop-types */

const ComponentsTitle = ({title, description}) => {
    return (
        <div className="space-y-5 px-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text_color">{title}</h2>
            <p className="font-medium text-text_color">{description}</p>
        </div>
    );
}; 

export default ComponentsTitle;