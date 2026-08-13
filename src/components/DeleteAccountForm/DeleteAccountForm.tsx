"use client";

import { useActionState } from "react";
import {
  deleteOwnAccountAction,
  type DeleteOwnAccountState,
} from "@/actions/profile-act";

const initialState: DeleteOwnAccountState = {
  error: null,
};

export default function DeleteAccountForm() {
  const [state, formAction] = useActionState(
    deleteOwnAccountAction,
    initialState,
  );

  return (
    <form action={formAction} className="card card--pad">
      <h2 className="section-title">Delete account</h2>
      <div className="form-field">
        <label htmlFor="confirmDelete" className="form-label">
          Type DELETE to confirm
        </label>
        <input
          type="text"
          id="confirmDelete"
          name="confirmDelete"
          placeholder="DELETE"
          required
          className="input"
        />
      </div>

      {state.error && (
        <p className="form-error" role="alert" aria-live="polite">
          {state.error}
        </p>
      )}

      <button type="submit" className="btn btn-danger">
        Delete my account
      </button>
    </form>
  );
}
