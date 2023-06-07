import AnswersShow from "./AnswersShow"
import { useEffect } from "react"
import * as userActions from '../../store/users'
import { useDispatch, useSelector } from "react-redux"
import * as voteActions from '../../store/votes'

const AnswersList = ({ questionId }) => {
    const dispatch = useDispatch();
    // const answers = props.answers
    // console.log(props)
    // console.log(answers)
    // debugger
    
    const answers = useSelector((state) => {
        return state.answers
    })

    const sortedAnswers = Object.values(answers).sort((a,b) =>  b.voteSum - a.voteSum)
    
    // const sortedAnswers = answers.sort((a,b) =>  b.voteSum - a.voteSum)
    console.log(sortedAnswers)

    const answersMap = () => {
        // debugger
        return (
            <div>
                {sortedAnswers.map((answer) => {
                    return (
                        <ul>
                            <AnswersShow answer={answer} />
                        </ul>
                    )
                })}
            </div>
        )
    }

    useEffect(() => {
        // debugger
        dispatch(userActions.fetchAllUsers())

    }, [])

    // debugger
    return (
        <div>{answersMap()}</div>
    )

}

export default AnswersList;