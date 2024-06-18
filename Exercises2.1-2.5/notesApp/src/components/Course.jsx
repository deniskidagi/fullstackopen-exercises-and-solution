import React from 'react'

const Header = (props) => {
    return (
      <p style={{fontWeight:800}}>{props.name}</p>
    )
  }
  
const Part = (props) => {
    return (
      <>
        <p>{props.name} {props.exercise}</p>
      </>
    )
}

const Content = (props) => {
    const {parts} = props
    return (
      <>
      {parts.map(course => (
         <Part key={course.id} name={course.name} exercise={course.exercises}/>
      ))}
     
      </>
    )
}
const Total = (props) => {
    const {course} = props
    return (
      <p>No of exercises: {course.parts.map(course => course.exercises).reduce((a, b) => a + b)}</p>
    )
  }
const Course = ({course}) => {
    //console.log(course);
  return (
    <>
        {course.map(course => (
            <div key={course.id}>
                <Header key={course.id} name={course.name}/>
                <Content parts={course.parts}/>
                <Total course={course}/>

            </div>
        ))}
        
    </>

  )
}

export default Course