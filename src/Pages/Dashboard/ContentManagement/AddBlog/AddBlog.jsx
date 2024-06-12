import JoditEditor from 'jodit-pro-react';
const defaultConfig = {
	license: '%LICENSE_KEY%'
};

const AddBlog = () => {

    

    return (
        <JoditEditor config={defaultConfig} />
    );
};

export default AddBlog;