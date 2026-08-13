'use client';

import styles from "@/app/auth/form.module.css"
import { registerAction } from "@/actions/auth-act";

export default function RegisterCustomerForm(){
    return(
        <>
            <form action={registerAction} className={`card ${styles.authForm}`}>
                <input type="hidden" name="role" value="CUSTOMER"/>
                <div className={styles.formField}>
                    <label className={styles.label} htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required className={`input input--lg ${styles.input}`}/>
                </div>
                <div className={styles.formField}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required className={`input input--lg ${styles.input}`}/>
                </div>
                <div className={styles.formField}>
                    <label className={styles.label} htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required className={`input input--lg ${styles.input}`}/>
                </div>
                <button type="submit" className={`btn btn-primary ${styles.submit}`}>Sign up as Customer</button>
            </form>
            <span className={styles.message}>All items with <b>*</b> are required</span>
        </>
    )
}