import React, { useEffect, useState} from 'react';
import styles from './Home.module.css';

import { getFirestore, doc, getDoc, setDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../../credenciales';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

function Home({ userEmail }) {
  const [tasks, setTasks] = useState(null);

  let tareas = [];

  useEffect(() => {
    obtenerTareas()
  }, []) //eslint-disable-line

  async function obtenerTareas(){
    const docuRef = doc(db, `usuarios/${userEmail}`);
    const docSnap = await getDoc(docuRef);

    if (docSnap.exists()) {
      tareas = docSnap.data().tareas;
      if(tasks === null || tasks !== tareas){
        setTasks(docSnap.data().tareas)
      }
    }
    console.log('obtenerTareas Ejecutada')
  }

  async function handleSave(e){
    e.preventDefault();

    const name = e.target.elements.taskName.value;
    const description = e.target.elements.taskDescription.value;
    const importance = e.target.elements.importance.value;

    const setearDocu = [{
        task: name,
        description: description,
        importance: importance,
        id: +new Date(),
    }]

    const docuRef = doc(db, `usuarios/${userEmail}`);
    const docSnap = await getDoc(docuRef);

    if (docSnap.exists()) {
      const tareasFirebase = docSnap.data().tareas;
      tareas = [...setearDocu, ...tareasFirebase];
      setTasks(tareas)
      await updateDoc(docuRef, {tareas})
      obtenerTareas()
    }

    e.target.elements.taskName.value = '';
    e.target.elements.taskDescription.value = '';
    e.target.elements.importance.value = '';
  }

  async function deleteTask(idTask){
    tareas = tasks.filter(task => {
      return task.id !== idTask
    });

    const docuRef = doc(db, `usuarios/${userEmail}`);

    await setDoc(docuRef, {tareas})

    obtenerTareas()
    }

  function handleImportance(importanceLevel){
    switch (importanceLevel) {
      case 'high':
        return styles.highCard;
      case 'medium':
        return styles.mediumCard;
      case 'low':
        return styles.lowCard;
      default:
    }
  }

  return (
    <div>
      <header className={styles.header}>
        <div>
          <h1>React CRUD</h1>
        </div>

        <div>
        <button className={styles.logOut} onClick={() => signOut(auth)}>Cerrar Sesión</button>
      </div>
      </header>
      <div className={styles.heroContainer}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSave} className={styles.form}>
            <div>
              <div>
                <label className={styles.formTitle} htmlFor="taskName">Nueva Tarea</label>
                <input className={styles.input} type="text" id='taskName' name='taskName' autoComplete='off' required />
              </div>

              <div>
                <label className={styles.formTitle} htmlFor="taskDescription">Descripción</label>
                <textarea className={styles.input} name="taskDescription" id="taskDescription" cols="30" rows="5" required></textarea>
              </div>
            </div>
            <div>
              <div>
                <label className={styles.formTitle} htmlFor="importance">Importancia</label>
                <select className={styles.input} name="importance" id="importance" required>
                  <option defaultChecked disabled>Seleccione</option>
                  <option value="high">Alta</option>
                  <option value="medium">Media</option>
                  <option value="low">Baja</option>
                </select>
              </div>
              <div className={styles.buttonDiv}>
                <button className={styles.button} type="submit">Guardar</button>
              </div>
            </div>
          </form>
        </div>
        <hr />
      <div>
        <h2 className={styles.taskSectionTitle}>Tareas</h2>
        <div className={styles.taskList}>
          {tasks ? tasks.map((task) => {
            return (
              <div key={task.id} className={handleImportance(task.importance)}>
                <h3 className={styles.taskTitle}>{task.task}</h3>
                <hr className={styles.cardHr} />
                <p className={styles.description}>{task.description}</p>
                <div className={styles.buttons}>
                  <button onClick={() => deleteTask(task.id)} className={styles.delete}>Eliminar</button>
                </div>
              </div>
            )
          }) : ''}
        </div>
      </div>
      </div>

    </div>
  );
}

export default Home;
