import React, { useState } from "react";
import styles from "./LoginRegister.module.css";

import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../credenciales";

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

function LoginRegister({ userUid }) {

  const [registrando, setRegistrando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    if(registrando){
      const credentials = await createUserWithEmailAndPassword(auth, email, password);

      const docuRef = doc(db, `usuarios/${email}`);
      const docSnap = await getDoc(docuRef);

      if(!docSnap.exists()){
        await setDoc(docuRef, {
          tareas: []
        })
      }

    } else {
      signInWithEmailAndPassword(auth, email, password)
    }
  }

  return (
    <div className={styles.heroContainer}>
      <div className={styles.header}>
        <h1>React CRUD</h1>
      </div>
      <div className={styles.card}>
        <div className={styles.head}>
          <h2 className={styles.title}>{registrando ? "Registro" : "Inicio de Sesión"}</h2>
        </div>
        <div className={styles.formContainer}>

          <form onSubmit={handleSubmit}>
            <div className={styles.formSection}>
              <label className={styles.formTitle} htmlFor="email">
                Correo Eléctronico
              </label>
              <input className={styles.input} type="email" id="email" name="email" required autoComplete="off" />
            </div>
            <div className={styles.formSection}>
              <label className={styles.formTitle} htmlFor="password">
                Contraseña
              </label>
              <input className={styles.input} type="password" id="password" name="password" required />
            </div>
            <div className={styles.formSection}>
              <button className={styles.button} type="submit">
                {registrando ? "Registrarte" : "Iniciar Sesión"}
              </button>
            </div>
          </form>

          <div>
            <p className={styles.paragraph}>
              ¿
              {registrando
                ? "Ya tienes una cuenta"
                : "Aun no tienes una cuenta"}
              ?{" "}
              <span className={styles.span} onClick={() => setRegistrando(!registrando)}>
                {registrando ? "Inicia Sesión" : "Regístrate"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
