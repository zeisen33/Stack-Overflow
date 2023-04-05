import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { getCurrentUserId } from "../../store/users"
import { useParams } from "react-router-dom"
import * as questionActions from '../../store/questions'
import * as userActions from '../../store/users'
import { useEffect, useState } from "react"


const QuestionsUpdate = () => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUserId)
    const { questionId } = useParams();
    const question = useSelector(questionActions.getQuestion(questionId))
    const asker = useSelector(userActions.getAsker(question?.askerId)) 
    debugger
    const [title, setTitle] = useState(question?.title)
    const [body, setBody] = useState(question?.body)
    debugger
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        // debugger
        dispatch(questionActions.fetchQuestion(questionId))
        // debugger
    }, [question])

    // debugger
    if (asker) {
        // debugger
        if (asker.id != currentUserId) {
            // debugger
            // if not signed in as the question asker, cannot edit. Return to show page
            return <Redirect to={`/questions/${questionId}`} />
        }
    }

    if (submitted) {
        debugger
        console.log('updated')
        return <Redirect to={`/questions/${question.id}`} />
    }

        // later: add error slice of state to show that you aren't logged in

    const handleTitle = (e) => setTitle(e.target.value)
    const handleBody = (e) => setBody(e.target.value)

    const handleSubmit = async (e) => {
        // debugger
        e.preventDefault()
        await setErrors([]);
        // debugger
        const createFetchResponse = dispatch(questionActions.updateQuestion({title, body, id: questionId}))
            // debugger
            .then((data) => {
                // debugger
                if (data.errors) {
                    debugger
                    setErrors(data.errors)
                } else {
                    // debugger
                    setSubmitted(true)
                }
            })
    }

    const showErrors = (inputType) => {
        // debugger
        let errorEl;

        errors.forEach((error) => {
            if (error.includes(inputType)) {
                errorEl = <ul className='Error'>{error}</ul>
            }
        })
        return errorEl
    }

    return (
        <div>
        <h1>Edit your question</h1>
            <form onSubmit={handleSubmit}>
                <label>Title 
                    <span>Be specific and imagine you're asking a question to another person</span>
                    <input type='text'
                        value={title}
                        onChange={handleTitle}
                        // placeholder={question.title}
                    />
                </label>
                {showErrors('Title')}
                <label>Body 
                    <span>Include all the information someone would need to answer your question</span>
                    <textarea
                        value={body}
                        onChange={handleBody}
                        // placeholder={question.body}
                    />
                </label>
                {showErrors('Body')}
                <button type='submit'>Edit</button>
            </form>
        </div>
    )
}

export default QuestionsUpdate