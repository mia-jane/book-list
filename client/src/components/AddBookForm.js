import React, {useState} from 'react';
import "../css/form.css"

function AddBookForm(props) {
    const initInputs = {
        title: props.title || "",
        imageUrl: props.imageUrl || "",
        summary: props.summary || "",
        genre: props.genre || "",
        finished: props.finished
    }
    const [inputs, setInputs] = useState(initInputs)
    const {title, imageUrl, summary, genre} = inputs
    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        props.submit({...inputs}, props._id)
        setInputs(initInputs)
        props.handleClose() 
    }
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
                    required
                    placeholder="title"
                    name="title"
                    value={title}
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    required
                    placeholder="genre"
                    name="genre"
                    value={genre}
                    onChange={handleChange} 
                />
                <div className="summary-area">
                    <p style={{fontSize:25}}>summary:</p>
                    <textarea 
                        className="summary"
                        required
                        type="text" 
                        name="summary"
                        value={summary}
                        onChange={handleChange} 
                    />
                </div>
                <div className="add-btn-container">
                    <button className="add-btn">{props.btnText}</button>
                </div>
            </form>
        </div>
    );
}

export default AddBookForm;