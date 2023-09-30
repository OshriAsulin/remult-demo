
import { Task } from './shared/task'
import { useState, useEffect, FormEvent } from 'react'
import { remult } from 'remult'

// Here we ask from remult let me the repo of Task
// The repository pattern is very popular and he using here for all taking the data from the database and the updates of the backend
const taskRepo = remult.repo(Task)

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  useEffect(() => {
    taskRepo.find({
      orderBy: {
        completed: 'desc'
      }
    }).then(setTasks)
  }, [])

  async function addTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const newTask = await taskRepo.insert({ title: newTaskTitle })
      setTasks(tasks => [...tasks, newTask])
      setNewTaskTitle("")
    } catch (error: any) {
      alert(error.message)
    }
  }


  return (
    <>
      <h1>Todos</h1>
      <main>
        <form onSubmit={e => addTask(e)}>
          <input value={newTaskTitle}
            onChange={(e) => { setNewTaskTitle(e.target.value) }}
            placeholder='What need to be done' />
          <button>Add</button>
        </form>
        {tasks.map((task) => {
          function setTask(value: Task) {
            setTasks(tasks => tasks.map((t) => (t === task ? value : t)))
          }
          async function setCompleted(completed: boolean) {
            setTask(await taskRepo.save({ ...task, completed }))
          }
          async function deleteTask() {
            try {
              await taskRepo.delete(task)
              setTasks((tasks) => tasks.filter((t) => t !== task))
            } catch (error) {

            }
          }

          return <div key={task.id}>
            <input type="checkbox" checked={task.completed} onChange={(e) => setCompleted(e.target.checked)} />
            {task.title}
            <button onClick={() => deleteTask()}>delete</button>
          </div>
        })}
      </main>
    </>
  )
}

export default App
