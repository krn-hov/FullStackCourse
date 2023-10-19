const Header = (props) => {
    return <h2>{props.course}</h2>
}
  
const Total = ({parts}) => {
    const initialVal = 0
    return <p>Number of exercises {parts.reduce((sum, curr)=>sum+curr.exercises,initialVal)}</p>
}
  
const Part = (props) => {
    return (
        <p>
        {props.part} {props.exercises}
        </p>
    )
}

const Content = ({parts}) => {
    
    return (
        <div>
        {parts.map(part =>
            <Part part={part.name} exercises={part.exercises} key={part.id} />
        )}
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts = {course.parts} />
            <Total parts = {course.parts} />
        </div>
      )
}
export default Course