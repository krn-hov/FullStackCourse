const Person = (props) => {
    return (
      <div>
        <p>{props.name} {props.number}</p>
      </div>
    )
}

const Persons = (props) => {
    return (
        <div>
        {props.personList.map(person => <Person key={person.number} name={person.name} number={person.number}/>)}
        </div>
    )   
}

export default Persons
