import React, {useState} from 'react';
import "../css/form.css"



function AddBookForm(props) {
    const initInputs = {
        title: props.title || "",
        imageUrl: props.imageUrl || "",
        summary: props.summary || "",
        genre: props.genre || ""
    }
    const [inputs, setInputs] = useState(initInputs)

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.submit({...inputs, finished: props.finished}, props._id)
        setInputs(initInputs) 
    }

    const {title, imageUrl, summary, genre} = inputs

    return (
        <div className="book-form-container">
            <form className="book-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="cover image url"
                    name="imageUrl"
                    value={imageUrl}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    placeholder="title"
                    name="title"
                    value={title}
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    placeholder="genre"
                    name="genre"
                    value={genre}
                    onChange={handleChange} 
                />
                <textarea 
                    type="text" 
                    placeholder="summary"
                    name="summary"
                    value={summary}
                    onChange={handleChange} 
                />
                <button className="add-btn">{props.btnText}</button>
            </form>
        </div>
    );
}

export default AddBookForm;